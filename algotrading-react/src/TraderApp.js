import {useEffect, useState} from "react";
import Container from "./components/common/container";
import Card from "./components/common/card";
import SelectBox from "./components/common/select-box";
import Button from "./components/common/button";
import io from "socket.io-client";
import {Line} from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Title
} from "chart.js";
import Table from "./components/common/table";

const socket = io("ws://127.0.0.1:5555");

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartOptions = {
    responsive: false,
    animation: false,
    maintainAspectRatio: true,
    scales: {
        y: {
            type: 'linear',
            position: 'left',
            stack: 'demo',
            stackWeight: 2
        }
    },
    plugins: {
        legend: {position: 'top'},
        title: {display: true, text: 'BINANCE Market Data'}
    }
};

const initialChartData = {
    labels: [],
    datasets: [
        {
            label: 'BTC-USDT Price',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }
    ]
};

function TraderApp() {
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [symbols, setSymbols] = useState([]);
    const [isConnected, setConnected] = useState(false);
    const [windowSize, setWindowSize] = useState(10);
    const [prices, setPrices] = useState([]);
    const [trades, setTrades] = useState([]);
    const [chartData, setChartData] = useState(initialChartData);

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "symbol":
                setSymbol(event.target.value);
                break;
            case "windowSize":
                setWindowSize(Number(event.target.value));
                break;
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchSymbols() {
            try {
                const response = await fetch("https://api.binance.com/api/v3/ticker/price", {
                    headers: {accept: "application/json"},
                    signal: controller.signal
                });
                const tickers = await response.json();
                setSymbols(tickers.map(t => t.symbol).sort());
            } catch (err) {
                if (err.name !== "AbortError") console.error(`Fetch failed: ${err}`);
            }
        }

        fetchSymbols();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        const handleTradeEvent = (trade) => {
            if (!isConnected) return;
            setTrades( prevTrades => [...prevTrades.slice(-windowSize),trade]);
            setChartData( prevChartData => {
                const nextChartData = {...prevChartData};
                nextChartData.labels = [...prevChartData.labels.slice(-windowSize),trade.timestamp];
                console.log(nextChartData.labels.length);
                nextChartData.datasets = [...prevChartData.datasets];
                nextChartData.datasets[0].data = [...prevChartData.datasets[0].data.slice(-windowSize),trade.price];
                return nextChartData;
            })
        };
        socket.on("ticker", handleTradeEvent);
        return () => {
            socket.off("ticker", handleTradeEvent);
        }
    }, [isConnected,windowSize]);

    const connectToBinance = () => {
        setConnected(true);
    }

    const disconnectFromBinance = () => {
        setConnected(false);
    }

    return (
        <Container>
            <p></p>
            <Card title={"Trader Panel"}>
                <SelectBox id={"symbol"}
                           label={"Symbol"}
                           value={symbol}
                           handleChange={handleInputChange}
                           optionValues={symbols}
                />
                <SelectBox id={"windowSize"}
                           label={"Window Size"}
                           value={windowSize}
                           handleChange={handleInputChange}
                           optionValues={[10, 25, 50, 100, 250, 1000]}
                />
                {!isConnected &&
                    <Button click={connectToBinance}
                            color={"btn-success"}
                            label={"Connect"}></Button>
                }
                {isConnected &&
                    <Button click={disconnectFromBinance}
                            color={"btn-danger"}
                            label={"Disconnect"}></Button>
                }
            </Card>
            <p></p>
            <Card title={"Technical Analysis Panel"}>
                <Line data={chartData} width={1080} height={720} options={chartOptions}/>
                <p></p>
                <Table headers={["Price","Quantity","Timestamp"]}
                       fields={["price", "quantity", "timestamp"]}
                       keyField={"timestamp"}
                       values={trades}/>
            </Card>
        </Container>
    );
}

export default TraderApp;

const {Observable, map, filter} = require("rxjs");
const Websocket = require("ws");
const WSS_BINANCE_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";

const ws = new Websocket(WSS_BINANCE_URL);


const observable = new Observable(
    observer => {
        ws.on("message", frame => {
            const trade = JSON.parse(frame);
            observer.next(trade);
        });
        return function unsubscribe() {
            console.log("Observer has just unsubscribed.")
        }
    }
);
const model = {
    e: 'trade',
    E: 1703663845336,
    s: 'BTCUSDT',
    t: 3338715331,
    p: '42448.00000000',
    q: '0.00020000',
    b: 23935724823,
    a: 23935725368,
    T: 1703663845335
};

const subscription = observable.pipe(
    map(rawTrade => {
        const enrichedTrade = {};
        enrichedTrade.symbol= rawTrade.s;
        enrichedTrade.price = Number(rawTrade.p);
        enrichedTrade.quantity = Number(rawTrade.q);
        enrichedTrade.timestamp = new Date(rawTrade.T);
        return enrichedTrade;
    }),
    filter( trade => trade.quantity >= 0.25),
    map(trade => {
        const enrichedTrade = {...trade};
        enrichedTrade.volume = enrichedTrade.price * enrichedTrade.quantity;
        return enrichedTrade;
    })
).subscribe(console.log);

setTimeout(() => {
    subscription.unsubscribe();
}, 30_000);

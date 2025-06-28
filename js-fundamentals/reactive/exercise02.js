const {Observable, map,filter} = require("rxjs");

const observable = new Observable(
    observer => {
        let counter = 0;
        const id = setInterval(()=>{
            counter++;
            observer.next(counter);
        }, 500)
        return function unsubscribe(){
            clearInterval(id);
        }
    }
);

const subscription = observable.pipe(
    filter( u => u%2 === 0),
    map( n => 3 * n + 1 ),
    map( n => n**3 )
//).subscribe(data => console.log(data));
).subscribe(console.log);

setTimeout(()=>{
    subscription.unsubscribe();
}, 30_000);

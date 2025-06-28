const {Observable} = require("rxjs");

const observable = new Observable(
    observer => {
        let counter = 0;
        const id = setInterval(()=>{
            counter++;
            observer.next(counter);
        }, 200)
        return function unsubscribe(){
            clearInterval(id);
        }
    }
);

const subscription = observable.subscribe(model => {
    console.log(`New model value: ${model}`);
});

setTimeout(()=>{
    subscription.unsubscribe();
}, 30_000);

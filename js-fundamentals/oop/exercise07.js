let circle = {
    x: 0,
    y: 0,
    radius: 10,
    pencil: {
        color: "red",
        style: {
            width: 10,
            value: "dotted"
        }
    }
};

let newCircle = Object.assign({}, circle);
console.log(circle);
console.log(newCircle);
newCircle.pencil.style.value = "solid";
console.log(circle);
console.log(newCircle);

const obj1 = {
    name: "test",
    rollNo: 1,
    childObj: {
        car: "ford"
    }
};

for(let obj in obj1)
{
    console.log("Print object item", obj);
}


Object.keys(obj1).forEach(item => {
    console.log("Print obkect.keys", item);
})


var weakMapObj = new WeakMap();
var obj = {
    name: "test"
}
weakMapObj.set(obj, 1);

console.log(weakMapObj.get(obj));
obj = null;
console.log(weakMapObj.get(obj));

var obj3 = {
    name: "tester"
}

var obj2 = obj3;
obj3 = null;

console.log("Please print obj2", obj2);
obj2.name = "dester";
console.log("Please print obj2", obj2);

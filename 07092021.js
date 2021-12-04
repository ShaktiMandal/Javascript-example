function displayName()
{
    return 'john doe'
}

function findName()
{
    return displayName();
}

console.log(findName()); /// Execution context in stack


//Hoisting - Creation phase and execution phase 
//creation phase - initialize all variable with undefined and also function in the memory
//execution phase - check for those variable and right side value which will be assigned and executeed

function helloBrother() // Creation phase, it will be pushed in to memory
{
    //the moment function cllaed - again new context will be created
    function helloBigBrother() // creation pahse it will store this function
    {
        return "I am your big brother";
    }

    return helloBigBrother(); // Execution phase it will give the return value of the latest function
    function helloBigBrother() // creation phase , this will say ohhhh i have same one already so let me override it thsu abive function will be overriden
    {
        return "I am not your big brother";
    }
}

helloBrother(); // execution phase - look for the function and find it above

function blockScope()
{
    for(let i = 0; i < 6; i++) //var is having scope with in the function but not let
    {
        console.log(i);
    }

    console.log(i);
}

//blockScope();

function thisKeyword() // this keyword is an object of the function
{
    console.log(this);
}

//thisKeyword();

const obj = {
   // name: "test",
    spellMyName : function () {
        return this.name // here name is automatically adding this there is not such variable with in the function
        //this looking for outside scope. Now when it found outside the function scope is now with in object. Therefore 
        //to access it we have to use this
    }
}
var name = "test" // declared valribale outside object. If we rung the spellMyName , it will give undefined though its declared globally.
console.log(obj.spellMyName()); // here  this is refering to the current object under which function is declared

function spellMyName()
{
    console.log(this.name); //Here this will be considered as window object and take the name variable from there
}

console.log(spellMyName());// here functioncalled is happening under window object as its not refrring to any object



// why we need this ??? 
    // due to this, we can have dynamic scope other than blok scope
    // same function can be used by multiple object without declaring utiple times
    // there are three ways of doing so  - call, apply, bind
    // call by default is being used when we call any function however it can take this operstor and parametesr

const obj1 = {
    name: "test1",
    sayMyName: function(){
        return this.name
    }
}

const obj2 = { /// here we dont have sayMyname function but still we can tale that from obj1
    name: "test2"
}

console.log(obj1.sayMyName.call(obj2)); // here we are hijacking obj1 method into object 2
//sayMyName became the property of Object2 hence this isalso refering to obj2 instead of obj1. thus its taking name variable 
//from obj2 
//same way we can bind apply , please note this call the function immediately.

//bind is another way to do the same where function will be called later as we store function reference and then call it whenever we wamt

var obj2Func = obj1.sayMyName.bind(obj2);

console.log("bind ", obj2Func());

///pass by value and pass by ref

const number = 100
const string = "Jay"
let object1 = {
  value: "a"
}
let object2 = {
  value: "b"
}
let obj3 = object2;
object1 = object2;
 
function change(number, string, object1, object2) {
    number = number * 10;
    string = "Pete";
    console.log(object1.value);
    object1 = object2;
    object2.value = "c";
}
 
change(number, string, object1, object2);
 
//Guess the outputs here before you run the code: 
console.log(number); 
console.log(string);
console.log(object1.value);


//Heigher order function 
// when a function return a function or take an argument as function called heigher order func
// this completly make the code generic which dont repeat the code. 


function arithmetic(data, arithmeticFn)
{
    if(data.type === "add")
    {
        return arithmeticFn(data.num1, data.num2);
    }
    if(data.type === "mul")
    {
        return arithmeticFn(data.num1, data.num2);
    }
}

arithmetic({type: "add", num1: 10, num2: 20}, function(num1, num2){
    console.log(`add => ${num1 * num2}`);
});

function numericComputation(num1)
{
    return function(num2)
    {
        console.log(num1 * num2);
    }
}

//console.log(numericComputation(10)(20))
const func1 = numericComputation(10);
console.log(func1(20));

function callMeMayBe()
{    
    setTimeout(() => {
        console.log(callMe)
    }, 0);

    const callMe = "I am here";
}


//callMeMayBe();




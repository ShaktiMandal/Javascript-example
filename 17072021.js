
temp = "this is a outside";
i =0;

for(; i < 10; i++)
{
    setTimeout( function(i, temp) {
        console.log("print i", i);
        console.log("printing temp",temp);
    }, 1000);
}

console.log("Print outside i", i);


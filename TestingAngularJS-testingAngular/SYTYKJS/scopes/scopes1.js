var log = console.log;

/*
var a = 47, 
    b = 57;

    console.log('A ' + a, 'B ' + b)

    function example2() {
        var a = b = 10;
    }

    example2();
    console.log('A '+ a, 'B '+ b); 
*/    

/* 
var a = 30;

function example(a) {
    console.log('initialize new variable "a" ', a) // Returns 30
    // Every arg has an invisible var in front of it
    // that keeps it within the scope of its function
    a = 20;
    console.log('inner ', a); // Returns 20
}

example(a);

console.log('outer ', a); // Returns 30
*/


// --------- LEXICAL SCOPING -----------

/*
var example = function() {
    var a;
    console.log(a);
    a = 10;
    inner();

    // Not on the global scope but returns the window object as this
    function inner() {
        console.log('I am inner');
    }
}
example();
*/

/*
function example1() {
    console.log(a)
}

function example2() {
    a = 10
    example1()
}

var a = 50;
example1();
example2();
*/


// --------- CLOSURES 1 -----------

/*
var myArray = [2, 3, 9, 12, 6, 8, 12, 9, 34, 12, 66, 0, 8, 12, 32, 12,  7, 13, 45, 9]

function lessThanTen(item) {
    return (item < 10) ? item : false
}

function filterArray(myArray, predicate) {
    var result = [];

    for (let i = 0; i < myArray.length; i++) {
        // If it is not less than 10, then continue the loop
        if (!predicate(myArray[i])) 
            continue;

        result.push(myArray[i]);       
    }
    // console.log('index ',i)
    return result;
}

console.log(filterArray(myArray, lessThanTen));
*/

/*
function greaterThanN (N) {
    // Note this is a function expression
    // Cuz the function is nameless. If you give it a name
    // The name will be useful only within the function.
    return function(num) {
       return num > N; 
    };
}

var gtrN = greaterThanN(10);
console.log(gtrN(5));
*/

/*
function validatePass(password) {
    var calledCount = 0;
    return function(assert) {
        calledCount++;
        console.log(calledCount);
        return assert === password;
    }
}

// NOTE: auth1 holds an instance everything within `validatePass`
// It holds the `validatePass` scope. So auth1 is a closure
var auth1 = validatePass('passwordA');
// NOTE: auth2 holds another instance everything within `validatePass`
// It holds the `validatePass` scope. So auth2 is a closure
var auth2 = validatePass('passwordB');
*/

/*
function example() {
    var a = 10;
    return inner1();
    function inner1() {
        var b = 25;
        return function inner2() {
            var c = 55;
            console.log(a, b, c);
        }
    }
}

// closure encloses example()'s scope
// closure holds inner2 
var closure = example();
closure(); // Returns 10 25 55
*/

/*
var testArr = [];

var people = ['Tman', 'Tboy', 'Twan', 'TY']
var peepsList = document.getElementById('people-list');

for (var i = 0; i < people.length; i++) {
    var person = people[i];
    var element = document.createElement('li');
    element.innerHTML = person;

    element.addEventListener('click', function(){
        testArr.push(person);
        alert(person + ' was clicked!');
    });

    console.log(testArr, person) // testArr returns [] empty while person returns expected

    peepsList.appendChild(element);
}
*/

/*
var people = ['Tman', 'Tboy', 'Twan', 'TY']
var peepsList = document.getElementById('people-list');

for (var i = 0; i < people.length; i++) {
    var person = people[i];
    var element = document.createElement('li');
    element.innerHTML = person;

    addEvent(person, element);
}

function addEvent(person, element) {
    element.addEventListener('click', function(){
        alert(person + ' was clicked!');
    });
    peepsList.appendChild(element);
}
*/

// ---------- The THIS keyword -------------
/*
function funcDecl() {
    console.log(this); // Returns the window object
}

var obj = {
    firstName: 'Blegh',
    retThis: function(){
        console.log(this.firstName, this) // Returns 'Blegh' and obj
    }
}

var button = document.getElementById('buton');
button.addEventListener('click', function() {
    console.log(this); // Returns the button object `<button id="buton">Click me</button>`
    obj.retThis; // Returns 'Blegh' and obj
});

var button2 = document.getElementById('buton2');
// NOTE that in this case the obj funtion serves as the callback function for the event listener
button2.addEventListener('click', obj.retThis); // Returns undefined and `<button id="buton">Click me</button>` 


var gloHoist = obj.retThis;
gloHoist(); // Returns the window object
obj.retThis(); // Returns 'Blegh' and obj

person = {
    firstName: 'Jermaine',
    lastName: 'Lebron'
}

person.doReturnThis = obj.retThis
person.doReturnThis(); // Returns 'Jermaine', {firstName: "Jermaine", lastName: "Lebron", doReturnThis: ƒ}
*/

/*
var log = console.log;
log('Yea'); // It works

var arr = [1, 2, 3, 4, 5];
arr.forEach(log);
*/

/*
var people = ['Tman', 'Tboy', 'Twan', 'TY']

obj = {
    title: 'Mr',
    printPerson: function () {
        var that = this;
        people.forEach(function(person){
            console.log(that.title+ ': '+person);
        })
    }
}

obj.printPerson(); 

// forEach accepts a callback funtion and an object (this)
arr.forEach(console.log, console);
*/


// ------- CALL, APPLY and BIND ----------

/*
var person = {
    firstName: 'Yankee',
    intro: function() {
       log(this.firstName); 
    }
} 

var pet = {
    firstName: 'Chloe',
} 

var blegh = person.intro;
log(blegh); // Returns a function --- function() { log(this.firstName) }
blegh(); // Returns undefined cuz the window object does not have the property `firstName`

// Functions have functions on them. In JS functions have the CALL property
blegh.call(pet); // Returns Chloe
*/

/*
var person = {
    firstName: 'Yankee',
    intro: function() {
       log(this.firstName); 
    }
} 

function callTheCallback(callback){
    callback();
}

callTheCallback(person.intro); // Returns undefined because window object does not have `firstName`
callTheCallback(person.intro.bind(person)); // Returns Yankee. Cuz we have overriden the window object
*/

/*
var person = {
    firstName: 'Yankee',
    intro: function() {
       log(this.firstName); 
    }
} 

var employee = function(title, role) {
    log('I am '+ title +' '+ this.firstName + ' a '+role);
}

employee.call(person, 'Mr.', 'Software Engineer');
employee.apply(person, ['Mrs','Tester']);
*/


// ------- ES6 ARROW FUNCTIONS ----------

/*
myFunc = ()=> log('ES6 Arrow Func');
myFunc = () => {
    log(' I have more than');
    log('1 line of code!');
}
myFunc();
*/

/*
myFunc = (arg)=> log('Number', arg);
myFunc(10); // Returns Number 10

myFunc = (a, b)=> {
    log('Sum', a + b);
    log('Diff', a - b);
}
myFunc(24, 50); // Returns Sum 74, Diff -26
*/

/*
let arr = [2, 3, 4, 5, 6]
log(arr.map(item => item * 2)); // Returns [4, 6, 8, 10, 12]
*/



// ------------- PROTOTYPAL INHERITANCE ------------------

"use strict";
// ---- The any type ----
var item1 = { id: 1, name: 'item1' };
item1 = { id: 2 };
// acronym S.F.I.A.T -> Simply Find an Interface for the any type
// avoid the any type at any cost
// ---- Explicit casting ----
var item2 = { id: 2, name: 'item2' };
// let item2 = { id: 2, name: 'item2' } as any; -> another variant
item2 = { id: 3 };
// ---- Union types ----
// obj can be a string or a number
function printObject(obj) {
    console.log("obj = ".concat(obj));
}
printObject(1);
printObject('string value');
// ---- Type guards ----
/*
A type guard is an expression that performs a check on our type,
and then guarantees that type within its scope.
*/
function addWithUnion(arg1, arg2) {
    if (typeof arg1 === 'string') {
        // arg 1 is treated as a string
        console.log("arg1 is of type string");
        return arg1 + arg2;
    }
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
        // both are numbers
        console.log("arg1 and arg2 are numbers");
        return arg1 + arg2;
    }
    console.log("default return treat both as strings");
    return arg1.toString() + arg2.toString();
}
function addWithTypeAlias(arg1, arg2) {
    return arg1.toString() + arg2.toString();
}
// ---- Enums ----
/*
Enums are used to define a human-readable name for a specific number or string.
Using enums helps us to provide a clear set of values for a variable or
function parameter. hey also provide a tried and tested way of eliminating so
called magic numbers by defining a limited number of possible values.
Magic number - a number in your code that appears arbitrary.
*/
var DoorState;
(function (DoorState) {
    DoorState[DoorState["Open"] = 0] = "Open";
    DoorState[DoorState["Closed"] = 1] = "Closed";
})(DoorState || (DoorState = {}));
function checkDoorState(state) {
    console.log("enum value is : ".concat(state));
    switch (state) {
        case DoorState.Open:
            console.log("Door is open");
            break;
        case DoorState.Closed:
            console.log("Door is closed");
            break;
    }
}
// Correct way of calling the function
checkDoorState(DoorState.Open);
checkDoorState(DoorState.Closed);
// We can set the numerical value of an enum value to whatever we like
var DoorStateSpecificValues;
(function (DoorStateSpecificValues) {
    DoorStateSpecificValues[DoorStateSpecificValues["Open"] = 3] = "Open";
    DoorStateSpecificValues[DoorStateSpecificValues["Closed"] = 7] = "Closed";
    DoorStateSpecificValues[DoorStateSpecificValues["Unspecified"] = 256] = "Unspecified";
})(DoorStateSpecificValues || (DoorStateSpecificValues = {}));
// String enums
var DoorStateString;
(function (DoorStateString) {
    DoorStateString["OPEN"] = "Open";
    DoorStateString["CLOSED"] = "Closed";
})(DoorStateString || (DoorStateString = {}));
console.log("OPEN = ".concat(DoorStateString.OPEN));
// ---- More primitive types ----
// Undefined
function checkAndPrintElement(arrElement) {
    if (arrElement === undefined)
        console.log("invalid array element");
    else
        console.log("valid array element : ".concat(arrElement));
}
var array = ['123', '456', '789'];
delete array[0]; // arr[0] = undefined;
for (var i = 0; i < array.length; i++) {
    checkAndPrintElement(array[i]);
}
/*
The undefined type, therefore, allows us to explicitly state when
we expect a variable to be undefined.
*/
// Null
/*
Along with undefined, JavaScript also allows values to be set to null.
Setting a value to null is intended to indicate that the variable is
known, but has no value, as opposed to undefined, where the variable
has not been defined in the current scope.
*/
function printValues(a) {
    console.log("a = ".concat(a));
}
printValues(1);
printValues(null);
// Definite assignment
/*
According to the compiler, we are attempting to use the value of the
globalString variable before it has been given a value.
Unfortunately, the compiler does not quite understand that
by invoking the setGlobalString function, the globalString
variable will actually have been assigned a value before we
attempt to log it to the console. To cater for this scenario, as
the code that we have written will work correctly, we can use
the definite assignment assertion syntax, which is to append an
exclamation mark (!) after the variable name that
the compiler is complaining about. By using a definite assignment
assertion it becomes your responsibility to make sure the property gets set.
The only place that the author has found where it makes sense to
use definite assignment is when writing unit tests.
*/
var globalString;
setGlobalString('this string is set');
// ! is the definite assignment assertion syntax
console.log("globalString = ".concat(globalString));
function setGlobalString(value) {
    globalString = value;
}
// There are two placec where we can use it
// var globalString!: string;
// console.log(`globalString = ${globalString!}`);
// Object
var structuredObject = {
    name: 'myObject',
    properties: {
        id: 1,
        type: 'AnObject',
    },
};
function printObjectType(a) {
    console.log("a: ".concat(JSON.stringify(a)));
}
printObjectType(structuredObject);
// printObjectType('this is a string'); // This will produce error
// Unknown
/*
TypeScript introduces a special type into its list of basic types,
which is the type unknown. The unknown type can be seen as a type-safe
alternative to the type any. A variable marked as unknown can hold any
type of value, similar to a variable of type any. The difference between
the two, however, is that a variable of type unknown cannot be assigned
to a known type without explicit casting.
*/
// This works
var a = 'test';
var aNumber = 2;
aNumber = a;
var u = 'an unknown';
u = 1;
var aNumber2;
aNumber2 = u; // we must cast it in order to work
// Never
function alwaysThrows() {
    throw new Error('this will always throw');
    // return -1; // with never, this will produce error
}
// Never and switch
var AnEnum;
(function (AnEnum) {
    AnEnum[AnEnum["FIRST"] = 0] = "FIRST";
    AnEnum[AnEnum["SECOND"] = 1] = "SECOND";
})(AnEnum || (AnEnum = {}));
function getEnumValue(enumValue) {
    switch (enumValue) {
        case AnEnum.FIRST:
            return 'First Case';
        case AnEnum.SECOND: // This line fixes the error bellow
            return 'Second Case';
    }
    // error Type 'AnEnum.SECOND' is not assignable to type 'never'
    var returnValue = enumValue;
    return returnValue;
}
// ---- Tuples ----
/*
Tuples are a method of defining a type that has a finite number of unnamed
properties, with each property having an associated type. When using a tuple,
all of the properties must be provided.
*/
var tuple1;
tuple1 = ['test', true];
// tuple1 = ['test']; // This will produce an error
// tuple1[2] = 'Hello'; // This will produce an error
// tuple1.push('Hello'); // This will not (maybe langauge bug)
// Optional tuple elements
var tupleOptional;
// Both are valid
tupleOptional = ['test', true];
tupleOptional = ['test'];
// tupleOptional[1] = 'Hello'; // This will produce an error (string to boolean)
// ---- Functions ----
// Optional parameters
/*
Note that any optional parameters must be listed last in the
parameter list of the function definition.
*/
function concatValues(a, b) {
    console.log("a + b = ".concat(a + b));
}
concatValues('first', 'second');
concatValues('third');
// Function signatures as parameters
function myCallback(text) {
    console.log("myCallback called with ".concat(text));
}
function withCallbackArg(message, callbackFn) {
    callbackFn("".concat(message, " from withCallback\""));
}
withCallbackArg('initial text', myCallback);
function add(a, b) {
    return a + b;
}
add('first', 'second');
add(1, 2);
function withLiteral(input) {
    console.log("called with : ".concat(input));
}

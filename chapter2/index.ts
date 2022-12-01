// ---- The any type ----

let item1: any = { id: 1, name: 'item1' };
item1 = { id: 2 };

// acronym S.F.I.A.T -> Simply Find an Interface for the any type
// avoid the any type at any cost

// ---- Explicit casting ----

let item2 = <any>{ id: 2, name: 'item2' };
// let item2 = { id: 2, name: 'item2' } as any; -> another variant
item2 = { id: 3 };

// ---- Union types ----

// obj can be a string or a number
function printObject(obj: string | number) {
  console.log(`obj = ${obj}`);
}

printObject(1);
printObject('string value');

// ---- Type guards ----

/*
A type guard is an expression that performs a check on our type,
and then guarantees that type within its scope.
*/
function addWithUnion(arg1: string | number, arg2: string | number) {
  if (typeof arg1 === 'string') {
    // arg 1 is treated as a string
    console.log(`arg1 is of type string`);
    return arg1 + arg2;
  }
  if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    // both are numbers
    console.log(`arg1 and arg2 are numbers`);
    return arg1 + arg2;
  }
  console.log(`default return treat both as strings`);
  return arg1.toString() + arg2.toString();
}

// ---- Type aliases ----

/*
TypeScript introduces the concept of a type alias,
where we can create a named type that can be used as a substitute for a type union.
*/

type StringOrNumber = string | number;
function addWithTypeAlias(arg1: StringOrNumber, arg2: StringOrNumber) {
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

enum DoorState {
  Open, // 0
  Closed, // 1
}

function checkDoorState(state: DoorState) {
  console.log(`enum value is : ${state}`);
  switch (state) {
    case DoorState.Open:
      console.log(`Door is open`);
      break;
    case DoorState.Closed:
      console.log(`Door is closed`);
      break;
  }
}

// Correct way of calling the function
checkDoorState(DoorState.Open);
checkDoorState(DoorState.Closed);

// We can set the numerical value of an enum value to whatever we like
enum DoorStateSpecificValues {
  Open = 3,
  Closed = 7,
  Unspecified = 256,
}

// String enums
enum DoorStateString {
  OPEN = 'Open',
  CLOSED = 'Closed',
}
console.log(`OPEN = ${DoorStateString.OPEN}`);

// Const enums

/*
If we don't use const keyword for enums, js will (under the hood) generate an object
for every enum. With const keyword, it will simply replace the used enum with the
actual value.
*/
const enum DoorStateConst {
  Open = 10,
  Closed = 20,
}

// ---- More primitive types ----

// Undefined
function checkAndPrintElement(arrElement: string | undefined) {
  if (arrElement === undefined) console.log(`invalid array element`);
  else console.log(`valid array element : ${arrElement}`);
}

let array = ['123', '456', '789'];
delete array[0]; // arr[0] = undefined;

for (let i = 0; i < array.length; i++) {
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

function printValues(a: number | null) {
  console.log(`a = ${a}`);
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
var globalString: string;
setGlobalString('this string is set');
// ! is the definite assignment assertion syntax
console.log(`globalString = ${globalString!}`);
function setGlobalString(value: string) {
  globalString = value;
}

// There are two placec where we can use it
// var globalString!: string;
// console.log(`globalString = ${globalString!}`);

// Object

let structuredObject: object = {
  name: 'myObject',
  properties: {
    id: 1,
    type: 'AnObject',
  },
};
function printObjectType(a: object) {
  console.log(`a: ${JSON.stringify(a)}`);
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
let a: any = 'test';
let aNumber: number = 2;
aNumber = a;

let u: unknown = 'an unknown';
u = 1;
let aNumber2: number;
aNumber2 = <number>u; // we must cast it in order to work

// Never

function alwaysThrows(): never {
  throw new Error('this will always throw');
  // return -1; // with never, this will produce error
}

// Never and switch
enum AnEnum {
  FIRST,
  SECOND,
}
function getEnumValue(enumValue: AnEnum): string {
  switch (enumValue) {
    case AnEnum.FIRST:
      return 'First Case';
    case AnEnum.SECOND: // This line fixes the error bellow
      return 'Second Case';
  }
  // error Type 'AnEnum.SECOND' is not assignable to type 'never'
  let returnValue: never = enumValue;
  return returnValue;
}

// ---- Tuples ----

/*
Tuples are a method of defining a type that has a finite number of unnamed
properties, with each property having an associated type. When using a tuple,
all of the properties must be provided.
*/

let tuple1: [string, boolean];
tuple1 = ['test', true];
// tuple1 = ['test']; // This will produce an error

// tuple1[2] = 'Hello'; // This will produce an error
// tuple1.push('Hello'); // This will not (maybe langauge bug)

// Optional tuple elements

let tupleOptional: [string, boolean?];

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
function concatValues(a: string, b?: string) {
  console.log(`a + b = ${a + b}`);
}
concatValues('first', 'second');
concatValues('third');

// Function signatures as parameters

function myCallback(text: string): void {
  console.log(`myCallback called with ${text}`);
}
function withCallbackArg(message: string, callbackFn: (text: string) => void) {
  callbackFn(`${message} from withCallback"`);
}

withCallbackArg('initial text', myCallback);
// withCallbackArg('text', 'this is not a function'); // This will produce an error

// Function overrides

/*
TypeScript provides an alternative to union types when defining
a function and allows a function signature to provide different parameter types.
*/
function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: any, b: any) {
  return a + b;
}

add('first', 'second');
add(1, 2);
// add(true, false); // This produces an error

/*
Here, we can see that the only valid function signatures are 
where the arguments a and b are both of type string, or where
the arguments a and b are both of type number. Even though our 
final function definition uses the type of any, this function 
definition is not made available and is simply used for the function 
implementation. We therefore cannot invoke this function with two boolean
 arguments, as the error shows.
*/

// ---- Literals ----

/*
TypeScript also allows us to use what are known as literals,
which are almost a hybrid of enums and type aliases. A literal
will limit the allowed values to a set of values specified. 
A literal can be made of string, number, or boolean values.
*/

type AllowedStringValues = 'one' | 'two' | 'three';
type AllowedNumericValues = 1 | 20 | 65535;
function withLiteral(input: AllowedStringValues | AllowedNumericValues) {
  console.log(`called with : ${input}`);
}

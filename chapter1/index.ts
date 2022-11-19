const firstName = `Mateo Vuković`;
console.log(`Hello ${firstName}`);

// ---- Type anotation ----

let myString: string = `this is a string`;

// myString = 1; // this gives us an error (TS2322)

let myBoolean: boolean = true;
let myNumber: number = 1234;
let myStringArray: string[] = [`Mateo`, `Sara`, `Future child`];

// ---- Inferred typing ----

let inferredString = `this is a string`;

// ---- Duck typing (for more complex variable types) ----

/*
Two variables are considered to have the same type if they have
the same properties and methods. 
*/

let nameIdObject = { name: 'Ivan', id: 1, print() {} };
nameIdObject = { id: 2, name: 'Mateo', print() {} };

// nameIdObject = { id: 3, name: 'Sara' }; // this gives us an error (TS2741)

let obj1 = { id: 1, print() {} };
let obj2 = { id: 2, print() {}, select() {} };
/*
The duck typing method is checking
whether obj2 has at least the properties of obj1.
*/
// obj1 = obj2; // will not generate error
// obj2 = obj1; // will generate error (TS2741)

// ---- Function signatures and void ----

function calculate(a: number, b: number, c: number): number {
  return a * b + c;
}

console.log(`calculate() = ${calculate(3, 4, 5)}`);

// console.log(`calculate() = ${calculate('3', '4', '5')}`);
// The above line will give us an error (TS2345)

function printString(a: string): void {
  console.log(a);
}

// const returnedValue: string = printString('Mateo');
// The above line will give us an error (TS2322)

// ---- JSDoc-style comments ----

/*
IntelliSense is a code completion tool that is built into Microsoft Visual Studio.
It is one of a number of similar tools that allow for intelligent code completion 
or intelligent text completion on different platforms.
*/

/**
 *
 * Given a string, log it to the console
 *
 * @param a The input string
 */

function log(a: string): void {
  console.log(a);
}

log('Mateo');

// ---- VS Code debugging ----

/*
Source maps are there to map the executing Javascript code back to the Typescript
source.
A launch.json file is used to configure the debugger in Visual Studio Code.
*/

// ---- Introducing third-party libraries ----

/*
Versioning:
 * will upgrade if a new major or minor or patch version is found
 ^ will upgrade if a new minor version or patch version is found
 ~ will upgrade if a new patch version is found
 */

/* 
Declaration files:
  superimpose strong typing on existing JS libraries (.d.ts exstension) 
*/

import * as inquirer from 'inquirer';

inquirer
  .prompt([
    {
      name: 'firstName',
      message: 'What is your first name?',
    },
  ])
  .then((answers) => {
    console.log(`Hello ${answers.firstName}`);
  });

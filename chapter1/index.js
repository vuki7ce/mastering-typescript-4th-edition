'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
exports.__esModule = true;
var firstName = 'Mateo Vukovi\u0107';
console.log('Hello '.concat(firstName));
// ---- Type anotation ----
var myString = 'this is a string';
// myString = 1; // this gives us an error (TS2322)
var myBoolean = true;
var myNumber = 1234;
var myStringArray = ['Mateo', 'Sara', 'Future child'];
// ---- Inferred typing ----
var inferredString = 'this is a string';
// ---- Duck typing (for more complex variable types) ----
/*
Two variables are considered to have the same type if they have
the same properties and methods.
*/
var nameIdObject = { name: 'Ivan', id: 1, print: function () {} };
nameIdObject = { id: 2, name: 'Mateo', print: function () {} };
// nameIdObject = { id: 3, name: 'Sara' }; // this gives us an error (TS2741)
var obj1 = { id: 1, print: function () {} };
var obj2 = { id: 2, print: function () {}, select: function () {} };
/*
The duck typing method is checking
whether obj2 has at least the properties of obj1.
*/
// obj1 = obj2; // will not generate error
// obj2 = obj1; // will generate error (TS2741)
// ---- Function signatures and void ----
function calculate(a, b, c) {
  return a * b + c;
}
console.log('calculate() = '.concat(calculate(3, 4, 5)));
// console.log(`calculate() = ${calculate('3', '4', '5')}`);
// The above line will give us an error (TS2345)
function printString(a) {
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
function log(a) {
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
var inquirer = __importStar(require('inquirer'));
inquirer
  .prompt([
    {
      name: 'firstName',
      message: 'What is your first name?',
    },
  ])
  .then(function (answers) {
    console.log('Hello '.concat(answers.firstName));
  });
//# sourceMappingURL=index.js.map

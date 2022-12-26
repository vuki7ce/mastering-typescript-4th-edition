// ---- Interfaces ----

interface IIdName {
  id: number;
  name: string;
}

/* 
TS2741: Property 'name' is missing in type '{ id: number; }'
but required in type 'IIdName'.
*/

// let idObject: IIdName = {
//   id: 2,
// };

// This is now good
let idObject: IIdName = {
  id: 2,
  name: 'this is a name',
};

// Optional property

interface IOptional {
  id: number;
  name?: string;
}

// Both are valid
let optionalId: IOptional = {
  id: 1,
};
let optionalIdName: IOptional = {
  id: 2,
  name: 'optional name',
};

// ---- Weak types ----

/*
When all properties of an interface are optional,
this interface is considered to be a weak type.
*/

interface IWeakType {
  id?: number;
  name?: string;
}

/*
TS2322: Type '{ description: string; }' is not assignable
to type 'IWeakType'. Object literal may only specify known properties,
and 'description' does not exist in type 'IWeakType'
*/
// let weakTypeNoOverlap: IWeakType = {
//   description: 'a description',
// };

let weakTypeNoOverlap: IWeakType = {}; // This is somehow valid

/*
Note that while we are able to create weak types in TypeScript,
they are really just an edge case in terms of usage. We should 
really be thinking differently about our interface definitions,
if all properties become optional, and we are introducing a weak type.
*/

// ---- Excess Property Checks ----

interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);

/*
In the above example with this interface, TypeScript lets us pass 
{ size: number; label: string; }
to something that only expected a { label: string; }.
We also just learned about optional properties.
However, combining the two naively would allow an error to sneak in.
For example:
*/

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || 'red',
    area: config.width ? config.width * config.width : 20,
  };
}

// This will procude an error
// let mySquare = createSquare({ colour: 'red', width: 100 });

/*
Object literals get special treatment and undergo excess property
checking when assigning them to other variables, or passing them as arguments.
If an object literal has any properties that the “target type” doesn’t have,
you’ll get an error (ONLY WHEN THERE ARE OPTIONAL PROPERTIES PRESENT):

Argument of type '{ colour: string; width: number; }' is not assignable to
parameter of type 'SquareConfig'. Object literal may only specify known 
properties, but 'colour' does not exist in type 'SquareConfig'.
Did you mean to write 'color'?
*/

// ---- The in operator in type guards ----

interface IIdName {
  id: number;
  name: string;
}
interface IDescrValue {
  descr: string;
  value: number;
}

function printNameOrValue(obj: IIdName | IDescrValue): void {
  if ('id' in obj) {
    console.log(`obj.name : ${obj.name}`);
  }
  if ('descr' in obj) {
    console.log(`obj.value : ${obj.value}`);
  }
}

printNameOrValue({
  id: 1,
  name: 'nameValue',
});

printNameOrValue({
  descr: 'description',
  value: 2,
});

printNameOrValue({
  descr: 'description',
  value: 2,
  name: 'This is a name', // This will also work
});

// ---- keyof ----

/*
TypeScript allows us to iterate through the properties of a 
type and extract the names of its properties through the keyof keyword,
which we can use as a string literal type.
*/

interface IPerson {
  id: number;
  name: string;
}
// This is equivalent to the following string literal:
// type PersonPropertyLiteral = "id" | "name";
type PersonPropertyName = keyof IPerson;

function getProperty(key: PersonPropertyName, value: IPerson) {
  console.log(`${key} = ${value[key]}`);
}
getProperty('id', { id: 1, name: 'firstName' });
getProperty('name', { id: 2, name: 'secondName' });
// getProperty('telephone', { id: 3, name: 'thirdName' }); will produce error

/*
Using the keyof keyword will generate a string literal that automatically includes
all of the properties of an interface. This technique is obviously preferable to
having to maintain string literals manually.
*/

// ---- Classes ----

/*
A class is the definition of an object, what data it holds, and what
operations it can hold.
*/

/*
error TS2564: Property 'id' has no initializer and is not definitely
assigned in the constructor.
There are two ways to fix this compiler error. 
We could set it to a default value such as 0, 
or we could simply make the id property a type union, as follows:
id: number | undefined;
*/
class SimpleClass {
  id: number | undefined;
  print(): void {
    console.log(`SimpleClass.print() called.`);
  }
}

let mySimpleClass = new SimpleClass();
mySimpleClass.print();

// ---- The this keyword ----

class SimpleClass2 {
  id: number | undefined;
  print(): void {
    console.log(`SimpleClass.id = ${this.id}`);
  }
}

let mySimpleClass2 = new SimpleClass2();
mySimpleClass2.id = 2020;
mySimpleClass2.print();

// ---- Implementing interfaces ----

interface IPrint {
  print(): void;
}

class ClassA implements IPrint {
  print(): void {
    console.log(`ClassA.print() called.`);
  }
}
class ClassB implements IPrint {
  print(): void {
    console.log(`ClassB.print() called.`);
  }
}

function printClass(a: IPrint) {
  a.print();
}

let classA = new ClassA();
let classB = new ClassB();
printClass(classA);
printClass(classB);

class ClassC {
  print(): void {
    console.log(`ClassC.print() called.`);
  }
}
let classC = new ClassC();
printClass(classC);

/*
Here, we have defined a class named ClassC that has the print function
that is required by the IPrint interface, but it does not explicitly
state that it implements the IPrint interface. Note how we are missing
the code "implements IPrint". We are still able to use the instance of this class,
named classC, however, in a call to the printClass function, 
on the last line of this snippet. This is a further example of 
TypeScript's duck typing rules, making sure that the shape of the type 
used is correct for a call to the printClass function. Defining interfaces,
and using them in our code, however, ensures that when changes are made to class definitions,
or interface definitions, we are able to trap any possible errors early.
*/

// ---- Class constructors ----

class ClassWithConstructor {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

let classWithConstructor = new ClassWithConstructor(10);
console.log(`classWithConstructor = 
    ${JSON.stringify(classWithConstructor)}`);

// ---- Class modifiers ----

/*
TypeScript introduces the public and private access modifiers to indicate
whether a class variable or function can be accessed from outside the class itself.
Additionally, we can also use the protected access modifier, which we will discuss a little later.
*/

class ClassWithPublicProperty {
  public id: number | undefined;
}
let publicAccess = new ClassWithPublicProperty();
publicAccess.id = 10;

class ClassWithPrivateProperty {
  private id: number;
  constructor(id: number) {
    this.id = id;
  }
}
let privateAccess = new ClassWithPrivateProperty(10);
// privateAccess.id = 20; This will produce an error

/*
Class functions and properties are public by default.
The use of class access modifiers is a tool that we can use when writing
TypeScript code and helps to protect variables from accidental assignment.
These access modifiers, however, will not appear in the JavaScript that is
generated from our code. The compiler will, in fact, remove any of these
constraints when generating JavaScript.
*/

// ---- Javascript private fields ----

class ClassES6Private {
  #id: number;
  constructor(id: number) {
    this.#id = id;
  }
}
let es6PrivateClass = new ClassES6Private(10);
// es6PrivateClass.#id = 20; This will produce a RUNTIME error:
/*
error TS18013: Property '#id' is not accessible outside class 
'ClassES6Private' because it has a private identifier.
*/

// ---- Constructor parameter properties ----

/*
TypeScript also introduces a shorthand version for access modifiers
that can be applied to parameters in a constructor function.
This shorthand syntax is only available for use within the constructor
function itself, and not in any other functions of a class.
*/

class ClassWithCtorMods {
  constructor(public id: number, private name: string) {}
}
let myClassMod = new ClassWithCtorMods(1, 'test');

/*
This shorthand automatically creates an internal id property, 
and a name property on the class itself, which can be used as standard properties.
And it also automatically links the contructor parameters as values for these properties.
So we will have in the constructor this.id = id; and this.name = name;
*/

// ---- Readonly ----

/*
In addition to the public and private access modifiers, 
we can also mark a class property as readonly. 
This is similar to the concept of the const keyword, 
and means that once a value has been assigned to a 
readonly property, it is not allowed to be modified.
We can only set a value for a readonly property 
within the class constructor function.
Note that readonly can also be used within interface definitions,
and that it is also excluded from the generated JavaScript.
*/

class ClassWithReadonly {
  readonly name: string;
  constructor(_name: string) {
    this.name = _name;
  }
  setNameValue(_name: string) {
    // this.name = _name; // This will produce an error
  }
}

// ---- Get and set ----

/*
ECMAScript 5 introduced the concept of property accessors, or get and set functions.
A property accessor is simply a function that is called when a 
user of our class gets the value of a property, or sets its value.
By using a function instead of a simple property, 
we can detect when someone modifies or accesses a property, 
which we can use to trigger other logic.
*/

class ClassWithAccessors {
  private _id: number = 0;
  get id(): number {
    console.log(`get id property`);
    return this._id;
  }
  set id(value: number) {
    console.log(`set id property`);
    this._id = value;
  }
}

let classWithAccessors = new ClassWithAccessors();
classWithAccessors.id = 10;
console.log(`classWithAccessors.id = ${classWithAccessors.id}`);

/*
The get and set functions, therefore, are exposing what looks like a
property to the outside world, named id, but internally within the class,
they are actually functions and not properties. 
*/

// ---- Static functions ----

class StaticFunction {
  static printTwo() {
    console.log(`2`);
  }
}
StaticFunction.printTwo();

// ---- Static properties ----

class StaticProperty {
  static count = 0;
  updateCount() {
    StaticProperty.count++;
  }
}

let firstInstance = new StaticProperty();
let secondInstance = new StaticProperty();
firstInstance.updateCount();
console.log(`StaticProperty.count = ${StaticProperty.count}`);
secondInstance.updateCount();
console.log(`StaticProperty.count = ${StaticProperty.count}`);

// ---- Namespaces ----

/*
When working within large projects, and particularly when working with 
large numbers of external libraries, there may come a time when two classes
or interfaces share the same name. TypeScript uses what are known as 
namespaces to cater for these situations.
Namespace cover all class or interface definitions that fall within their code block.
By making us refer to a class that is within a namespace by its fully qualified name,
the compiler will ensure that we have unique class names across our code base.
*/

namespace FirstNameSpace {
  export class NameSpaceClass {}
  class NotExported {}
}

let nameSpaceClass = new FirstNameSpace.NameSpaceClass();
// let notExported = new FirstNameSpace.NotExported(); // This will produce an error

// ---- Interface inheritance ----

// One interface can form the base interface for one or many other interfaces.

interface IBase {
  id: number;
}
interface IDerivedFromBase extends IBase {
  name: string;
}
//   This will produce an error (id is missing)
/* class IdNameClass implements IDerivedFromBase {
     name: string = "nameString";
 } */

// This implementation is the correct one
class IdNameClass implements IDerivedFromBase {
  id: number = 0;
  name: string = 'nameString';
}

/*
When using interface inheritance, we can also narrow
a type on a derived interface. Consider the following two interfaces:
*/

interface IBaseStringOrNumber {
  id: string | number;
}
interface IDerivedFromBaseNumber extends IBaseStringOrNumber {
  id: number;
}

// Interfaces also support multiple inheritance.

interface IMultiple extends IDerivedFromBase, IDerivedFromBaseNumber {
  description: string;
}
let multipleObject: IMultiple = {
  id: 1,
  name: 'myName',
  description: 'myDescription',
};

// ---- Class inheritance ----

class BaseClass implements IBase {
  id: number = 0;
}
class DerivedFromBaseClass extends BaseClass implements IDerivedFromBase {
  name: string = 'nameString';
}

// JavaScript does not support the concept of multiple inheritance when it comes to classes.
// A class, however, can implement multiple interfaces, as follows:

interface IFirstInterface {
  id: number;
}
interface ISecondInterface {
  name: string;
}
class MultipleInterfaces implements IFirstInterface, ISecondInterface {
  id: number = 0;
  name: string = 'nameString';
}

// ---- The super function ----

/*
When using inheritance, it is quite common for a base class and a derived
class to implement the same method. This is seen most often with class constructors.
If a derived class has a constructor, then this constructor must call the base class
constructor using the super keyword, or TypeScript will generate an error, as follows:
*/
class BaseClassWithCtor {
  private id: number;
  constructor(id: number) {
    this.id = id;
  }
}
class DerivedClassWithCtor extends BaseClassWithCtor {
  private name: string;
  constructor(id: number, name: string) {
    super(id);
    this.name = name;
  }
}

/*
Note that even if a base class does not define a constructor function,
if the derived class does define a constructor function, then the
derived class must call the super function with no arguments.
*/

// ---- Function overriding ----

class BaseClassWithFn {
  print(text: string) {
    console.log(`BaseClassWithFn.print() : ${text}`);
  }
}
class DerivedClassFnOverride extends BaseClassWithFn {
  // This print function will override the one from the base class
  print(text: string) {
    console.log(`DerivedClassFnOverride.print(${text})`);
  }
}

/*
However, if we want to use the one from the base class as part
of our implementation:
*/
class DerivedClassFnCallthrough extends BaseClassWithFn {
  print(text: string) {
    super.print(`from DerivedClassFncallthrough : ${text}`);
  }
}

// ---- Protected ----

/*
Classes can mark both properties and functions with the protected keyword.
If a property is marked as protected, then it is not accessible outside of
the class itself, similar to the behavior of the private keyword.
It is, however, accessible to derived classes, which is different to
private variables that are not accessible to derived classes, 
as can be seen in the following example:
*/

class BaseClassProtected {
  protected id: number;
  private name: string = '';
  constructor(id: number) {
    this.id = id;
  }
}
class AccessProtected extends BaseClassProtected {
  constructor(id: number) {
    super(id);
    console.log(`base.id = ${this.id}`);
    // console.log(`base.name = ${this.name}`); // This will produce an error
  }
}

// ---- Abstract classes ----

/*
An abstract class is a class that cannot be instantiated.
In other words, it is a class that is designed to be derived from.
The purpose of abstract classes is generally to provide a set of
basic properties or functions that are shared across a group of similar classes.
Abstract classes are marked with the abstract keyword.
*/

abstract class EmployeeBase {
  public id: number;
  public name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
class OfficeWorker extends EmployeeBase {}
class OfficeManager extends OfficeWorker {
  public employees: OfficeWorker[] = [];
}

let joeBlogg = new OfficeWorker(1, 'Joe');
let jillBlogg = new OfficeWorker(2, 'Jill');
let jackManager = new OfficeManager(3, 'Jack');

/*
Abstract classes are designed to be derived from.
They provide a convenient method of sharing common properties
and functions between groups of objects.
*/

// ---- Abstract class methods ----

/*
An abstract class method is similar to an abstract class,
in that it is designed to be overridden. In other words, declaring a class method as abstract
means that a derived class must provide an implementation of this method. 
For this reason, abstract class methods are not allowed to provide a function implementation.
*/

abstract class EmployeeBase2 {
  public id: number;
  public name: string;
  abstract doWork(): void;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class OfficeWorker2 extends EmployeeBase2 {
  // Actaul implementation
  doWork() {
    console.log(`${this.name} : doing work`);
  }
}

// ---- instanceof ----

/*
JavaScript provides the instanceof operator to test whether the given
function name appears in the prototype of an object. 
In TypeScript terms, the use of this keyword allows us to detect whether
an object is an instance of a class, or whether it
has been derived from a particular class. 
*/

// ---- Interfaces extending classes ----

// An interface can derive from a class definition
// Probably not something that is used often, but we will sew...
class BaseInterfaceClass {
  id: number = 0;
  print() {
    console.log(`this.id = ${this.id}`);
  }
}
interface IBaseInterfaceClassExt extends BaseInterfaceClass {
  setId(id: number): void;
}

class ImplementsExt
  extends BaseInterfaceClass
  implements IBaseInterfaceClassExt
{
  setId(id: number): void {
    this.id = id;
  }
}

// ---- Modules ----

/*
Modularization is a popular technique used in programming languages
that allows programs to be built from a series of smaller libraries, or modules.
This technique is also applied to object-oriented code bases, where each
class is typically housed in its own file. When referencing classes that
exist in another source file, we need a mechanism for the TypeScript compiler,
as well as the JavaScript runtime, to be able to locate the class
that we are referencing. This is where modules are used.

TypeScript has adopted the module syntax that is part of ES2015.
This means that we can use this syntax when working with modules, 
and the compiler will generate the relevant JavaScript to support 
modules based on the target JavaScript version we have selected. 
There is no change in syntax, and there is no change in our 
code in order to support earlier versions of the JavaScript runtime.
*/

// ---- Exporting and importing modules ----

import { Module1 } from './modules/Module1';
let mod1 = new Module1();
mod1.print();

// ---- Module renaming ----

import { Module1 as MyMod1 } from './modules/Module1';
let myRenamedMod = new MyMod1();
myRenamedMod.print();

/*
While module renaming is allowed in the module syntax,
it's standard practice not to do it at all.
The act of reading code, and trying to understand it,
means that we start to build a mental model of where each class or interface is defined.
Renaming a module within a specific file just makes the act of connecting a class
name to a particular file name all that more difficult. 
Module renaming should only be used in exceptional circumstances,
and for a very good reason.
*/

// ---- Multiple exports ----

/*
When working with external libraries, that is,
libraries that have been published for general consumption,
it is common practice for a published library to export all
classes, functions, and interfaces from a single module file.
This means that we do not need to know how this library 
is structured, or how complex the class hierarchy 
is internally; we simply import the entire library from one file.
*/

import { MultipleClass1, MultipleClass2 } from './modules/MultipleExports';
let mc1 = new MultipleClass1();
let mc2 = new MultipleClass2();

// ---- Module namespaces ----

/*
There is, however, another syntax that we can use to import
multiple symbols from a module. This syntax will import all
available exports from a module, without naming each of them
individually, by attaching them to a namespace, as follows:
*/

import * as MultipleExports from './modules/MultipleExports';
let meMc1 = new MultipleExports.MultipleClass1();
let meMc2 = new MultipleExports.MultipleClass2();

/*
Here, we are not importing individual classes from the ModuleExports.ts
file by naming each of them one by one. We are instead importing 
everything that has been exported by using the * as syntax. 
Note that this technique will attach a namespace to this module, 
and all references to classes or interfaces within 
this module must use the namespace name. 
*/

// ---- Default exports ----

import DefaultAdd, { ModuleNonDefaultExport } from './modules/DefaultExport';
let modDefault = DefaultAdd(1, 2);
let modNonDefault = new ModuleNonDefaultExport();

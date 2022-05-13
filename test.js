// class Pets {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class Dog extends Pets {
//   constructor(name, age) {
//     super(name, age);
//   }
//   sayGau() {
//     console.log(`Gau gau , ${this.name}, ${this.age}`);
//   }
// }
// class Cat extends Pets {
//   constructor(name, age) {
//     super(name, age);
//   }
//   sayMeow() {
//     console.log(`Meow meow , ${this.name}, ${this.age}`);
//   }
// }

// const cat = new Cat('Murza', 5);
// const dog = new Dog('Bable', 7);
// cat.sayMeow();
// dog.sayGau();
// console.log(dog.name);

// class User {
//   static myStaticValue = 100;

//   #name;
//   #age;

//   constructor(name, age) {
//     this.#name = name;
//     this.#age = age;
//   }
//   get name() {
//     return this.#name;
//   }
//   set name(value) {
//     if (typeof value === 'string') {
//       this.#name = value;
//     }
//   }
//   sayHello() {
//     console.log(`Hello I'm ${this.#name}  I'm ${this.#age}`);
//   }
//   logStaticValue() {
//     console.log(User.myStaticValue);
//   }
//   static logStatic() {
//     console.log(User.myStaticValue);
//   }
// }

// const gena = new User('Gena', 45);
// const vasya = new User('Vasya', 65);

// gena.sayHello();
// vasya.sayHello();
// gena.logStaticValue();
// User.logStatic();

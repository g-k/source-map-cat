// From: http://typescript.codeplex.com/SourceControl/changeset/view/258e00903a9e#samples/greeter/greeter.ts
class Greeter {
   constructor(public greeting: string) { }
   greet() {
       return "<h1>" + this.greeting + "</h1>";
   }
};
var greeter = new Greeter("Hello, world!");
var str = greeter.greet();
console.log(str);
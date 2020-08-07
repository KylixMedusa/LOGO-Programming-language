
let editor;
let turtle;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  background(0);
  turtle = new Turtle(250, 250, 0);
  editor = select("#code");
  editor.input(goTurtle);
  goTurtle();
}

function execute(commands) {
  for (let command of commands) {
    let name = command.name;
    console.log(name);
    let arg = command.arg;
    console.log(arg);
    if (name === "repeat") {
      for (let i = 0; i < arg; i++) {
        execute(command.commands);
      }
    }
    else if(name==="pd" || name==="pu"){
      commandLookUp[name]();
    }else {
      commandLookUp[name](arg);
    }
  }
}

function goTurtle() {
  background(0);
  push();
  turtle.reset();
  let code = editor.value();
  let parser = new Parser(code);
  let commands = parser.parse();
  execute(commands);
  pop();
}
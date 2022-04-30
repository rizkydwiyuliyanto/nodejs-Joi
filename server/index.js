const fs = require("fs");
const event = require("events");
const myEmitter = new event.EventEmitter();
const stream = require("stream");
const readline = require("readline");
const file = "./data/test.JSON"
fs.access(file, fs.constants.F_OK, (err) => {
  if (err){
    fs.mkdir('data',(err) => {
      if (err) throw err;
    });
    fs.writeFile(file, JSON.stringify({name:"asd", address:"asdasd"}), "utf-8", (err) => {
      if (err) {
        throw err
      }
      console.log("file created")
    })
  }
});
const firstEmitter = (x) => {
  console.log(x + " run on firstEmitter");
  myEmitter.removeListener("event", secondEmitter);
};
const secondEmitter = (...x) => {
  console.log(x.join(", ") + " " + "run on secondEmitter");
};

myEmitter.on("event", firstEmitter);
myEmitter.on("event", secondEmitter);

// myEmitter.emit("event", "1", "2", "3", "@");
// myEmitter.emit("event", "1", "2", "3", "@");

const writeFile = (data) => {
  return new Promise((resolve, rejects) => {
    if (!data) {
      rejects({ errorMessage: "No data" });
    }
    resolve(JSON.stringify(data, null, 2));
  });
};

const readFile = async () => {
  let student = {
    name: "Mike",
    age: 23,
    gender: "Male",
    department: "English",
    car: "Honda",
  };
  try {
    let data = await writeFile(student);
     fs.writeFile("student-json.JSON", data,(err) => {
       if (err) throw err
     })
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

// readFile();

function checkpassword(email, pass) {
  return new Promise((resove, reject) => {
    let getusername = email.find((x) => {
      return x.email === pass.email;
    });
    if (!getusername) {
      reject("email not found");
    } else {
      if (getusername.password !== pass.password) {
        reject("Incorrect password");
      }
    }
    resove("Yes, you're logged in");
  });
}

const myEmail = async (x, y) => {
  try {
    let pass = await checkpassword(x, y);
    console.log(pass);
  } catch (err) {
    console.log(err);
  }
};
const usersEmail = [
  {
    email: "dwiyuliyantorizky@gmail.com",
    password: "asdasdasd",
  },
  {
    email: "john@gmail.com",
    password: "w2112",
  },
  {
    email: "robert@gmail.com",
    password: "qwryty",
  },
];
const email2 = { email: "robert@gmail.com", password: "qwryty" };
// myEmail(usersEmail, email2);
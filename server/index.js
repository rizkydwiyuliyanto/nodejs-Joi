const bodyParser = require('body-parser');
let cors = require("cors");
const { post, deleted, get, update } = require("./app/middleware/app");
let express = require('express');
const fs = require("fs")
let app = express();
app.use(cors());
app.use(express.json());

const file = "./data/student-json.JSON"

const createFile = () =>{
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir("data", (err) =>{
        if (err) throw err
      })
      fs.writeFile(file, JSON.stringify([{}]), (err) =>{
        if (err) throw err
        console.log("file created");
      })
    }
  })
}

createFile();

app.get("/student", get)

app.put("/update/student/:id", update)

app.delete("/delete/student/:id", deleted)

app.post("/post/student", post)

app.listen(3005, () => {
  console.log("server is running")
})
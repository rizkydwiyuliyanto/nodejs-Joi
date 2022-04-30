const express = require("express");
const app = express()
const fs = require("fs");
const Joi = require("joi");
const joi = require('joi');
app.use(express.json())
fileDirName = "./data/student-json.JSON"
const post = async (req, res) => {
    const { name, age, gender, department, car, id } = req.body;
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
      gender: Joi.string().required(),
      department: Joi.string().required(),
      car: Joi.string().required(),
      id: Joi.string().required()
    })
    try {
      const value = await schema.validateAsync({
        id: id,
        name: name,
        age: age,
        gender: gender,
        department: department,
        car: car
      })
      fs.readFile(fileDirName,(err, fd) => {
        if (err)  throw err
        let data = JSON.parse(fd)
        let id_exist = data.find((x) => {
          return x.id === id
        }) 
        if (!id_exist){
          let student = ""
          const isEmpty = Object.keys(data[0]).length === 0
          if (isEmpty) {
            student = [value]
          }else{
            student = [...data, value]
          }
          fs.writeFile(fileDirName, JSON.stringify(student, null, 2), (err) => {
            if (err) throw err
              res.status(200).send({message :"Student posted", ok:true, status: 200})
          })
        }else{
         res.status(403).send({message :"duplicate ID !", ok:false, status: 403})
        }
      })
    }catch (err) {
      res.status(403).send({message :err.details[0].message, ok:false, status: 403})
    }

}

const deleted = (req, res) => {
    const id = req.params.id
    fs.readFile(fileDirName, (err, fd) => {
      if (err)throw err
      let data = JSON.parse(fd)
      let getid = data.find((x) => {
        return x.id === id
      })
      if (getid){
        let newData = data.filter((x) => {
          return x.id !== id
        })
        fs.writeFile(fileDirName, JSON.stringify(newData, null, 2), (err) => {
          if (err) throw err
          res.send(JSON.stringify(newData, null, 2))
        })
      }else{
        res.status(403).send({message :"User not exist", ok:false, status: 403})
      }
    })
}

const update = async(req, res)=> {
  const { name, age, gender, department, car} = req.body;
  const id = req.params.id
  const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
      gender: Joi.string().required(),
      department: Joi.string().required(),
      car: Joi.string().required(),
    })
    try {
      const value = await schema.validateAsync({
        name: name,
        age: age,
        gender: gender,
        department: department,
        car: car
      })
      fs.readFile(fileDirName,(err, fd) =>{
        if (err)throw err
        let data = JSON.parse(fd)
        let id_exist = data.find((x) => {
          return x.id === id
        })
        if (id_exist) {
          let newData = data.map((x) => {
            return x.id === id
              ? {
                  ...x,
                  name: value.name,
                  age: value.age,
                  gender: value.gender,
                  department: value.department,
                  car: value.car,
                }
              : x;
          });
          fs.writeFile(fileDirName, JSON.stringify(newData, null, 2), (err) => {
            if (err) throw err
            res.status(200).send({message :"Student updated", ok:true, status: 200})
          })
        }else{
          res.status(403).send({message :"User not exist", ok:false, status: 403})
        }
      })
    }catch (err) {
      res.status(403).send({message :err.details[0].message, ok:false, status: 403})
    }

}

const get = (req, res) => {
    fs.readFile(fileDirName, (err, data) => {
        if (err)  throw err
        res.send(JSON.parse(data))
    })
}

module.exports = {
    post,
    deleted,
    update,
    get
}
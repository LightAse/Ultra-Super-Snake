const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;


/********/
const UsrController = require('./controllers/user');
const Usr = require("./models/user");


mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hola estoy funcionando.");
});

// GET - POST - DELETE - PUT - PATCH 

app.post("/",(req,res) => {
    res.send("Llamada post");
});

// Get de todos los usuarios
app.get("/users",(req,res) =>{
    
    let limit = req.query.limit;
    let offset = req.query.offset;

    try{
        const results = UsrController.getAllUsers(limit,offset);
        res.status(200).json(results);

    }catch(error){

        res.status(500).send("Error. intente mas tarde");

    }

    res.send("Get Users");
});

// Get Info de un usuario

app.get("/users/:id",(req,res) =>{

    let userId =  req.params.id;

    try {
        
        user =  await UsrController.getUser(userId);

        res.status(200).json(user);

    } catch (error) {
        res.status(500).send("Error 500");
    }

});

// Creo un nuevo usuario

app.post("/users",async (req,res) =>{

    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    try{
        const result = await UsrController.addUser(name,lastname,email);
        if(result){
            res.status(201).send("Usuario creado correctamenta"); // 201
        }else{
            res.status(409).send('El usuario ya existe'); // 409
        }
    }catch(error){
        res.status(500).send("Error al crear el usuario."); //500
    }
});

// Modifico un usuario
app.put("/users/:id",async (req,res) =>{

    const user= {_id:req.params, ...req.body};
    try {
    
        const result = await UsrController.editUser(user);

    } catch (error) {
        
    }
    



    res.send("Modifico un usuario");
});

// Elimino un usuario
app.delete("/users/:id",(req,res) =>{
    res.send("Elimmino un usuario");
});

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
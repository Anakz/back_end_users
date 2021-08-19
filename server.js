// imports
var express = require('express')

//instantiate server
var server = express();

//Get the model users
const { users } = require('./models')

//Get the model adresses
const { adresses } = require('./models')

//Configutr routes
server.get('/', function (req , res){
    res.setHeader('Content-type', 'text/html')
    res.status(200).send('<h1>Bienvenue sur mon super serveur</h1>') //200 means success to the request
})

//Use the cors
const cors = require("cors");
// const { where } = require('sequelize/types');
server.use(
    cors({
        origin:"http://localhost:3000",
    })
)

//to list all the users
server.get("/select", (req,res) => {
    users.findAll()
    .then((users)=> {
        res.send(users);
    })
    .catch((err) =>{
        console.log(err);
    });
    //res.send("succes");
});

//to list all the user's adress
server.get("/selectAdress", (req,res) => {
    adresses.findAll() // {where: { id : 3 }} 
    .then((adresses)=> {
        res.send(adresses);
    })
    .catch((err) =>{
        console.log(err);
    });
    //res.send("succes");
});

//to add a user to the table users /:username/:email/:phone/:website/:comapny_name
server.post("/insert", (req, res) => {
    users.create({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        phone: req.body.phone,
        website: req.body.website,
        company_name: req.body.company_name,
    }).catch((err) => {
        if (err) {
            console.log("erreur : "+err);
        }
    });
    res.send("end insert");
});

//To delete a user
server.get("/delete/:idd", (req, res) =>{
    users.destroy({where : {id : req.params.idd} });
    res.send("delete with success");
})

//Create

/* server.post('api/user' , (req , res )=> {
        //console.log(req.body)
    var newUser = models.users.create({
        
    })
}) */

//Launch server
server.listen(3030, function(){
    console.log('Serveur on écoute')
});
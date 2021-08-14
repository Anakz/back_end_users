// imports
var express = require('express')

//instantiate server
var server = express();

//Get the model users
const { users } = require('./models')

//Configutr routes
server.get('/', function (req , res){
    res.setHeader('Content-type', 'text/html')
    res.status(200).send('<h1>Bienvenue sur mon super serveur</h1>') //200 means success to the request
})

//Use the cors
const cors = require("cors")
server.use(
    cors({
        origin:"http://localhost:3030",
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

//to add a user to the table users
server.get("/insert", (req, res) => {
    users.create({
        name : "Anas AKZAZ",
        username : "NIKOLA",
        email : "anasakzaz23@gmail.com",
        phone: "+212 655 508 814",
        website: "www.anasakzaz.com",
        company_name: "Nikola's company",
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
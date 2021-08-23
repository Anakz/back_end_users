// imports
var express = require('express')

//instantiate server
var server = express();

const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());

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
server.get("/allusers", (req,res) => {
    users.findAll()
    .then((users)=> {
        res.send(users);
    })
    .catch((err) =>{
        console.log(err);
    });
    //res.send("succes");
});
//to list one user
server.post("/OneUser", (req,res) => {
    const {body} = req ;
    if (body.id === undefined) {
        return false
    }
    else
    {
        users.findOne({where : {id : body.id}} )
        .then((users)=> {
            res.send(users);
        })
        .catch((err) =>{
            console.log(err);
        });
    }
    
    //res.send("succes");
});

//to list one adress
server.post("/OneAdress", (req,res) => {
    const {body} = req ;
    if (body.id === undefined) {
        return false
    }
    else
    {
        adresses.findOne({where : {userId : body.id}} )
        .then((adresse)=> {
            res.send(adresse);
        })
        .catch((err) =>{
            console.log(err);
        });
    }
    //res.send("succes");
});

//to list all the user's adress
server.get("/alladresses", (req,res) => {
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
    const {body} = req ;
    var U

    users.create({
        name : body.name,
        username : body.username,
        email : body.email,
        phone: body.phone,
        website: body.website,
        company_name: body.company_name,
    }).then((users)=> {
        
        U = users.id
        adresses.create({
            userId : U,//103
            home_adress1 : body.home_adress1,
            home_adress2 : body.home_adress2,
            work_adress : body.work_adress,
        }).catch((err) => {
            if (err) {
                console.log("erreur : "+err);
            }
        });
    })
    .catch((err) => {
        if (err) {
            console.log("erreur : "+err);
        }
    });
    

    res.send("end insert");
});

//To delete a user
server.delete("/delete/:id", (req, res) =>{
    // const {body} = req ;
    // res.json(body)
    // res.end()
    // users.destroy({id : body.id} );
    
    adresses.destroy({where : {userId : req.params.id} }).then(users.destroy({where : {id : req.params.id} }));
    res.send("delete with success server.js "+body.id);
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
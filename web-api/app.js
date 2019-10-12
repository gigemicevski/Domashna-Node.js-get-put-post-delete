var express = require('express');
require('dotenv/config');
var bodyParser = require('body-parser');
const fs = require('fs');
var path = require('path'); 


//read
let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
let users = JSON.parse(rawdata);
console.log(users);

//write//write

let addUser = { 
    name: 'Mike',
    surname: 'Michaels', 
    email: 'Male@madms.com',
    age: 23,
    isActive: true
};
 
let data = JSON.stringify(addUser, null, 2);
fs.writeFileSync('.json', data);


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/users/:name', (req, res) => {
    const found = users.some(user => user.name === req.params.name); //The some() method checks if any of the elements in an array pass a test (provided as a function).
    if(found){
        res.send(users.filter(users => users.name === req.params.name));
    }
    else{
        res.status(400).send({ msg:`No member with name ${req.params.name}`});
    }
});

app.post('/users', (req, res) => {
    const newUser = {
        
            "name": req.body.name,
            "surname": req.body.surname,
            "email": req.body.email,
            "age": req.body.age,
            "isActive":req.body.isActive,
           };
    if(!newUser.name){
        return res.status(400).json({msg:"Please enter the name"});
    }
    users.push(newUser);
    res.json(users);
});

app.put('/users/:name', (req, res) => {
    const found = users.some(user => user.name === req.params.name); //The some() method checks if any of the elements in an array pass a test (provided as a function).
    
    if(found){
       const updUser = req.body;
       users.forEach(user =>{
           if(user.name === req.params.name){
            user.name = updUser.name ? updUser.name : user.name;
            user.surname = updUser.surname ? updUser.surname : user.surname;        //if thats included //if the name is sent with request
            user.email = updUser.email ? updUser.email : user.email;;
            user.age = updUser.age ? updUser.age : user.age;
            user.isActive = updUser.isActive ? updUser.isActive : user.isActive;

            res.json({msg:'user updated', user}); 
           }
       });
    }
    else{
        res.status(400).send({ msg:`No member with name ${req.params.name}`});
    }
});

app.patch('/users/:name', (req, res) => {
    res.send("Partial update for user with id = " + req.params.id);
});

app.delete('/users/:name', (req, res) => {
    const found = users.some(user => user.name === req.params.name); 
    if(found){
        res.json({
            msg:'User Deleted',
            users: users.filter(users => users.name !== req.params.name)
        });
}   else { 
        res.status(400).send({ msg:`No member with name ${req.params.name}`});
    }
});

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});


// var num = function(){
//     for (let i = 0; i < 6; i++) {
//         const element = i+1;
//         console.log(element);
//         return element;
//     }
// }
// num();

// var usersId = users.map((obj) => {
//     return { 
//         id:'',
//         name: obj.name,
//         surname: obj.surname,
//         email: obj.email,
//         age: obj.age,
//         isActive: obj.isActive
      
//       };
      
//    });

//    console.log(usersId);
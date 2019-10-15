var express = require('express');
require('dotenv/config');
var bodyParser = require('body-parser');
const fs = require('fs');
var path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 


//read
let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
let users = JSON.parse(rawdata);
console.log(users);

//write//write

let addUser = { 
    name: 'Gligor',
    surname: 'Michevski', 
    email: 'Male@madms.com',
    age: 32,
    isActive: true
};
// let data = JSON.stringify(addUser, null, 2);
// fs.writeFileSync('web-api/.json', data);

fs.writeFile('web-api/.json', JSON.stringify(addUser,null,2), (err) => {
        if (err) console.log('Error writing file:', err)
    });



app.get('/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id)); //The some() method checks if any of the elements in an array pass a test (provided as a function).
    if(found){
        res.send(users.filter(users => users.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).send({ msg:`No member with name ${parseInt(req.params.id)}`});
    }
});

app.post('/users', (req, res) => {
    const newUser = {
            "id": req.body.id,
            "name": req.body.name,
            "surname": req.body.surname,
            "email": req.body.email,
            "age": req.body.age,
            "isActive":req.body.isActive,
           };
    if(!newUser.id){
        return res.status(400).json({msg:"Please enter your id"});
    }
    users.push(newUser);
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync('web-api/users.json', data);
    res.json(users);
});

app.put('/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id)); //The some() method checks if any of the elements in an array pass a test (provided as a function).
    
    if(found){
       const updUser = req.body;
       users.forEach(user =>{
           if(user.id === parseInt(req.params.id)){
            user.id = updUser.id ? updUser.id : user.id;
            user.name = updUser.name ? updUser.name : user.name;
            user.surname = updUser.surname ? updUser.surname : user.surname;        //if thats included //if the name is sent with request
            user.email = updUser.email ? updUser.email : user.email;;
            user.age = updUser.age ? updUser.age : user.age;
            user.isActive = updUser.isActive ? updUser.isActive : user.isActive;

            res.json({msg:'user updated', user}); 
            let data = JSON.stringify(users, null, 2);
             fs.writeFileSync('web-api/users.json', data);
           }
       });
    }
    else{
        res.status(400).send({ msg:`No member with this id ${parseInt(req.params.id)}`});
    }
});

app.patch('/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id)); //The some() method checks if any of the elements in an array pass a test (provided as a function).
    
    if(found){
       const updUser = req.body;
       users.forEach(user =>{
           if(user.id === parseInt(req.params.id)){
            user.id = updUser.id ? updUser.id : user.id;
            user.name = updUser.name ? updUser.name : user.name;
            user.surname = updUser.surname ? updUser.surname : user.surname;        //if thats included //if the name is sent with request
            user.email = updUser.email ? updUser.email : user.email;;
            user.age = updUser.age ? updUser.age : user.age;
            user.isActive = updUser.isActive ? updUser.isActive : user.isActive;

            res.json({msg:'user updated', user}); 
            let data = JSON.stringify(users, null, 2);
             fs.writeFileSync('web-api/users.json', data);
           }
       });
    }
    else{
        res.status(400).send({ msg:`No member with this id ${parseInt(req.params.id)}`});
    }
});
app.delete('/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id)); 
    if(found){
        users = users.filter(users => users.id !== parseInt(req.params.id));
        let data = JSON.stringify(users, null, 2);
        fs.writeFileSync('web-api/users.json', data);
        res.json({
            msg:'User Deleted',
            users: users.filter(users => users.id !== parseInt(req.params.id)),
            });
        
}   else { 
        res.status(400).send({ msg:`No member with this id ${parseInt(req.params.id)}`});
    }
});

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});



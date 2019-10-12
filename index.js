var funcForGenearateString = require("randomstring");
var axios = require('axios');
var print = require("./second");
var rn = require('random-number');

print.main();

var name = funcForGenearateString.generate({
  length: 12,
  charset: 'numeric'
});

//console.log(name);

function wrapper (a,b) {
  var c = a + b;
  return new Promise((resolve, reject) => {
    if(c>10) {
      resolve(c);
    }
    reject("Error zbirot vi e = " + c + ", a treba da e nad 10");
  });  
}

function wrapper2 (a) {
  return new Promise((resolve, reject) => {
    if(a%2==0) {
      resolve("Zbirot e paren");
    }
    reject("Zbirot NE e paren");
  });  
}

async function sum(){
  try {
    var sum = await wrapper(11,5);
    var result = await wrapper2(sum);
    console.log(result);
  
  } catch (error) {
    console.log(error);
  }
}

//sum();

async function getQuestions() {
  try {
    const response = await axios.get("https://opentdb.com/api.php?amount=10");
    // console.log(response.data);
        var options = {
          min:  1,
          max:  5,
          integer: true
        }
    var questionsList = response.data.results.map((obj) => {
      return { 
        question: obj.question,
        category: obj.category,
        dificulty:rn(options)
        };
        
     });
    //  .reduce((acc,cur)=>
    // {
    //   var average = response.data.results.dificulty * 2;
    //   console.log(response.data.results.dificulty);
    // });
    // console.log(response.data.results.dificulty);
    console.log(questionsList);
  } catch (error) {
    console.error(error);
  }
}

getQuestions();

async function postMail() {
  try {
    const response = await axios.post("http://urlexample.com",{
      ime: "nikola",
      prezime: "Stojkovski",
      oglasId: 1231234
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function Execute() {
  while(true) {
    await postMail();

  }
}

//Execute();

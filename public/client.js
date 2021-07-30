// $(function() {
  
//     let pet_info = {
//       "name" : "Fenrir",         express work in prog
//       "weight" : 6,            game interacted with pet directly vs creating new objects with standard js
//       "happiness": 0
//     }
    
//     checkAndUpdatePetInfoInHtml();
    
//     $('.treat-button').click(clickedTreatButton);
//     $('.play-button').click(clickedPlayButton);
//     $('.exercise-button').click(clickedExerciseButton);
    
//     function clickedTreatButton() {
//       pet_info['happiness'] = pet_info['happiness'] + 1;
//       pet_info['weight'] = pet_info['weight'] + 2;
//       checkAndUpdatePetInfoInHtml();
//     }
    
//     function clickedPlayButton() {
//       pet_info['happiness'] = pet_info['happiness'] + 2;
//       pet_info['weight'] = pet_info['weight'] - 1;
//       checkAndUpdatePetInfoInHtml();
//     }
    
//     function clickedExerciseButton() {
//       pet_info['happiness'] = pet_info['happiness'] - 1;
//       pet_info['weight'] = pet_info['weight'] - 1;
//       checkAndUpdatePetInfoInHtml();
//     }
  
//     function checkAndUpdatePetInfoInHtml() {
//       checkWeightAndHappinessBeforeUpdating();  
//       updatePetInfoInHtml();
//     }
    
//     function checkWeightAndHappinessBeforeUpdating() {
//       if (pet_info['weight'] < 1) {
//         pet_info['weight'] = 1;
//       }
//     }
    
//     function updatePetInfoInHtml() {
//       $('.name').text(pet_info['name']);
//       $('.weight').text(pet_info['weight']);
//       $('.happiness').text(pet_info['happiness']);
//     }
    
//   })
//form to object


// Variables
                                    //parameters to be used in functions
const ownersPetsInfo = {
  'Mastah FU' : {
    'petInfo' : {
      'petName' : 'Fenrir',     //storing data based on user input, pulls from api to be stored for later
      'weight' : 70,
      'happiness' : 30
    },                            //function to interact is down below line 145 if else statements
    'email' : 'boom@gmail.com'
  }
};

let currentPetOwner = 'Mastah FU'; // gets updated on new owner submit/adopt, starts w/fu
const lowestWeight = 5;
const highestWeight = 130;
const lowestHappiness = 7;


// Functions

function ValidateEmail(inputText) {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //  req regex validate!!!
  if (inputText.match(mailformat)) {
    return true;            //.match sends a boolean in this case t or f which i use in e.handler dwn below
  }
  else {
    return false;
  }
};

// function getPetName () {
//   var petNameReq = new XMLHttpRequest();
//   petNameReq.onreadystatechange = () => {
//     if (petNameReq.readyState === 4) {
//       let object = JSON.parse(petNameReq.responseText);
//       let petName = object.results[0].name.first;
//       return petName;
//     }
//   }
//   petNameReq.open("GET", "https://randomuser.me/api/");
//   petNameReq.send();
// };

function retrieveResponse(url){       // asyn/promise req returning promise!!!!!!!!!! 102-115
  return fetch(url);
}

async function getPetName() {
  let url = "https://randomuser.me/api/";
  let response = await retrieveResponse(url);
  let responseJSON = await response.json();
  let data = JSON.stringify(await responseJSON);
  return JSON.parse(data);
};

async function getPetPicture() {
  let url = "https://dog.ceo/api/breeds/image/random";
  let response = await retrieveResponse(url);
  let responseJSON = await response.json();
  let data = JSON.stringify(await responseJSON);
  return JSON.parse(data);
};

async function randomPetGenerator() {
  let petName = await getPetName(); //102-107
  let petPicture = await getPetPicture(); //110-115
  let weight = Math.floor(Math.random() * highestWeight) + lowestWeight;
  let happiness = lowestHappiness;
  let petObject = {
    'petName' : petName.results[0].name.first,
    'petPicture': petPicture.message,             //after "awaiting" all the things, assign to new object
    'weight': weight,
    'happiness': happiness
  }
  return petObject;
}

async function adoptPet (owner_name, owner_email) {   //102-115
  let newPet = await randomPetGenerator();
  currentPetOwner = owner_name;
  ownersPetsInfo[owner_name] = {
    'petInfo' : newPet,
    'email' : owner_email     // stores new owner and assigns new pet after submit calling from api above w/random stats
  };
};

function interactWithPet (weight, happiness, target) {
  let newWeight = weight;
  let newHappiness = happiness;

  if (target.className === 'treat-button') {
    newWeight = newWeight + 2;
    newHappiness = newHappiness + 1;

  } else if (target.className === 'play-button') {
    newWeight = newWeight - 1;
    newHappiness = newHappiness + 2;

  } else if (target.className === 'exercise-button') {
    newWeight = newWeight - 1;
    newHappiness = newHappiness - 1;

  };

  return [newWeight, newHappiness]                //req 2 arg return req!!!!! for the game   141-159 !!!!!!!
};

function getHappiestPet() {
  let owners = Object.keys(ownersPetsInfo);  //returns array of owners submitted including fu
  let ownerHappiestDog = owners.reduce( //acc , c
    (a,b) => {
      if (ownersPetsInfo[a].petInfo.happiness >= ownersPetsInfo[b].petInfo.happiness) { //compares all to mastah fu untill owner with the happiest is returned
        return a
      } else {
        return b
      }                               //object with in objects called
    }                                             //due to function
  )               //'master fus' dog 'fenrir' is the happiest with '#of tail wags'
  return `${ownerHappiestDog}'s dog ${ownersPetsInfo[ownerHappiestDog].petInfo.petName} is the happiest with ${ownersPetsInfo[ownerHappiestDog].petInfo.happiness} tail wags.`
}




// Event Handlers

/// consts for Event Handlers

const form = document.querySelector("#femail");
const addToList = document.querySelector('#objectListButton');
const treatButton = document.querySelector('.treat-button');
const playButton = document.querySelector('.play-button');
const exerciseButton = document.querySelector('.exercise-button');
const dashboard = document.querySelector('.dashboard');

///// Event handler functions

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const ownerHeadline = document.querySelector('#pet-owner-headline');
    const petImage = document.querySelector('.pet-image');
    if (ValidateEmail(email)) {
      const name = data.get('name');
      await adoptPet(name, email)
      ownerHeadline.textContent = `${name}'s Puppy Dog`
      dashboard.querySelector('.name').innerHTML = ownersPetsInfo[name].petInfo.petName;
      dashboard.querySelector('.weight').innerHTML = ownersPetsInfo[name].petInfo.weight;
      dashboard.querySelector('.happiness').innerHTML = ownersPetsInfo[name].petInfo.happiness;
      petImage.setAttribute('src', ownersPetsInfo[name].petInfo.petPicture);
    }
    else {
      alert('Please provide a valid email address.');
    }  
  }


form.addEventListener('submit', handleSubmit);
//----------------------------------------------- display object      req 218 displaysinfo from object ownerspetinfoObject!!!

addToList.addEventListener('click', () => {
  let p = document.querySelector("#happiest-pet");
  p.innerHTML = getHappiestPet();
});

treatButton.addEventListener(
  'click',
  (event) => {
    let weight = ownersPetsInfo[currentPetOwner].petInfo.weight;
    let happiness = ownersPetsInfo[currentPetOwner].petInfo.happiness;
    let target = event.target;
    let newValues = interactWithPet(weight, happiness, target);

    dashboard.querySelector('.weight').innerHTML = newValues[0];
    dashboard.querySelector('.happiness').innerHTML = newValues[1];

    ownersPetsInfo[currentPetOwner].petInfo.weight = newValues[0];
    ownersPetsInfo[currentPetOwner].petInfo.happiness = newValues[1];
  }
)

playButton.addEventListener(
  'click',
  (event) => {
    let weight = ownersPetsInfo[currentPetOwner].petInfo.weight;
    let happiness = ownersPetsInfo[currentPetOwner].petInfo.happiness;
    let target = event.target;
    let newValues = interactWithPet(weight, happiness, target);

    dashboard.querySelector('.weight').innerHTML = newValues[0];
    dashboard.querySelector('.happiness').innerHTML = newValues[1];

    ownersPetsInfo[currentPetOwner].petInfo.weight = newValues[0];
    ownersPetsInfo[currentPetOwner].petInfo.happiness = newValues[1];
  }
)

exerciseButton.addEventListener(
  'click',
  (event) => {
    let weight = ownersPetsInfo[currentPetOwner].petInfo.weight;
    let happiness = ownersPetsInfo[currentPetOwner].petInfo.happiness;
    let target = event.target;
    let newValues = interactWithPet(weight, happiness, target);

    dashboard.querySelector('.weight').innerHTML = newValues[0];
    dashboard.querySelector('.happiness').innerHTML = newValues[1];

    ownersPetsInfo[currentPetOwner].petInfo.weight = newValues[0];
    ownersPetsInfo[currentPetOwner].petInfo.happiness = newValues[1];
  }
)

// var petNameReq = new XMLHttpRequest();
// petNameReq.onreadystatechange = () => {
//   if (petNameReq.readyState === 4) {
//     let object = JSON.parse(petNameReq.responseText);
//     console.log(object.results[0].name.first);
//   }
// }
// petNameReq.open("GET", "https://randomuser.me/api/");
// petNameReq.send();


//json------------------------------------------------
// const fs = require("fs"); //node module
  
// Storing the JSON format data in myObject
// var data = fs.readFileSync("data.json");
// var myObject = JSON.parse(data);
  
// Defining new data to be added
// let newData = {
//   "email": "value.handleSubmit",
// };
  
// // Adding the new data to our object
// myObject.push(newData);
  
// // Writing to our JSON file
// var newData2 = JSON.stringify(myObject);
// fs.writeFile("data2.json", newData2, (err) => {
//   // Error checking
//   if (err) throw err;
//   console.log("New data added");
// });
  
  
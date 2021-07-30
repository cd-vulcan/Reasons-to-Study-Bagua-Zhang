// $(function() {
  
//     let pet_info = {
//       "name" : "Fenrir",
//       "weight" : 6,
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

const ownersPetsInfo = {
  'Mastah FU' : {
    'petInfo' : {
      'petName' : 'Fenrir',
      'weight' : 70,
      'happiness' : 30
    },
    'email' : 'boom@gmail.com'
  }
};

let currentPetOwner = 'Mastah FU';
const lowestWeight = 5;
const highestWeight = 130;
const lowestHappiness = 7;


// Functions

function ValidateEmail(inputText) {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (inputText.match(mailformat)) {
    return true;
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

function retrieveResponse(url){
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
  let petName = await getPetName();
  let petPicture = await getPetPicture();
  let weight = Math.floor(Math.random() * highestWeight) + lowestWeight;
  let happiness = lowestHappiness;
  let petObject = {
    'petName' : petName.results[0].name.first,
    'petPicture': petPicture.message,
    'weight': weight,
    'happiness': happiness
  }
  return petObject;
}

async function adoptPet (owner_name, owner_email) {
  let newPet = await randomPetGenerator();
  currentPetOwner = owner_name;
  ownersPetsInfo[owner_name] = {
    'petInfo' : newPet,
    'email' : owner_email
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

  return [newWeight, newHappiness]
};

function getHappiestPet() {
  let owners = Object.keys(ownersPetsInfo);
  let ownerHappiestDog = owners.reduce(
    (a,b) => {
      if (ownersPetsInfo[a].petInfo.happiness >= ownersPetsInfo[b].petInfo.happiness) {
        return a
      } else {
        return b
      }
    } 
  )
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
//----------------------------------------------- display object

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
  
  
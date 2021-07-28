$(function() {
  
    let pet_info = {
      "name" : "Fenrir",
      "weight" : 6,
      "happiness": 0
    }
    
    checkAndUpdatePetInfoInHtml();
    
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    
    function clickedTreatButton() {
      pet_info['happiness'] = pet_info['happiness'] + 1;
      pet_info['weight'] = pet_info['weight'] + 2;
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      pet_info['happiness'] = pet_info['happiness'] + 2;
      pet_info['weight'] = pet_info['weight'] - 1;
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      pet_info['happiness'] = pet_info['happiness'] - 1;
      pet_info['weight'] = pet_info['weight'] - 1;
      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      if (pet_info['weight'] < 1) {
        pet_info['weight'] = 1;
      }
    }
    
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
    }
    
  })
//form to object
function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = data.get('email');
    console.log({ value });
    }
const form = document.querySelector("#femail");
form.addEventListener('submit', handleSubmit);

//json------------------------------------------------
const fs = require("fs");
  
// Storing the JSON format data in myObject
var data = fs.readFileSync("data.json");
var myObject = JSON.parse(data);
  
// Defining new data to be added
let newData = {
  country: "England",
};
  
// Adding the new data to our object
myObject.push(newData);
  
// Writing to our JSON file
var newData2 = JSON.stringify(myObject);
fs.writeFile("data2.json", newData2, (err) => {
  // Error checking
  if (err) throw err;
  console.log("New data added");
});
  
  
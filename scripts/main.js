import locationsArray from '../locations.js';

let locationElement = document.getElementById("bgrtwo");
let locationElement2 = document.getElementById("bgrone");

window.addEventListener('load', main);

locationElement.addEventListener('click', locationHandler);
locationElement.addEventListener('touch', locationHandler);
locationElement2.addEventListener('click', colorFunction1);
locationElement2.addEventListener('touch', colorFunction1);

function main() {
    console.log('Page is fully loaded');
}



function colorFunction1() {
    document.getElementById("targetloc").innerHTML = "The Treasure is in the location ";
    document.getElementById("lbl").innerHTML = targetLoc.Name;
    document.getElementById("device-lat1").innerHTML = targetLoc.coordinates[0].latitude;
    document.getElementById("device-long1").innerHTML = targetLoc.coordinates[0].longitude;
    // let utterance = new SpeechSynthesisUtterance(`The location where the treasure is ${targetLoc.Name}`);
    // speechSynthesis.speak(utterance);


}

function colorFunction2() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", ];
    const random = Math.floor(Math.random() * values.length);
    let value = values[random];
    document.getElementById("bgrtwo").style.backgroundColor = "#99cfe0";
    document.getElementById("lbl2").innerHTML = value;
    let utterance = new SpeechSynthesisUtterance(`     You have picked the card of color Light Blue of the value     ${value}`);
    speechSynthesis.speak(utterance);
}

async function locationHandler() {
}
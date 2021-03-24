import data from './speech.js'
// import locationsArray from "./init-locations.js"

let colorElement1 = document.getElementById("status");
let colorElement2 = document.getElementById("status1");

function main() {
    console.log('Page is fully loaded');
}

window.addEventListener('load', main);
colorElement1.addEventListener('click', onClickSquareBox1);
colorElement1.addEventListener('touch', onClickSquareBox1);
colorElement2.addEventListener('click', onClickSquareBox2);
colorElement2.addEventListener('touch', onClickSquareBox2);



async function onClickSquareBox1() {

    data.forEach(function(value){
        document.getElementById("status").innerHTML = "You have reached the target location.";
        let utterance = new SpeechSynthesisUtterance(value.status_message);
        speechSynthesis.speak(utterance);
    });
}

async function onClickSquareBox2() {
    
    data.forEach(function(value){
        document.getElementById("status1").innerHTML = value.status1_message;
        let utterance = new SpeechSynthesisUtterance(value.status1_message);
        speechSynthesis.speak(utterance);
    });
}




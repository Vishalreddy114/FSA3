import { isInsideCircle } from './location-circle.js';
import locationsArray from "./init-locations.js";


// let device, location;
let colorElement = document.getElementById("status1");
let colorElement1 = document.getElementById("status");

let currentlat, currentlon, error = true;
let targetLoc = null;

function main() {
  console.log('Page is fully loaded');
}

window.addEventListener('load', main);
colorElement.addEventListener('click', onClickSquareBox2);
colorElement.addEventListener('touch', onClickSquareBox2);
colorElement1.addEventListener('click', onClickSquareBox1);
colorElement1.addEventListener('touch', onClickSquareBox1);


async function onClickSquareBox1() {
  /* Ajax to get a random location from the database when the first box is clicked */
  // $(document).ready(function () {

  fetch("/location/findRandom").then(res=> res.json()).then((data)=>{
    console.log("****************",data)
    targetLoc = data;
    document.getElementById("targetloc").innerHTML =
    "Your target location is "+data.locationName;
  document.getElementById("lbl").innerHTML = " ";
  let utterance = new SpeechSynthesisUtterance(
    `Your target location is `+data.locationName
  );
  
  speechSynthesis.speak(utterance);
  document.getElementById("device-lat").innerHTML =
    " ";
  document.getElementById("device-long").innerHTML =
    " ";
    
  })

}



async function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }).then(position => {
    return position;
  });
}

// let currentlat, currentlon, loc, error = true;
// let targetLoc = locationsArray[Math.floor(Math.random() * locationsArray.length)];

async function onClickSquareBox2() {
  console.log(targetLoc,"----------box2")
  if (!targetLoc) return;
  const locText = await getLocation();

  [currentlat, currentlon] = [
    locText.coords.latitude,
    locText.coords.longitude,
  ];


  document.getElementById("error-message").innerHTML = "";
  document.getElementById("location").innerHTML = "";

  document.getElementById("device-lat").innerHTML = `Your location is `;

  document.getElementById("device-long").innerHTML = `(${currentlat.toFixed(5)}, ${currentlon.toFixed(5)})`;

  if (isInside(targetLoc.locationLatitude, targetLoc.locationLongitude)) {
    document.getElementById("location").innerHTML = `Congratulations!, You have found the location ${targetLoc.locationName}`;
    let utterance = new SpeechSynthesisUtterance(`Congratulations!, You have found the location ${targetLoc.locationName}`);
    speechSynthesis.speak(utterance);

  }
  else {
    const directions = dirToCoord(currentlat, currentlon);
    const message = `Sorry,You're far from the treasure. Please head ${
      directions.length > 1
        ? `${directions[0]} ${directions[1]}`
        : directions[0]
      }.`;
    document.getElementById("error-message").innerHTML = message;
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
  }
}


function isInside(questLat, questLon) {
  let distance = distanceBetweenLocations(questLat, questLon);
  console.log("distance: " + distance);
  if (distance < 30) {
    return true;
  } else {
    return false;
  }
}

function dirToCoord(currentLatitude, currentLongitude) {
  const questLatitude = targetLoc.locationLatitude;
  const questLongitude = targetLoc.locationLongitude;
  let directionsArray = [];

  if (currentLatitude > questLatitude) directionsArray.push("South");
  else directionsArray.push("North");

  if (currentLongitude < questLongitude) directionsArray.push("East");
  else directionsArray.push("West");

  return directionsArray;
}

function distanceBetweenLocations(questLat, questLon) {
  const R = 6371e3;
  const φ1 = currentlat * Math.PI / 180;
  const φ2 = questLat * Math.PI / 180;
  const Δφ = (questLat - currentlat) * Math.PI / 180;
  const Δλ = (questLon - currentlon) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  return d;
}





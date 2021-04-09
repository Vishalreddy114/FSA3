import { isInsideCircle } from './location-circle.js';
import locationsArray from "./init-locations.js";


// let device, location;
let colorElement = document.getElementById("status1");
let colorElement1 = document.getElementById("status");



window.addEventListener('load', main);
colorElement.addEventListener('click', onClickSquareBox2);
colorElement.addEventListener('touch', onClickSquareBox2);
colorElement1.addEventListener('click', onClickSquareBox1);
colorElement1.addEventListener('touch', onClickSquareBox1);

function main() {
    console.log('Page is fully loaded');
}

<<<<<<< HEAD
let currentlat, currentlon, error = true;
let targetLoc = null;
=======
async function onClickSquareBox1() {


    if (inc == locationsArray.length) {
        inc = 0;
    }
>>>>>>> c38300364977d651886550fac1530a6a27cc6dda

async function onClickSquareBox1() {
    /* Ajax to get a random location from the database when the first box is clicked */
  $.ajax({
    type: "GET",
    url: "/location/findRandom",
    success: function (coord) {
        targetLoc = coord;
        // document.getElementById("targetloc").innerHTML =
        //   "Your target location is ";
      location = {
        name: coord.locationName,
        coordinates: coord.coordinate,
      };
      let confirmation = "Your target location is " + location.name;
      document.getElementById("targetloc").innerHTML  = confirmation;
      let utterance = new SpeechSynthesisUtterance(confirmation);
      speechSynthesis.speak(utterance);
    },
  });

    // if (inc == locationsArray.length) {
    //     inc = 0;
    // }

    // // TESTING CHANGES
    // console.log("GET STORAGE LOCATIONS", localStorage.getItem("locations"));

    // document.getElementById("targetloc").innerHTML = `The Treasure is in the location ${locationsArray[inc].Name}`;
    // // document.getElementById("lbl").innerHTML = targetLoc.Name;
    // let utterance = new SpeechSynthesisUtterance(`The treasure is in the location ${locationsArray[inc].Name}`);
    // speechSynthesis.speak(utterance);
    // //document.getElementById("device-lat").innerHTML = locationsArray[inc].coordinate.latitude;
    // //document.getElementById("device-long").innerHTML = locationsArray[inc].coordinate.longitude;
    // inc++;



}



async function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(position => {
        return position;
    });
}

<<<<<<< HEAD
// let currentlat, currentlon, loc, error = true;
// let targetLoc = locationsArray[Math.floor(Math.random() * locationsArray.length)];

async function onClickSquareBox2() {
    if (!targetLoc) return;
=======
let currentlat, currentlon, loc, error = true;
//let targetLoc = locationsArray[Math.floor(Math.random() * locationsArray.length)];

async function onClickSquareBox2() {
    if(inc==1){
>>>>>>> c38300364977d651886550fac1530a6a27cc6dda
    const locText = await getLocation();

    [currentlat, currentlon] = [
        locText.coords.latitude,
        locText.coords.longitude,
      ];


    document.getElementById("error-message").innerHTML = "";
    document.getElementById("location").innerHTML = "";
    
    document.getElementById("device-lat").innerHTML = `Your location is `;
    
    document.getElementById("device-long").innerHTML = `(${currentlat.toFixed(5)}, ${currentlon.toFixed(5)})`;

        if (isInside(targetLoc.Latitude, targetLoc.Longitude)) {
            document.getElementById("location").innerHTML = `Congratulations!, You have found the location ${targetLoc.Name}`;
            let utterance = new SpeechSynthesisUtterance(`Congratulations!, You have found the location ${targetLoc.Name}`);
            speechSynthesis.speak(utterance);
            
        }
        else{
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





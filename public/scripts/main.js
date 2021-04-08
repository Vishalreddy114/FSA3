import { isInsideCircle } from './location-circle.js';
import locationsArray from "./init-locations.js";


// let device, location;
let colorElement = document.getElementById("status1");
let colorElement1 = document.getElementById("status");
let inc = 0;


window.addEventListener('load', main);
colorElement.addEventListener('click', onClickSquareBox2);
colorElement.addEventListener('touch', onClickSquareBox2);
colorElement1.addEventListener('click', onClickSquareBox1);
colorElement1.addEventListener('touch', onClickSquareBox1);

function main() {
    console.log('Page is fully loaded');
}

async function onClickSquareBox1() {
    /* Ajax to get a random location from the database when the first box is clicked */
  $.ajax({
    type: "GET",
    url: "/location/get-a-random-location",
    success: function (coord) {
      location = {
        name: coord.locationName,
        coordinates: coord.coordinate,
      };
      let confirmation = "Your target location is " + location.name;
      colorElement1.innerHTML = confirmation;
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
    // document.getElementById("lbl").innerHTML = targetLoc.Name;
    // let utterance = new SpeechSynthesisUtterance(`The treasure is in the location ${locationsArray[inc].Name}`);
    // speechSynthesis.speak(utterance);
    // document.getElementById("device-lat").innerHTML = locationsArray[inc].coordinate.latitude;
    // document.getElementById("device-long").innerHTML = locationsArray[inc].coordinate.longitude;
    // inc++;



}
//     location = locationsArray[0];
//     let confirmation = "Your target location is " + location.name;
//     document.getElementById("status1").innerHTML = confirmation;
//     let utterance = new SpeechSynthesisUtterance(confirmation);
//     speechSynthesis.speak(utterance);
// }

// async function onClickSquareBox1() {
//     device = await getLocation();

//     let isInside = isInsideCircle(device, location);
//     let status;
//     let speak;
//     status = "Device Coordinates: " + "<br>";
//     status += "Latitude: " + device.coords.latitude + "<br>";
//     status += "Longitude: " + device.coords.longitude + "<br>";
//     if (isInside) {
//         status += "Congratulations!! You have reached the destination: " + location.name;
//         speak = "Congratulations!! You have reached the destination: " + location.name;
//     } else {
//         status += "You haven't reached the destination";
//         speak = "You haven't reached the destination";
//     }
//     document.getElementById("status").innerHTML = status;
//     let utterance = new SpeechSynthesisUtterance(speak);
//     speechSynthesis.speak(utterance);
// }

// // collects current location
// async function getLocation() {
//     return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     }).then((position) => {
//         return position;
//     });
// }
// function onClickSquareBox2() {
//     document.getElementById("targetloc").innerHTML = "The Treasure is in the location ";
//     document.getElementById("lbl").innerHTML = targetLoc.Name;
//     document.getElementById("device-lat1").innerHTML = targetLoc.coordinates[0].latitude;
//     document.getElementById("device-long1").innerHTML = targetLoc.coordinates[0].longitude;
//     let utterance = new SpeechSynthesisUtterance(`The location where the treasure is ${targetLoc.Name}`);
//     speechSynthesis.speak(utterance);


// }


async function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(position => {
        return position;
    });
}

let currentlat, currentlon, loc, error = true;
let targetLoc = locationsArray[Math.floor(Math.random() * locationsArray.length)];

async function onClickSquareBox2() {
    const locText = await getLocation();
    // loc = 'Your current Location';
    // document.getElementById("location").innerHTML = loc;
    currentlat = locText.coords.latitude;
    console.log(currentlat)
    document.getElementById("device-lat").innerHTML = currentlat.toFixed(6);
    currentlon = locText.coords.longitude;
    console.log(currentlon)
    document.getElementById("device-long").innerHTML = currentlon.toFixed(6);

    locationsArray.forEach(function (value) {
        if (isInside(value.Latitude, value.Longitude)) {
            document.getElementById("location").innerHTML = value.Name;
            let utterance = new SpeechSynthesisUtterance(`Congratulations!, You have found the location ${value.Name}`);
            speechSynthesis.speak(utterance);
            error = false;
        }
    });

    if (error) {
        console.log("error is here")
        document.getElementById("error-message").innerHTML = "Sorry,You're far from the treasure";
        let utterance = new SpeechSynthesisUtterance("Sorry,You're far from the treasure");
        speechSynthesis.speak(utterance);
    } else {
        document.getElementById("error-message").innerHTML = "";
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




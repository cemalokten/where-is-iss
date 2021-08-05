'use strict';

let longitude = null;
let latitude = null;

function assignLongitude(long, lat) {
  longitude = long;
  latitude = lat;
}

// function changeColour(value) {
//   if (value) {
//   }
// }

fetch('https://api.wheretheiss.at/v1/satellites/25544')
  .then((response) => response.json())
  .then((data) => {
    assignLongitude(data.longitude, data.latitude);
    return fetch(
      `https://api.onwater.io/api/v1/results/${latitude},${longitude}?access_token=-yxsyX6EsS4ysebkXji6`
    );
  })
  .then((response) => response.json())
  .then((something) => console.log(something.water));

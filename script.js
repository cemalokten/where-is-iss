'use strict';

const body = document.getElementsByTagName('body');
const marqueeText = Array.from(document.getElementsByClassName('content'));
marqueeText.forEach((text) => (text.innerHTML = text.innerHTML.repeat(10)));
const locationText = Array.from(document.getElementsByClassName('location--js'));
const velocityText = Array.from(document.getElementsByClassName('velocity--js'));

let longitude = null;
let latitude = null;

function assignLongitude(long, lat) {
  longitude = long;
  latitude = lat;
}

function changeColourAndLocation(array, value) {
  array.forEach((c) => {
    if (value) {
      c.textContent = 'SEA';
    } else {
      c.textContent = 'LAND';
    }
  });

  if (value) {
    body[0].style.backgroundColor = 'var(--sea)';
  } else {
    body[0].style.backgroundColor = 'var(--land)';
  }
}

function changeVelocity(array, num) {
  array.forEach((e) => {
    e.textContent = `${Math.round(num * 100) / 100} km/h`;
  });
}

fetch('https://api.wheretheiss.at/v1/satellites/25544')
  .then((response) => response.json())
  .then((data) => {
    assignLongitude(data.longitude, data.latitude);

    changeVelocity(velocityText, data.velocity);

    return fetch(`https://api.onwater.io/api/v1/results/${latitude},${longitude}?access_token=-yxsyX6EsS4ysebkXji6`);
  })
  .then((response) => response.json())
  .then((landOrSea) => changeColourAndLocation(locationText, landOrSea));

//  - THE ISS IS OVER <span class='location--js'></span> TRAVELLING AT <span
//                       class='velocity--js'></span>

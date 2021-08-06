'use strict';

const body = document.getElementsByTagName('body');
const marqueeText = Array.from(document.getElementsByClassName('content'));
let detailColour = null;
marqueeText.forEach((text) => (text.innerHTML = text.innerHTML.repeat(10)));

let longitude = null;
let latitude = null;
let landOrSeaBol = null;
let velocity = null;

function assignLongitude(long, lat, vel) {
  longitude = long;
  latitude = lat;
  velocity = Math.round(vel * 100) / 100;
}

function changeColourAndLocation(value) {
  if (value) {
    landOrSeaBol = 'SEA';
    body[0].style.backgroundColor = 'var(--sea)';
  } else {
    landOrSeaBol = 'LAND';
    body[0].style.backgroundColor = 'var(--land)';
  }
}

function setTextColour(val) {
  detailColour.forEach((c) => {
    if (val == 'SEA') {
      c.style.color = 'var(--sea)';
    } else {
      c.style.color = 'var(--land)';
    }
  });
}

function buildMarquee(vel, landOrSea) {
  return `THE ISS IS OVER <span class='detail'>${landOrSeaBol}</span> TRAVELLING AT <span class='detail'>${velocity} km/h</span> → `;
}

fetch('https://api.wheretheiss.at/v1/satellites/25544')
  .then((response) => response.json())
  .then((data) => {
    assignLongitude(data.longitude, data.latitude, data.velocity);

    return fetch(`https://api.onwater.io/api/v1/results/${latitude},${longitude}?access_token=-yxsyX6EsS4ysebkXji6`);
  })
  .then((response) => response.json())
  .then((landOrSea) => changeColourAndLocation(landOrSea.water))
  .then(() => {
    marqueeText.forEach((text) => (text.innerHTML = buildMarquee(velocity, landOrSeaBol).repeat(45)));
  })
  .then(() => {
    detailColour = Array.from(document.getElementsByClassName('detail'));
    setTextColour(landOrSeaBol);
  });

//  - THE ISS IS OVER <span class='location--js'></span> TRAVELLING AT <span
//                       class='velocity--js'></span>

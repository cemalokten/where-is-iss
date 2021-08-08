'use strict';

/*  🌋 A PERSONAL CHALLENGE TO LEARN MORE ABOUT FETCH 
    2 - 3 HOURS TO CREATE SOMETHING FROM SCRATCH
*/

// Variables

const body = document.getElementsByTagName('body');
const marqueeText = Array.from(document.getElementsByClassName('content'));

let detailColour = null;
let longitude = null;
let latitude = null;
let landOrSeaBol = null;
let velocity = null;

marqueeText.forEach((text) => (text.innerHTML = text.innerHTML.repeat(10)));

// Set constants after fetch, if this is done before then it returns undefined!

function assignLongitude(long, lat, vel) {
  longitude = long;
  latitude = lat;
  velocity = Math.round(vel * 100) / 100;
}

// Set colour of background detail depending on data and assign text to landOrSeaBol

function changeColourAndLocation(value) {
  if (value) {
    landOrSeaBol = 'SEA';
    body[0].style.backgroundColor = 'var(--sea)';
  } else {
    landOrSeaBol = 'LAND';
    body[0].style.backgroundColor = 'var(--land)';
  }
}

// Set colour of text detail depending on data

function setTextColour(val) {
  detailColour.forEach((c) => {
    if (val === 'SEA') {
      c.style.color = 'var(--sea)';
    } else {
      c.style.color = 'var(--land)';
    }
  });
}

// Build template literal string to replace LOADING text

function buildMarquee() {
  return `THE ISS IS ORBITING OVER <span class='detail'>${landOrSeaBol}</span> TRAVELLING AT <span class='detail'>${velocity} km/h</span> → `;
}

/* 
  📌 ATTEMPT 1 - BEFORE LEARNING ABOUT ASYNC / AWAIT
  API Fetch from 'Where the ISS' and 'OnWater.io'
  First fetches details from ISS (Longitude, latitude, and velocity)
  That data is then used to create a request to OnWater.io
  OnWater returns true if the coordinates are over sea, and false if over the sea
  That data is used to update elements on the page, background colour, and text in the marquee


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

  */

/* 
  📌 ATTEMPT 2 - USING ASYNC AWAIT
  Much easier for me to understand!
  */

const apiISS = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getApi() {
  const responseISS = await fetch(apiISS);

  const dataISS = await responseISS.json();

  assignLongitude(dataISS.longitude, dataISS.latitude, dataISS.velocity);

  const reponseOnwater = await fetch(`https://api.onwater.io/api/v1/results/${latitude},${longitude}?access_token=-yxsyX6EsS4ysebkXji6`);

  const dataLandOrSea = reponseOnwater.json();

  changeColourAndLocation(dataLandOrSea.water);

  setTimeout(() => {
    marqueeText.forEach((text) => (text.innerHTML = buildMarquee(velocity, landOrSeaBol).repeat(45)));
    detailColour = Array.from(document.getElementsByClassName('detail'));
    setTextColour(landOrSeaBol);
  }, 0);
}

getApi();

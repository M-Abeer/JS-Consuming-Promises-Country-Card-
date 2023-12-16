'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Consuming Promises

// const request = fetch('https://restcountries.com/v3.1/name/pakistan');
// console.log(request);
//Here Promise is returned to request and it is Pending
// bkz asynchronous task is running in Background

/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      return response.json();
    })
    //Now this is a new Promise, so we call then on it
    .then(function (data) {
      console.log(data);
    });
};
//then function is calling on Promise, bkz fetch return
// promise and then contain callback function
// Here response is fulfilled Promise
getCountryData('pakistan');
*/
function renderError(error) {
  countriesContainer.insertAdjacentHTML('beforeend', error);
  // countriesContainer.style.opacity = 1;
}

function renderCountry(data, className = '') {
  const html = `
<article class="country ${className}">
          
<img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
             
          </div>
        </article>
`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
}

// Efficient Code
/*
const getCountryData = function (country) {
  //Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`Country not found! ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders[1];
      const neighbour = 'abcde';
      if (!neighbour) return;
      //Second AJAX Call
      //Country 1
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found! ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.log(`${err} 👀👀`);
      renderError(`${err.message} Something went wrong!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('pakistan');
});
*/

// Write Some efficient code, Write function for fetch andd error
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  //Country 1
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not Found!'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[1];
      // const neighbour = 'abcde';
      if (!neighbour) return;
      //Second AJAX Call
      //Country
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found! ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.log(`${err} 👀👀`);
      renderError(`${err.message} Something went wrong!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('pakistan');
});

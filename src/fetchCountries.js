import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        clearHtml(countryList);
        clearHtml(countryInfo);
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length === 1) {
        clearHtml(countryList);
        createCountryCard(data[0]);
      } else {
        clearHtml(countryInfo);
        insertContent(data);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      clearHtml(countryList);
      clearHtml(countryInfo);
    });
}

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function clearHtml(element) {
  return (element.innerHTML = '');
}

function createLi(item) {
  return `<li class = 'item'>
    <img class='item-img' src='${item.flags.svg}' alt = "flag of ${item.flags.alt}">
    <p class = 'item-descr'>${item.name.official}</p>
  </li>`;
}

function generateCountries(array) {
  return array.reduce((acc, item) => acc + createLi(item), '');
}

function insertContent(array) {
  const result = generateCountries(array);
  return (countryList.innerHTML = result);
}

function createCountryCard(item) {
  const languagesList = Object.values(item.languages);
  return (countryInfo.innerHTML = `
    <img class='card-img' src='${item.flags.svg}' alt = "flag of ${item.flags.alt}">
    <h2 class = 'card-name'>${item.name.official}</h2>
    <p class = 'card-descr'><span class = 'card-subtitle'>Capital:</span>${item.capital}</p>
    <p class = 'card-descr'><span class = 'card-subtitle'>Population:</span>${item.population}</p>
    <p class = 'card-descr'><span class = 'card-subtitle'>Languages:</span>${languagesList}
    </p>`);
}

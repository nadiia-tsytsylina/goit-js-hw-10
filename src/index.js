import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');

searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  console.log(fetchCountries(searchBox.value));
}

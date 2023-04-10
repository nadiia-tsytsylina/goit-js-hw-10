export function fetchCountries(name) {
  //   const params = new URLSearchParams({
  //     name.official,
  //     capital,
  // population,
  // flags.svg,
  // languages,
  //   });
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}

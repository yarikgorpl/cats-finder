const KEY = 'x-api-key=live_GlLLrkhfyAXMpVN9gz3L1JHuflduC33qUZbHMRGSkqLieZ5opc93sMLBSsfeX4vR';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const ENDPOINT = 'breeds';

const selectBreed = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const option = {
  method: 'GET',
  headers: {
    'x-api-key': 'live_GlLLrkhfyAXMpVN9gz3L1JHuflduC33qUZbHMRGSkqLieZ5opc93sMLBSsfeX4vR',
  },
};
getBreeds()
  .then(data => {
    loader.hidden = true;
    selectBreed.hidden = false;
    data.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      selectBreed.appendChild(option);
    });
  })
  .catch(error => {
    loader.hidden = true;
    errorMessage.hidden = false;
    console.log(error);
  });

function getBreeds() {
  loader.hidden = false;
  selectBreed.hidden = true;
  return fetch(`${BASE_URL}${ENDPOINT}`, option).then(response => {
    if (!response.ok) {
      errorMessage.hidden = false;
      throw new Error(response.message);
    }
    return response.json();
  });
}

function createMarkupByBreed(data) {
  if (!data.length) return (errorMessage.hidden = false);

  return data
    .map(({ url, breeds: [breed] = [] }) => {
      if (!breed) return (errorMessage.hidden = false);

      const { name, description, temperament } = breed;

      return `
        <img class="cat-image" src="${url}" alt="${name}" width="400" />
        <h2>${name}</h2>
        <p>${description}</p>
        <p><b>Temperament:</b> ${temperament}</p>
      `;
    })
    .join('');
}

selectBreed.addEventListener('change', onChange);

function onChange(event) {
  errorMessage.hidden = true;
  catInfo.innerHTML = '';
  const selectedBreed = event.target.value;
  console.log(`Selected breed ID: ${selectedBreed}`);
  loader.hidden = false;
  fetch(`${BASE_URL}images/search?breed_ids=${selectedBreed}`, option)
    .then(response => {
      if (!response.ok) {
        errorMessage.hidden = false;
        throw new Error(response.message);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      loader.hidden = true;
      catInfo.innerHTML = createMarkupByBreed(data) || 'No information available for this breed.';
    })
    .catch(error => {
      console.error('Помилка:', error);
      loader.hidden = true;
      errorMessage.hidden = false;
    });
}

const BASE_URL = 'https://api.thecatapi.com/v1/';
const ENDPOINT = 'breeds';

export const selectBreed = document.querySelector('.breed-select');
export const loader = document.querySelector('.loader');
export const errorMessage = document.querySelector('.error');
export const catInfo = document.querySelector('.cat-info');

const option = {
  method: 'GET',
  headers: {
    'x-api-key': 'live_GlLLrkhfyAXMpVN9gz3L1JHuflduC33qUZbHMRGSkqLieZ5opc93sMLBSsfeX4vR',
  },
};

export function getBreeds() {
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
export function fetchCatByBreed(breedId) {
  fetch(`${BASE_URL}images/search?breed_ids=${breedId}`, option)
    .then(response => {
      if (!response.ok) {
        errorMessage.hidden = false;
        throw new Error(response.message);
      }
      return response.json();
    })
    .then(data => {
      loader.hidden = true;
      catInfo.innerHTML = createMarkupByBreed(data) || '';
    })
    .catch(error => {
      console.error('Помилка:', error);
      loader.hidden = true;
      errorMessage.hidden = false;
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

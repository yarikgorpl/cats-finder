import {
  getBreeds,
  fetchCatByBreed,
  selectBreed,
  loader,
  errorMessage,
  catInfo,
} from './cat-api.js';

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

selectBreed.addEventListener('change', onChange);

function onChange(event) {
  errorMessage.hidden = true;
  catInfo.innerHTML = '';
  const selectedBreed = event.target.value;
  loader.hidden = false;
  fetchCatByBreed(selectedBreed);
}

const searchInput = document.querySelector('#q');
const searchResults = document.querySelector('#search-results');

searchInput?.addEventListener('input', (e) => {
  console.log(e.target.value);
});

const getSearchResults = (query) => {
  return fetch('/api/images').then(r => r.json());
}

const searchResultsJson = getSearchResults();
searchResultsJson.then(results => {
  results.map(result => {
    const elem = document.createElement('div');
    elem.classList.add('col-3', 'margin-2', 'align-items-center', 'd-flex');

    elem.innerHTML = `<a href="${result.file}" download="${result.filename}"><img src="${result.file}" class="img-fluid" />`;
    searchResults?.appendChild(elem);
  });
});
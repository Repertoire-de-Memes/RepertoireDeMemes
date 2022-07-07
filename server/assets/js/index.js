const searchInput = document.querySelector('#q');
const searchResults = document.querySelector('#search-results');

searchInput?.addEventListener('input', (e) => {
  setSearchResults(e.target.value);
});

const getSearchResults = (query) => {
  return fetch(`/api/images${query && `?q=${encodeURIComponent(query)}` || ''}`).then(r => r.json());
}

const setSearchResults = (query) => {
  getSearchResults(query).then(results => {
    searchResults.innerHTML = '';

    results.map(result => {
      const elem = document.createElement('div');
      elem.classList.add('col-3', 'my-1', 'align-items-center', 'd-flex');

      elem.innerHTML = `
      <a href="${result.file}" download="${result.filename}">
        <img src="${result.file}" class="img-fluid" />
      </a>`;
      searchResults?.appendChild(elem);
    });
  });
}

setSearchResults();
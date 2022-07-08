import '/js/bootstrap.min.js';

const searchInput = document.querySelector('#q');
const searchResultsImages = document.querySelector('#search-results--images > div');
const searchResultsVideos = document.querySelector('#search-results--videos > div');

searchInput?.addEventListener('input', (e) => {
  setSearchResults(
    e.target.value,
    document.querySelector('button[aria-selected=true]')?.getAttribute('aria-controls')
  );
});

const getSearchResults = (query, type = 'images') => {
  return fetch(`/api/${type}${query && `?q=${encodeURIComponent(query)}` || ''}`).then(r => r.json());
}

const setSearchResults = (query, type) => {
  getSearchResults(query, type).then(results => {
    (type === 'images' && searchResultsImages || searchResultsVideos).innerHTML = '';

    results.map(result => {
      const elem = document.createElement('div');
      elem.classList.add('col-3', 'my-1', 'align-items-center', 'd-flex');

      elem.innerHTML = `
      <a href="${result.file}" download="${result.filename}">
        <${type === 'images' && 'img' || 'video'} src="${result.file}" class="img-fluid"${type === 'images' && ' />' || '></video>'}
      </a>`;
      (type === 'images' && searchResultsImages || searchResultsVideos)?.appendChild(elem);
    });
  });
}

document.querySelector('#images-tab')?.addEventListener('click', e => {
  setSearchResults(
    searchInput.value || '',
    document.querySelector('button[aria-controls=images]')?.getAttribute('aria-controls')
  );
});
document.querySelector('#videos-tab')?.addEventListener('click', e => {
  setSearchResults(
    searchInput.value || '',
    document.querySelector('button[aria-controls=videos]')?.getAttribute('aria-controls')
  );
});

setSearchResults(
  searchInput.value || '',
  document.querySelector('button[aria-controls=images]')?.getAttribute('aria-controls')
);
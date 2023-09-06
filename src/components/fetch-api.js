const KEY = '38364804-bc717e421fc678381fef6bf71';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query, page = 1) {
    const url = `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    return fetch(url).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(new Error(`Error with your query by: ${query}`))
        }
    });
}
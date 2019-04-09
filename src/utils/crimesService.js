const BASE_URL = '/api/crimes/';

export default {
    index,
}

function index() {
    const options = {
        method: 'GET',
    };
    return fetch(BASE_URL, options).then(res => res.json());
}
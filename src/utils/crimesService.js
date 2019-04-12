const BASE_URL = '/api/crimes/';

export default {
    index,
    show
}

function index() {
    const options = {
        method: 'GET'
    };
    return fetch(BASE_URL, options).then(res => res.json());
}

function show(_id) {
    const options = {
      method: 'GET'
    };
    return fetch(BASE_URL + _id, options).then(res => res.json());
  }
  
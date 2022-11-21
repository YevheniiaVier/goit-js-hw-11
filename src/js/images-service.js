import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '31477938-fd248c01ea14c0dbe5bfc1d84';
const BASE_URL = 'https://pixabay.com/api';

// axios.get('/users').then(res => {
//   console.log(res.data);
// });

// async function getImage() {
//   try {
//     const response = await axios.get(`${BASE_URL}`, options);
//     console.log(response);
//   } catch (error) {
//     Notify.failure('Oops, there is no country with that name');
//   }
// }

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchImages() {
    try {
      const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
      const response = await axios.get(url);
      this.incrementPage();
      return response.data;
    } catch (error) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }

  // {
  //   const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

  //     return fetch(url)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then(({ hits }) => {
  //       this.incrementPage();
  //       return hits;
  //     });
  // }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// function onFetchError(error) {
//   Notify.failure('Oops, there is no country with that name');
// }

// fetch(url, options)
//   .then(r => r.json())
//   .then(console.log);

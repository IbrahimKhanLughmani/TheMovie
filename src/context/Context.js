import CreateDataContext from './CreateDataContext';
import Apis from '../utils/apiConfig';
import Axios from 'axios';
import Toast from 'react-native-simple-toast';
import initialValues from '../utils/initialValues';

const reducer = (state, action) => {
  switch (action.type) {
    case 'Movies':
      return {...state, movies: action.payload};
    case 'SearchedMovies':
      return {...state, searchedMovies: action.payload};
    case 'Genre':
      return {...state, genre: action.payload};
    case 'Video':
      return {...state, video: action.payload};
    case 'Halls':
      return {...state, halls: action.payload};
    case 'Seating':
      return {...state, seating: action.payload};
    default:
      return state;
  };
};

const getMovies = (dispatch) => {
  return async () => {
    Axios.get(`${Apis.host}${Apis.endpoints.movies}`, {
      headers: {
        Authorization: Apis.apiToken,
      }
    })
    .then((response) => { 
      dispatch({
        type: 'Movies',
        payload: response.data.results,
      })
    })
    .catch(async(error) => {
      Toast.show(error.message, Toast.LONG)
    })
  }
};

const searchedMovies = (dispatch) => {
  return async (search) => {
    Axios.get(`${Apis.host}${Apis.endpoints.search}?query=${search}`, {
      headers: {
        Authorization: Apis.apiToken,
      }
    })
    .then((response) => { 
      dispatch({
        type: 'SearchedMovies',
        payload: response.data,
      })
    })
    .catch((error) => {
      Toast.show(error.message, Toast.LONG)
    })
  }
};

const resetSearchedMovies = (dispatch) => {
  return async () => {
    try {
      dispatch({
        type: 'SearchedMovies',
        payload: initialValues.searchedMovies,
      })
    } catch (error) {
      console.log(error)
    }
  }
};

const getGenre = (dispatch) => {
  return async () => {
    Axios.get(`${Apis.host}${Apis.endpoints.genre}`, {
      headers: {
        Authorization: Apis.apiToken,
      }
    })
    .then((response) => { 
      dispatch({
        type: 'Genre',
        payload: response.data.genres,
      })
    })
    .catch((error) => {
      Toast.show(error.message, Toast.LONG)
    })
  }
};

const getVideo = (dispatch) => {
  return async (id) => {
    Axios.get(`${Apis.host}${Apis.endpoints.video}${id}/videos`, {
      headers: {
        Authorization: Apis.apiToken,
      }
    })
    .then((response) => { 
      dispatch({
        type: 'Video',
        payload: response.data.results.find((item) => item.type === "Trailer" && item.official),
      })
    })
    .catch((error) => {
      Toast.show(error.message, Toast.LONG)
    })
  }
};

const getHalls = (dispatch) => {
  return async (date) => {
    dispatch({
      type: 'Halls',
      payload: initialValues.halls,
    })
  }
};

export const { Context, Provider } = CreateDataContext(
  reducer,
  { 
    getMovies,
    searchedMovies,
    resetSearchedMovies,
    getGenre,
    getVideo,
    getHalls,
  },
  {
    movies: initialValues.movies,
    searchedMovies: initialValues.searchedMovies,
    genre: initialValues.genre,
    video: initialValues.video,
    halls: initialValues.halls,
  }
)
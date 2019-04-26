import axios from 'axios';
import MOVIE_API_KEY from '../secrets'

const initialState = {
    creditsToSelectFrom: []
};

//Action Types
const GET_ACTOR_CREDITS = 'GET_ACTOR_CREDITS'

//Action Creators
const getActorCredits = (actorFilmCredits) => (
    {
        type: GET_ACTOR_CREDITS,
        actorFilmCredits
    }
)

//Thunks
export const fetchActorCredits = (actorFirstName, actorLastName) => async (dispatch) => {

  try {
    console.log('We are in the fetchActorCredits thunk')
    console.log(MOVIE_API_KEY)

fetch('https://api.themoviedb.org/3/search/person?api_key=' + MOVIE_API_KEY + '&query=' + actorFirstName + '+' + actorLastName)
 .then(function(response) {
   return response.json();
 })
 .then(function(data) {
   return data.results[0].id;
 })
 .then(function(id) {

    return fetch('https://api.themoviedb.org/3/person/' + id + '/movie_credits?api_key=8f96191e0a061a9dd93b46681d2b0100')
 })
 .then(function(response) {
  return response.json();
})
 .then(function(films) {
   return films.cast
   //.filter(film => film.character.length > 1)
 })
 .then(function(filmsAppearedIn) {
  return filmsAppearedIn.map(film => {
    return {
      title: film.original_title,
      posterURL: film.poster_path,
      id: film.id
    }
  })
})
 .then(function(filmArray){
   console.log('FILM ARRAY', filmArray)
   dispatch(getActorCredits(filmArray))
 })

    // const actorInfo = fetch('https://api.themoviedb.org/3/search/person?api_key=8f96191e0a061a9dd93b46681d2b0100&query=Mel+Gibson')
    // const parsedActorInfo = actorInfo.json()
    // const actorInfo = await axios.get('https://api.themoviedb.org/3/search/person/api_key=' + MOVIE_API_KEY + 'query=' + actorFirstName + '+' + actorLastName)
    // console.log('Info:', actorInfo)
    // const id = actorInfo.results[0].id;
    // const movies = fetch('https://api.themoviedb.org/3/person/2461/movie_credits?api_key=8f96191e0a061a9dd93b46681d2b0100');
    // const movies = fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${MOVIE_API_KEY}`);
    // const actorFilmCredits = movies.cast.filter(film => film.character.length > 1);
    // console.log(actorFilmCredits);
    // return dispatch(getActorCredits(actorFilmCredits))
    
  } catch (error) { console.log('this is an error') }

}

export default function(state = initialState, action) {
    const newState = {...state}
    switch (action.type) {
      case GET_ACTOR_CREDITS:
        newState.creditsToSelectFrom = action.actorFilmCredits;
        return newState;
      default:
        return state
    }
  }

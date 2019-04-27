import MOVIE_API_KEY from '../secrets'

const initialState = {
    currentActor: '',
    currentFilm: [],
    creditsToSelectFrom: [],
    isGuessingActor: false
};

//Action Types
const GENERATE_ACTOR = 'GENERATE_ACTOR'
const GET_ACTOR_CREDITS = 'GET_ACTOR_CREDITS'
const TOGGLE_GAME_STATE = 'TOGGLE_GAME_STATE'

//Action Creators
const generateStartingActor = (actor) => (
  {
    type: GENERATE_ACTOR,
    actor
  }
)

const getActorCredits = (actorFilmCredits) => (
    {
        type: GET_ACTOR_CREDITS,
        actorFilmCredits
    }
)

export const toggleGameState = () => (
  {
    type: TOGGLE_GAME_STATE
  }
)

//Thunks
export const fetchActorCredits = (actorFirstName, actorLastName) => (dispatch) => {
  try {
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
      dispatch(getActorCredits(filmArray))
    })
   } catch (error) { console.log('this is an error') }
}
   

export const getStartingActor = () => (dispatch) => {
  try {
    console.log('We are in the starting actor thunk')
    fetch('https://api.themoviedb.org/3/person/popular?api_key=8f96191e0a061a9dd93b46681d2b0100')
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      return data.results.map(actor => actor.name)
    })
    .then(function(nameArray) {
      const randomizer = (array) => {
        const index = Math.floor(Math.random() * Math.floor(array.length))
        return array[index];
      }
      return randomizer(nameArray)
    })
    .then(function(actor) {
      dispatch(generateStartingActor(actor))
      console.log('ACTOR:', actor)
    })
  } catch (error) { console.log('We had trouble starting the game') }
}

export default function(state = initialState, action) {
  const newState = {...state}
  switch (action.type) {
    case GENERATE_ACTOR:
      newState.currentActor = action.actor
      return newState;
    case TOGGLE_GAME_STATE:
      newState.isGuessingActor = !newState.isGuessingActor
      return newState;
    case GET_ACTOR_CREDITS:
      newState.creditsToSelectFrom = action.actorFilmCredits
      return newState;
    default:
      return state
  }
}

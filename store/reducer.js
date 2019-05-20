import MOVIE_API_KEY from '../secrets'

const initialState = {
    currentActor: '',
    currentFilm: '',
    creditsToSelectFrom: [],
    castToSelectFrom: [],
    isGuessingActor: false,
    isActiveGame: false,
    answerCount: 0,
    isWinner: false,
    isLoser: false
};

//Action Types
const GENERATE_ACTOR = 'GENERATE_ACTOR'
const GET_STARTING_ACTOR_CREDITS = 'GET_STARTING_ACTOR_CREDITS'
const TOGGLE_GAME_STATE = 'TOGGLE_GAME_STATE'
const TOGGLE_IS_ACTIVE_GAME = 'TOGGLE_IS_ACTIVE_GAME'
const GET_FILM_CREDITS = 'GET_FILM_CREDITS'
const GET_ACTOR_CREDITS = 'GET_ACTOR_CREDITS'
const UPDATE_CURRENT_ACTOR = 'UPDATE_CURRENT_ACTOR'
const UPDATE_CURRENT_FILM = 'UPDATE_CURRENT_FILM'
const WON_GAME = 'WON_GAME'
const RESET_GAME = 'RESET_GAME'

//Action Creators
const generateStartingActor = (actor) => (
  {
    type: GENERATE_ACTOR,
    actor
  }
)

const getStartingActorCredits = (actorFilmCredits) => (
    {
        type: GET_STARTING_ACTOR_CREDITS,
        actorFilmCredits
    }
)

export const toggleGameState = () => (
  {
    type: TOGGLE_GAME_STATE
  }
)

export const toggleIsActiveGame = () => (
  {
    type: TOGGLE_IS_ACTIVE_GAME
  }
)

const getFilmCredits = (castArray) => (
  {
    type: GET_FILM_CREDITS,
    castArray
  }
)

const getActorCredits = (creditsArray) => (
  {
    type: GET_ACTOR_CREDITS,
    creditsArray
  }
)

export const updateCurrentActor = (actorName) => (
  {
    type: UPDATE_CURRENT_ACTOR,
    actorName
  }
)

export const updateCurrentFilm = (filmName) => (
  {
    type: UPDATE_CURRENT_FILM,
    filmName
  }
)

const wonGame = () => (
  {
    type: WON_GAME
  }
)

export const resetGame = () => (
  {
    type: RESET_GAME
  }
)

//Thunks
export const fetchStartingActorCredits = (actor) => (dispatch) => {
  try {
    const actorArray = actor.split(' ');
    let searchString = '';
    actorArray.forEach(word => {
      searchString += (word + '+')
    }) 

    fetch('https://api.themoviedb.org/3/search/person?api_key=' + MOVIE_API_KEY + '&query=' + searchString.slice(0, searchString.length))
     .then(function(response) {
       return response.json();
     })
     .then(function(data) {
       return data.results[0].id;
     })
     .then(function(id) {
       return fetch('https://api.themoviedb.org/3/person/' + id + '/movie_credits?api_key=' + MOVIE_API_KEY)
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
      dispatch(getStartingActorCredits(filmArray))
    })
   } catch (error) { console.log('this is an error') }
}

export const fetchFilmCast = (id) => (dispatch) => {
  try {

    fetch('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + MOVIE_API_KEY)
     .then(function(response) {
       return response.json();
     })
     .then(function(data) {
       return data.cast;
     })
     .then(function(castArray) {
       return castArray.map(actor => {
         if (actor.name.trim() === 'Kevin Bacon'){
          dispatch(wonGame())
         }
         return {
           name: actor.name,
           id: actor.id,
           profilePath: actor.profile_path
         }
       })
    })
    .then(function(filteredCastArray){
      return filteredCastArray.slice(0, 20)
    })
    .then(function(slicedCastArray){
      dispatch(getFilmCredits(slicedCastArray))
    })
   } catch (error) { console.log('this is an error') }
}

export const fetchStartingActor = () => (dispatch) => {
  try {
    fetch('https://api.themoviedb.org/3/person/popular?api_key=' + MOVIE_API_KEY)
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
    })
  } catch (error) { console.log('We had trouble starting the game') }
}

export const fetchActorFilmCredits = (id) => (dispatch) => {
  try {
    fetch('https://api.themoviedb.org/3/person/' + id + '/movie_credits?api_key=' + MOVIE_API_KEY)
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

//Reducer
// eslint-disable-next-line complexity
export default function(state = initialState, action) {
  const newState = {...state}
  switch (action.type) {
    case GET_ACTOR_CREDITS:
    newState.creditsToSelectFrom = action.creditsArray
    newState.isGuessingActor = !newState.isGuessingActor
    newState.answerCount += 1
    return newState;
    case GENERATE_ACTOR:
      newState.currentActor = action.actor
      return newState;
    case TOGGLE_GAME_STATE:
      newState.isGuessingActor = !newState.isGuessingActor
      return newState;
    case GET_STARTING_ACTOR_CREDITS:
      newState.creditsToSelectFrom = action.actorFilmCredits
      return newState;
    case GET_FILM_CREDITS:
      if (newState.answerCount === 5){
        newState.isLoser = true
        newState.isActiveGame = false
      }
      newState.castToSelectFrom = action.castArray
      newState.isGuessingActor = !newState.isGuessingActor;
      return newState;
    case TOGGLE_IS_ACTIVE_GAME:
      newState.isActiveGame = !newState.isActiveGame
      return newState;
    case UPDATE_CURRENT_ACTOR:
      newState.currentActor = action.actorName
      return newState;
    case UPDATE_CURRENT_FILM:
      newState.currentFilm = action.filmName
      return newState;
    case WON_GAME:
      newState.isWinner = true
      newState.isActiveGame = false
      return newState;
    case RESET_GAME:
      newState.answerCount = 0
      newState.isLoser = false
      newState.isGuessingActor = false
      newState.isWinner = false
      return newState;
    default:
      return state
  }
}


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
    const actorInfo = await axios.get(`https://api.themoviedb.org/3/search/person/api_key=${MOVIE_API_KEY}&query=${actorFirstName}+${actorLastName}`)
    console.log(actorInfo)
    const id = actorInfo.results[0].id;
    const movies = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${MOVIE_API_KEY}`);
    const actorFilmCredits = movies.cast.filter(film => film.character.length > 1);
    dispatch(getActorCredits(actorFilmCredits))

}

export default function(state = initialState, action) {
    const newState = {...state}
    switch (action.type) {
      case GET_ACTOR_CREDITS:
        newState.creditsToSelectFrom = action.actorFilmCredits;
      default:
        return state
    }
  }

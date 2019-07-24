# SixDegrees

Six Degrees is a mobile movie trivia game where the user is supplied a starting actor and must connect that actor to 
Kevin Bacon through other actors and their film credits in six degrees or under. (For example: Danny Glover was in Lethal 
Weapon with Mel Gibson. That is one 'degree'). Upon the start of the game, a random actor is generated from a "trending in media"
list. The app then renders a list of all movie titles, with their poster, that actor has appeared in. Upon selection of a film,
the app then renders display of all actors in that film with their picture. A counter in the upper right hand corner of the
screen keeps track of how many degrees the user has gone. If the user selects a film Kevin Bacon appeared in before the count
gets to six the user wins.

FEATURES TO FIX
* Scrolling is not fully functional, currently limiting the amount of film/actor choices a user has.
* Making a selection is not very easy currently. The onPress method that moves to game to the next step is tied to the text
  tags of the film/actor, and sometimes their is omre than one tag ina title to handle centering, which makers the target for
  a user's thumb even smaller. I think they should be buttons, or the Image tag should be ties to the onPress event.
* After a win, the "You won .." messsage remains at the top of the screen through the nnext game.
* The TMDB database has different tables for movies and actors, therefore it is possible for a movie and actor to have identical
  ids, which are currently being used on their corresponding React components as keys. If an id from both tables are a match,
  the movie poster will become stuck in the PotentialActors view on every render.

FEATURES TO ADD
* Cleaner, more fun, and more user-friendly UI.
* Move the game beyond just leading to Kevin Bacon, so the users starts with a different starting actor AND ending actor with each
  iteration.
* Make the starting actor pool deeper by using a resource beyond TMDB's "popular" list.
* Animation. Good places would be when moving between PotentialActors and PotentialFilms. Also, an animation that recaps how the 
  user successfully got to Kevin Bacon or how the user COULD have gotten to Kevin Bacon.
  
  ---This application was made using React, React Native, and Redux, and using queries from The Movie Database API.---
  
  ---To start connecting actors and their iconic films, simply clone to your local machine and npm install.---

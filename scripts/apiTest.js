fetch('https://api.themoviedb.org/3/person/popular?api_key=8f96191e0a061a9dd93b46681d2b0100')
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      console.log(data)
    })

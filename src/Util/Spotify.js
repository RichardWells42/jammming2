let accessToken = "";
const clientID = "09bf45de865d4de1a2b798757ff98d5e";

//const redirectURI = "http://localhost:3000/";
//const redirectURI = "https://www.jammming2.surge.sh";

const redirectURI = "https://merry-cajeta-b1918a.netlify.app";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
      if (urlAccessToken && urlExpiresIn) {
        accessToken = urlAccessToken[1];
        const expiresIn = Number(urlExpiresIn[1]);
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
      } else {
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = redirect;
      }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      return response.json();  
    })
    .then((jsonResponse) => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map((tracks) => ({
        id: tracks.id,
        name: tracks.name,
        artist: tracks.artists[0].name,
        album: tracks.album.name,
        uri: tracks.uri, 

        preview: tracks.preview_url           //trying to add an audio sample 2 !!!!!!!! 

        // cover: tracks.album.images[2].url,
        // audio: tracks.preview_url,    //trying to add an audio sample
      }));
    });
  },

  savePlaylistName(name, trackURIs) {
    if (!name || !trackURIs) {
      return;
    }
    let accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userID = "";
    return fetch("https://api.spotify.com/v1/me", { headers: headers }).then(
      (response) => response.json()
    )
      .then(jsonResponse => {
        userID = jsonResponse.id;  
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
        .then((response) => response.json())
        .then(jsonResponse => {
          const playlistID = jsonResponse.id;
          return fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`, 
            {
              headers: headers,
              method: "POST",
              body: JSON.stringify({ uris: trackURIs }),
            }
          );
        });
      });
  },
                                  //trying to add an audio sample 2 !!!!!!!!  
  playTrack(name, trackURIs) {
    if (!name || !trackURIs.length) {
        return;
    }

    const accessToken = Spotify.getAccessToken();
    const bearer = {Authorization: `Bearer ${accessToken}`}

    return fetch(`https://api.spotify.com/v1/me`, {headers: bearer}
    ).then(response => response.json()
    ).then(jsonResponse => {
        return fetch(`https://api.spotify.com/v1/me/player/play`,
            {
            headers: bearer,
            method: 'POST',
            body: JSON.stringify(
                {
                    name: name,
                    "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
                    "offset": {"position": 5},
                    "position_ms": 0
                }
            )
        })
    })
  }



};

//export default Spotify;
export { Spotify };
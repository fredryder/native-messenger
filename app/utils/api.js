var api = {
  getMessages(username) {
    username = username.toLowerCase().trim();
    var url = `https://native-messenger.firebaseio.com/${username}.json`;
    console.log(url);
    return fetch(url)
      .then((response) => {
        return response.text()
      })
      .then((responseText) => {
        console.log(JSON.parse(responseText));
        return responseText;
      });
  },
  addMessage(username, message){
    console.log('in addMessage / message: ', message);
    username = username.toLowerCase().trim();
    var url = `https://native-messenger.firebaseio.com/${username}.json`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        message: message
      }),
    }).then((res) => res.json()); 
  },
  // Not working...
  addMessageFB(username, message) {
    console.log('in addMessageFB / message: ', message);
    username = username.toLowerCase().trim();
    //var db = new Firebase(`https://native-messenger.firebaseio.com/${username}.json`); 
    db.set({
      username: username,
      message: message
    });
  }

};

module.exports = api;
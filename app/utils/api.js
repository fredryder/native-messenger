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
  addMessageFB(username, message, db) {
    username = username.toLowerCase().trim();
    return db.push({
      username: username,
      message: message
    });
    console.log('addMessageFB / db: ', db);
  }
  // getMessagesFB(username, message) {
  //   username = username.toLowerCase().trim();
  //   var db = new Firebase('https://native-messenger.firebaseio.com/items'); 
  //   return db.push({
  //     username: username,
  //     message: message
  //   });
  //   console.log('addMessageFB / db: ', db);
  // }

};

module.exports = api;
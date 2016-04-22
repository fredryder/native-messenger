var api = {
  getMessages(username) {
    username = username.toLowerCase().trim();
    var url = `https://native-messenger.firebaseio.com/${username}.json`;
    console.log(url);
    return fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((actualResponse) => {
        return actualResponse;
      });
  },
  addMessage(username, message){
    console.log('in addMessage / message: ', message);
    username = username.toLowerCase().trim();
    var url = `https://native-messenger.firebaseio.com/${username}.json`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(message)
    }).then((res) => res.json()); 
  }
};

module.exports = api;
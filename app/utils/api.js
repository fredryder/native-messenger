var api = {
  getMessages(username) {
    username = username.toLowerCase().trim();
    console.log('username: ', username);
    var url = `https://native-messenger.firebaseio.com/${username}.json`;
    console.log(url);
    return fetch(url)
      .then((res) => {
        //res.json()
        console.log(res);
        debugger;
      });
      // .then((actualResponse) => {
      //   console.log('ActualResponse: ', actualResponse);
      //   res.json();
      // });
  },
  addMessage(username, message){
    username = username.toLowerCase().trim();
    var url = `https://native-messenger.firebaseio.com/${username}.json`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(message)
    }).then((res) => res.json()); 
  }
};

module.exports = api;
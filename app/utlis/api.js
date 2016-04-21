var api = {
  getMessages() {
    username = username.toLowerCase().trim();
    var url = 'https://shsm77fe1pu.firebaseio-demo.com/';
    return fetch(url).then((res) => res.json());
  }
};

module.exports = api;
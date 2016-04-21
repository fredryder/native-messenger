var React = require('react-native');
var styles = require('./styles');
var api = require('../utils/api');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }
  handleChange(event){
    this.setState({
      username: event.nativeEvent.text
    });
  }
  handleSubmit(){
    this.setState({
      isLoading: true // spinner
    });
    //console.log('Chat button / username:', this.state.username);
    // fetch data from Firebase
    // reroute us, passing in Firebase message data

    api.getMessages(this.state.username)
    .then((res) => {
      //if user not found...
      //for now: if no data returned
      if (!!res) {
        this.setState({
          error: 'No data returned from Firebase',
          isLoading: false

        })
      } else {
        console.log('Firebase response:', res);
        this.props.navigator.push({
          title: 'Messages',
          component: Messenger,
          passProps: { messages: res }
        })
        this.setState({
          isLoading: false,
          error: false,
          username: ''
        })
      }
    });
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Please enter your name </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
            <Text style={styles.buttonText}>Chat</Text>
        </TouchableHighlight>
      </View>
    )
  }
};

module.exports = Main;
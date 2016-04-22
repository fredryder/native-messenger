var React = require('react-native');
var styles = require('./styles');
var api = require('../utils/api');
var Messenger = require('./messenger');

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
    api.getMessages(this.state.username)
    .then((jsonRes) => {
      jsonRes = jsonRes || {};
      console.log('jsonRes: ', jsonRes);
      console.log('this.state.username: ', this.state.username);
      this.props.navigator.push({
        title: 'Chat',
        component: Messenger,
        passProps: {
          messages: jsonRes,
          userInfo: this.state.username
        }
      });
      // this.setState({
      //   isLoading: false,
      //   error: false,
      //   username: ''
      // })
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
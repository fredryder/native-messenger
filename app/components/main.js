var React = require('react-native');
var styles = require('./styles');

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
    // update our indicatorIOS spinner
    this.setState({
      isLoading: true
    });
    console.log('Chat', this.state.username);
    // fetch data from Firebase
    // reroute us, passing in Firebase message data
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
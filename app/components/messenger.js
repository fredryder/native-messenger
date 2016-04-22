var React = require('react-native');
var styles = require('./styles');
var api = require('../utils/api');
var Firebase = require("firebase");

var {
  View,
  Text,
  ListView,
  TextInput,
  StyleSheet,
  TouchableHighlight
} = React;


class Messenger extends React.Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}); // true/false
    console.log('props.messages: ', this.props.messages);
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.messages),
      message: '',
      error: ''
    }
  }
  handleChange(e){
    this.setState({
      message: e.nativeEvent.text
    });
  }
  handleSubmit(){
    //var db = Firebase... not working.
    //var db = new Firebase(`https://native-messenger.firebaseio.com/${username}.json`); 

    var message = this.state.message;
    //console.log('state.message: ', this.state.message);
    this.setState({
      message: ''
    });
    api.addMessage(this.props.userInfo, message)
      .then((data) => {
        api.getMessages(this.props.userInfo)
          .then((data) => {
            //console.log('in handle submit / data: ', data);
            this.setState({
              dataSource: this.ds.cloneWithRows(data)
            })
          });
      })
      .catch((err) => {
        console.log('Request failed', err);
        this.setState({error}) //same as {error: error} - ES6 thing
      });
  }
  footer(){
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.message}
          onChange={this.handleChange.bind(this)}
          placeholder="New message"
          placeholderTextColor="#b6b6b6" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
            <Text style={styles.buttonText}> Submit </Text>
        </TouchableHighlight>
      </View>
    )
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text style={styles.messageText}>{rowData}</Text>}
            enableEmptySections={true} />
          {this.footer()}
        </View>
      </View>
    )
  }
};

Messenger.propTypes = {
  userInfo: React.PropTypes.string.isRequired,
  messages: React.PropTypes.string.isRequired
};

module.exports = Messenger;
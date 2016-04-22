var React = require('react-native');
var styles = require('./styles');
var api = require('../utils/api');
var Firebase = require('firebase');

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
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}); // true/false
    console.log('props.messages: ', this.props.messages);
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.messages),
      message: '',
      error: ''
    };
    this.db = new Firebase('https://native-messenger.firebaseio.com/messages');
  }
  handleChange(e){
    this.setState({
      message: e.nativeEvent.text
    });
  }
  handleSubmit(){
    var message = this.state.message;
    this.setState({
      message: ''
    });
    api.addMessageFB(this.props.userInfo, message, this.db)
      .then((data) => {
        api.getMessages(this.props.userInfo)
          .then((data) => {
            // console.log('in handle submit / data: ', data);
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
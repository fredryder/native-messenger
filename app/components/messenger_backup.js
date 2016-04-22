var React = require('react-native');
var styles = require('./styles');
var api = require('../utils/api');

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
    console.log('in Messenger');
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    
    // TODO: figure out multiple messages -> insert into db

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.messages),
      note: '',
      error: ''
    }
  }
  handleChange(event){
    this.setState({
      message: e.nativeEvent.text
    });
  }
  handleSubmit(){
    var message = this.state.message;
    this.setState({
      note: ''
    });
    api.addMessage(this.props.userInfo.login, message)
      .then((data) => {
        api.getMessages(this.props.userInfo.login)
          .then((data) => {
            this.setState({
              dataSource: this.ds.cloneWithRows(data)
            })
          })
      }).catch((err) => {
        console.log('Request failed', err);
        this.setState({error}) //same as {error: error} - ES6 thing
      });
  }
  renderRow(rowdata){
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text> {rowData} </Text>
        </View>
      </View>
    )
  }
  footer(){
    return (
      <View style={styles.footContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.message}
          onChange={this.handleChange.bind(this)}
          placeholder="New message" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}> Submit </Text>
        </TouchableHighlight>
      </View>
    )
  }
  render(){
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />
        {this.footer()}
      </View>
    )
  }
};

Messenger.propTypes = {
  userInfo: React.PropTypes.string.isRequired,
  messages: React.PropTypes.string.isRequired
};

module.exports = Messenger;
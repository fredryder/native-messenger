var React = require('react-native');
var styles = require('./styles');

var {
  Text,
  View,
  StyleSheet
} = React;

class Messenger extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text> Messenger </Text>
      </View>
    )
  }

};

module.exports = Messenger;
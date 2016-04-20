var React = require('react-native');
var styles = require('./styles');

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

class Main extends React.Component{
  render(){
    return (
      <View style={styles.mainContainer}>
        <Text> Testing the Router </Text>
      </View>
    )
  }
};

module.exports = Main;
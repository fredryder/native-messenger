/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
var React = require('react-native');
var Main = require('./app/components/main');
var styles = require('./app/components/styles');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;

class NativeMessenger extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Waddle Messenger',
          component: Main
        }} />
    );
  }
};

AppRegistry.registerComponent('NativeMessenger', () => NativeMessenger);

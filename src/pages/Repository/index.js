import 'react-native-get-random-values';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

export default class Repository extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    loading: false,
  };

  render() {
    console.tron.log(this.state);

    const { navigation } = this.props;
    const repository = navigation.getParam('repository');
    // console.tron.log(repository);

    return <WebView source={{ uri: repository.html_url }} />;
  }
}

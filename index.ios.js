'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var API_KEY = 'h9oq2yf3twf4ziejn10b717i';
var API_URL = 'https://openapi.etsy.com/v2/listings/active';
 var PARAMS = '?api_key=' + API_KEY + '&keywords=bill_murray&includes=Images,Shop';
 var REQUEST_URL = API_URL + PARAMS;

var GitApp = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Bill Murray...
        </Text>
      </View>
    );
  },

  renderItem: function(data) {
    return (
      <View style={styles.container}>
       <Image
         source={{uri: data.url_fullxfull}}
         style={styles.thumbnail}
       />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{data.subTitle}</Text>
            <Text style={styles.title}>{data.price}</Text>
        </View>
        </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderBottomColor: '#eee',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 100,
    height: 125,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('GitRepoNative', () => GitApp);

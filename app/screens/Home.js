import React from "react";
import { View, FlatList, ActivityIndicator, TextInput, Image } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { inject, observer } from "mobx-react";
import { CountryListItem, Seperator } from "../components/List";

class Home extends React.Component {
  static navigationOptions = () => ({
    title: "World Population",
  });

  componentWillMount() {
    const { countriesStore } = this.props;
    countriesStore.loadCountries();
  }

  render() {
    const { countriesStore } = this.props;

    return (
      <View style={styles.parentContainer}>
        {countriesStore.loading ? (
          <ActivityIndicator size="large" color={EStyleSheet.value('$colorPrimaryDark')} />
        ) : (
            <FlatList
              data={countriesStore.tempCountries}
              renderItem={({ item }) =>
                <CountryListItem
                  item={item}
                  onPress={() => this.handleItemPress(item)}
                />
              }
              keyExtractor={item => item}
              ItemSeparatorComponent={Seperator}
              ListHeaderComponent={this.renderHeader} />
          )}
      </View>
    );
  }

  renderHeader = () => {
    return (
      <View style={styles.searchHeaderContainer}>
        <View style={styles.searchHeaderRow}>
          <Image
            style={styles.searchHeaderIcon}
            source={require('./icons/search.png')}
          />
          <TextInput
            placeholder="Search"
            onChangeText={text => this.searchFilterFunction(text)}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            style={styles.searchHeaderTextInput}
            multiline={false}
            returnKeyLabel="Search"
            returnKeyType="search"
          />
        </View>
      </View>
    );
  };

  searchFilterFunction = text => {
    const { countriesStore } = this.props;
    const newData = countriesStore.countries.filter(item => {
      const itemData = item.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    countriesStore.onSearchCountries(newData);
  };

  handleItemPress = (country) => {
    const { navigation } = this.props;
    navigation.navigate('Details', { country });
  };
}

const styles = EStyleSheet.create({
  searchHeaderContainer: {
    backgroundColor: "gray",
    padding: 4,
  },
  searchHeaderRow: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 4,
    flex: 1,
  },
  searchHeaderIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 8,
    fontFamily: "Roboto",
  },
  searchHeaderTextInput: {
    height: 40,
    flex: 1,
  },
  parentContainer: {
    justifyContent: "center"
  }
});
export default inject((stores, props) => {
  const { countriesStore } = stores;
  return { countriesStore };
})(observer(Home));
import React from "react";
import { View, FlatList, ActivityIndicator, TextInput, Image } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { inject, observer } from "mobx-react";
import { CountryListItem, Seperator } from "../components/List";

class Home extends React.Component {
  static navigationOptions = () => ({
    title: "World Population"
  });

  componentWillMount() {
    const { countriesStore } = this.props;
    countriesStore.loadCountries();
  }

  render() {
    const { countriesStore } = this.props;

    return (
      <View style={{ justifyContent: "center", paddingTop: 12 }}>
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
      <View style={{ flexDirection: "row", backgroundColor: "white", alignItems: "center", borderRadius: 4, flex: 1 }}>
        <Image
          style={{ width: 16, height: 16, marginHorizontal: 8 }}
          source={require('./icons/search.png')}
        />
        <TextInput
          placeholder="Search"
          onChangeText={text => this.searchFilterFunction(text)}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          style={{ height: 40, flex: 1 }}
          multiline={false}
          returnKeyLabel="Search"
          returnKeyType="search"
        />
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

export default inject((stores, props) => {
  const { countriesStore } = stores;
  return { countriesStore };
})(observer(Home));
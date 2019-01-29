import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { inject, observer } from "mobx-react";
import { CountryListItem, Seperator } from "../components/List";

class Home extends React.Component {

  componentWillMount() {
    const { countriesStore } = this.props;
    countriesStore.loadCountries();
  }

  render() {
    const { countriesStore } = this.props;

    return (
      <View style={{ justifyContent: "center" }}>
        {countriesStore.loading ? (
          <ActivityIndicator size="large" color={EStyleSheet.value('$colorPrimaryDark')} />
        ) : (
            <FlatList
              data={countriesStore.countries}
              renderItem={({ item }) =>
                <CountryListItem
                  item={item}
                  onPress={() => this.handleItemPress(item)}
                />
              }
              keyExtractor={item => item}
              ItemSeparatorComponent={Seperator} />
          )}


      </View>
    );
  }

  handleItemPress = (country) => {
    const { navigation } = this.props;
    console.log(`clicking `, country);
    navigation.navigate('Details', { country });
  };
}

export default inject((stores, props) => {
  const { countriesStore } = stores;
  return { countriesStore };
})(observer(Home));
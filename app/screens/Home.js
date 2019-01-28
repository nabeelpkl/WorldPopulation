import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { inject, observer } from "mobx-react";
import { ListItem, Seperator } from "../components/List";

class Home extends React.Component {

  componentWillMount() {
    const { populationStore } = this.props;
    populationStore.loadCountries();
  }

  render() {
    const { populationStore } = this.props;

    return (
      <View style={{ justifyContent: "center" }}>
        {populationStore.loading ? (
          <ActivityIndicator size="large" color={EStyleSheet.value('$colorPrimaryDark')} />
        ) : (
            <FlatList
              data={populationStore.countries}
              renderItem={({ item }) =>
                <ListItem
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
    console.log(`clicking `, country);

  };
}

export default inject((stores, props) => {
  const { populationStore } = stores;
  return { populationStore };
})(observer(Home));
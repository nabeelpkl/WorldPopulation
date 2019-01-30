import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { inject, observer } from "mobx-react";
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from "prop-types";
import { PopulationListItem, Seperator } from "../components/List";
class PopulationDetails extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.country ? navigation.state.params.country : ""}`,
  });

  componentWillMount() {
    const { populationStore } = this.props;
    populationStore.loadPopulation();
  }

  render() {
    const { populationStore } = this.props;

    return (
      <View>
        {populationStore.loading ? (
          <ActivityIndicator size="large" color={EStyleSheet.value('$colorPrimaryDark')} />
        ) : (
            <View>
              <FlatList
                data={populationStore.populationTable}
                renderItem={({ item }) =>
                  <PopulationListItem
                    item={item}
                  />
                }
                keyExtractor={item => item}
                ItemSeparatorComponent={Seperator} />
            </View>
          )}
      </View>
    );
  }
}

PopulationDetails.propTypes = {
  populationStore: PropTypes.object.isRequired,
};


const styles = EStyleSheet.create({
  
});
export default inject((stores, props) => {
  const { populationDetailsStore } = stores;
  const { navigation } = props;
  const country = navigation.getParam("country");
  const populationStore = populationDetailsStore.getPopulationByCountry(country);

  return { populationStore };
})(observer(PopulationDetails));

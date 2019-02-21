import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from "prop-types";
import { PopulationListItem, Seperator } from "../components/List";
import { fetchPopulation } from '../actions/population';
class PopulationDetails extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.country ? navigation.state.params.country : ""}`,
  });

  constructor(props) {
    super(props);
    const country = props.navigation.getParam("country");
    this.props.dispatch(fetchPopulation(country));
  }

  render() {
    const { isFetching, table } = this.props;
    return (
      <View>
        {isFetching ? (
          <ActivityIndicator size="large" color={EStyleSheet.value('$colorPrimaryDark')} />
        ) : (
            <View>
              <FlatList
                data={table}
                renderItem={({ item }) =>
                  <PopulationListItem
                    item={item}
                  />
                }
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

const mapStateToProps = state => {
  const { isFetching, table } = state.population;
  return {
    isFetching,
    table,
  };
}


export default connect(mapStateToProps)(PopulationDetails);
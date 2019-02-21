import React from "react";
import { View, FlatList, ActivityIndicator, TextInput, Image } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { CountryListItem, Seperator } from "../components/List";
import { getCountriesList, searchCountry } from "../actions/countries";

class Home extends React.Component {
  static navigationOptions = () => ({
    title: "World Population",
  });

  constructor(props) {
    super(props);

    this.props.dispatch(getCountriesList());
    console.log(getCountriesList());
  }

  render() {
    const { isFetching, countries, reducedCountries } = this.props;

    return (
      <View style={styles.parentContainer}>
        {isFetching ? (
          <ActivityIndicator size="large" color={EStyleSheet.value('$colorPrimaryDark')} />
        ) : (
            <FlatList
              data={reducedCountries}
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

  searchFilterFunction = query => {
    this.props.dispatch(searchCountry(query));
  };

  handleItemPress = (country) => {
    const { navigation } = this.props;
    navigation.navigate('Details', { country });
  };
}

Home.propTypes = {
  countries: PropTypes.array.isRequired,
  reducedCountries: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

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
  },
  searchHeaderTextInput: {
    height: 40,
    flex: 1,
  },
  parentContainer: {
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  const isFetching = state.countries.isFetching;
  const countries = state.countries.countries;
  const reducedCountries = state.countries.reducedCountries;
  return {
    isFetching,
    countries,
    reducedCountries,
  };
};

export default connect(mapStateToProps)(Home);
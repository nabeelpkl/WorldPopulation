import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import EStyleSheet from 'react-native-extended-stylesheet';

import styles from "./styles";

const CountryListItem = ({ item, onPress }) => {
    const { name, mobile, lastDonateDate, nextDonateDate, recentDonor, bloodGroup, available } = item;

    return (
        <TouchableHighlight onPress={onPress} underlayColor={styles.$underlayColor}>
            <View style={styles.countryRowContainer}>
                <Text style={styles.countryNameText}>
                    {item}
                </Text>
            </View>
        </TouchableHighlight>
    );
};

// backgroundColor={EStyleSheet.value('$white')}

CountryListItem.propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
}

export default CountryListItem;
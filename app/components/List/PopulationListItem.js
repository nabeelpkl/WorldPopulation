import React from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const PopulationListItem = ({ item }) => {
    const { age, females, males, total } = item;

    return (
        <View style={styles.populationRowContainer}>
            <View style={styles.populationTopRow}>
                <View style={styles.populationAgeContainer}>
                    <Text style={styles.populationTitleText}>
                        Age
                    </Text>
                    <Text style={styles.populationValueText}>
                        {age}
                    </Text>
                </View>
                <View style={styles.populationAgeContainer}>
                    <Text style={styles.populationTitleText}>
                        Total
                    </Text>
                    <Text style={styles.populationValueText}>
                        {total}
                    </Text>
                </View>
            </View>
            <View style={styles.populationGenderContainer}>
                <View style={styles.populationGenderRow}>
                    <Image source={require("./icons/ic_male.png")} resizeMode="contain" style={styles.populationGenderImage} />
                    <Text style={styles.populationGenderValue}>{males}</Text>
                </View>
                <View style={styles.populationGenderRow}>
                    <Image source={require("./icons/ic_female.png")} resizeMode="contain" style={styles.populationGenderImage} />
                    <Text style={styles.populationGenderValue}>{females}</Text>
                </View>
            </View>
        </View>
    );
};

PopulationListItem.propTypes = {
    item: PropTypes.object,
}

export default PopulationListItem;
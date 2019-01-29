import React from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import PropTypes from "prop-types";
import EStyleSheet from 'react-native-extended-stylesheet';

import styles from "./styles";

const PopulationListItem = ({ item }) => {
    const { age, females, males, total } = item;
    console.log("reaching here");

    return (
        <View style={{ margin: 12 }}>
            <View style={{ flexDirection: "row", margin: 8 }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 13 }}>
                        Age
                    </Text>
                    <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
                        {age}
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 13 }}>
                        Total
                    </Text>
                    <Text style={{ fontSize: 20, color: "black", fontWeight: "600" }}>
                        {total}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", margin: 8 }}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require("./icons/ic_male.png")} resizeMode="contain" style={{ height: 20 }} />
                    <Text>{males}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require("./icons/ic_female.png")} resizeMode="contain" style={{ height: 20 }} />
                    <Text>{females}</Text>
                </View>
            </View>

        </View>
    );
};

// backgroundColor={EStyleSheet.value('$white')}

PopulationListItem.propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
}

export default PopulationListItem;
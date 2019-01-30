import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet } from "react-native";
export default EStyleSheet.create({
    $underlayColor: '$border',
    countryRowContainer: {
        margin: 12
    },
    countryNameText: {
        fontSize: 14,
        fontFamily: "Roboto",
    },
    populationRowContainer: {
        margin: 12,
    },
    populationTitleText: {
        fontSize: 13,
        fontFamily: "Roboto",
    },
    populationTopRow: {
        flexDirection: "row",
        margin: 8,
    },
    populationAgeContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    populationValueText: {
        fontSize: 20,
        color: "black",
        fontFamily: "Roboto",
    },
    populationGenderContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        margin: 8,
    },
    populationGenderRow: {
        flexDirection: "row",
    },
    populationGenderValue: {
        fontFamily: "Roboto",
    },
    populationGenderImage: {
        height: 20
    },
    seperator: {
        marginHorizontal: 12,
        backgroundColor: '$border',
        flex: 1,
        height: StyleSheet.hairlineWidth,
    },
});
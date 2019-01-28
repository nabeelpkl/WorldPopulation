import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet } from "react-native";
export default EStyleSheet.create({
    $underlayColor: '$border',
    row: {
        paddingLeft: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '$white',
    },

    seperator: {
        marginHorizontal: 12,
        backgroundColor: '$border',
        flex: 1,
        height: StyleSheet.hairlineWidth,
    },
});
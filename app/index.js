import React from "react";
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from "mobx-react";
import AppNavigator from "./config/routes";
import stores from "./stores"
EStyleSheet.build({
  $primaryColor: '#673AB7',
  $colorPrimaryDark: '#512DA8',
  $lightPrimary: '#D1C4E9',
  $colorAccent: '#FFC107',
  $iconColor: '#FFFFFF',
  $primaryText: '#212121',
  $secondaryText: '#757575',

  $white: '#ffffff',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  $darkText: '#343434',

  $fontTiny: 12,
  $fontLessTiny: 14,
  $fontSmall: 16,
  $fontMedium: 18,
  $fontLarge: 20,
  $fontLarger: 24,

  $spacingLarge: 24,
  $spacingNormal: 16,
  $spacingLessNormal: 12,
  $spacingSmall: 8,
  $spacingTiny: 4,
  $spacingTinier: 2,
});

class Main extends React.Component {

  render() {
    console.disableYellowBox = true;

    return (
      <Provider {...stores}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default Main;

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { CameraScreen, TestScreen } from "./src/screens"

const AppNavigator = createStackNavigator(
  {
    Camera: {
      screen: CameraScreen,
    },
    Test: {
      screen: TestScreen,
    }
  },
  {
    initialRouteName: "Test",
  }
);

export default createAppContainer(AppNavigator);

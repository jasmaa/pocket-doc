
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { CameraScreen, TestScreen, DiagnosisScreen } from "./src/screens"

const AppNavigator = createStackNavigator(
  {
    Camera: {
      screen: CameraScreen,
    },
    Test: {
      screen: TestScreen,
    },
    Diagnosis: {
      screen: DiagnosisScreen,
    },
  },
  {
    initialRouteName: "Camera",
  }
);

export default createAppContainer(AppNavigator);
import React from 'react';
import { View } from 'react-native';

import { RNCamera } from 'react-native-camera';

export default class CameraScreen extends React.Component {
    render() {
        return (
            <View>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{
                        flex: 1,
                        width: '100%',
                    }}
                >
                </RNCamera>
            </View>
        );
    }
}

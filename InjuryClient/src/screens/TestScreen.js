import React from 'react';
import { View, Button } from 'react-native';

export default class TestScreen extends React.Component {
    render() {
        return (
            <View>
                <Button title="Press me" onPress={()=>this.props.navigation.navigate('Camera')} />
            </View>
        );
    }
}

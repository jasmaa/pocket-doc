import React from 'react';
import { View, Text } from 'react-native';

export default class DiagnosisScreen extends React.PureComponent {

    componentDidMount(){
        this.setup();
    }

    async setup(){
        // Get response from server
        const response = await fetch('https://postman-echo.com/post', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                img: this.props.navigation.getParam('img'),
            }),
        });

        // Pass response on here
        console.log(response);
    }

    render(){
        return (
            <View>
                <Text>{"Diagnosis here"}</Text>
            </View>
        );
    }
}
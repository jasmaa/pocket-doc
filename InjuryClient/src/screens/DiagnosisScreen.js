import React from 'react';
import { View, Text } from 'react-native';

const axios = require('axios');

export default class DiagnosisScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.queryServer();
    }

    async queryServer() {
        // Get response from server
        let response = await axios.post('<put endpoint here>', {
            iam_apikey: "<put key here>",
            img: this.props.navigation.getParam('img'),
        });

        this.setState({ result: response.data });
    }

    render() {

        const displayResult = this.state.result
                            ? this.state.result["images"][0]["classifiers"][0]["classes"].length > 0
                                ? this.state.result["images"][0]["classifiers"][0]["classes"][0]["class"]
                                : "No problem"
                            : "Pending...";

        return (
            <View>
                <Text>{displayResult}</Text>
            </View>
        );
    }
}
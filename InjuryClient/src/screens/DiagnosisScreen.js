import React from 'react';
import { View, ActivityIndicator, FlatList, Linking, TouchableHighlight } from 'react-native';
import { Text, Card } from 'react-native-elements';

const axios = require('axios');

const DIAGNOSIS = {
    Burn: {
        text: "Hold the burn under cool running water for several minutes. Cover the burn with a sterile, non-stick bandage. Give the victim an aspirin or pain reliever. Soothe the area with a burn cream. Do not put cloth directly on the wound. Do not break blisters or try to remove clothing stuck to the burn.",
        links: [
            "https://www.beprepared.com/blog/8866/first-aid-for-burns/",
            "https://www.redcross.org/take-a-class/cpr/performing-cpr/cpr-steps"
        ],
    },
    Laceration: {
        text: "Apply direct pressure on the area. Remove any clothing or debris on the wound. Don't remove large or deeply embedded objects. First stop the bleeding with firm pressure, not on sensitive areas like eyes. Clean the area with warm water and gentle soap and/or apply antibiotic ointment, then put a sterile bandage on the area and apply more as necessary. Be especially aware of deep puncture wounds or bites (animals or human).",
        links: [
            "https://www.mayoclinic.org/first-aid/first-aid-severe-bleeding/basics/art-20056661",
            "https://www.webmd.com/first-aid/cuts-or-lacerations-treatment"
        ],
    },
    Bruise: {
        text: "Rest the bruised area, if possible. Ice the bruise with an ice pack wrapped in a towel. Leave it in place for 10 to 20 minutes. Repeat several times a day for a day or two as needed. Compress the bruised area if it is swelling, using an elastic bandage. Don't make it too tight. Elevate the injured area.",
        links: [
            "https://www.mayoclinic.org/first-aid/first-aid-bruise/basics/art-20056663",
        ],
    },
    Rash: {
        text: "Wash the rash with mild soap but don't scrub. Rinse with warm water. Pat the skin dry, rather than rubbing it. Don't cover the rash. Medicine like Zinc oxide ointment, Calamine lotion or for severe itching, applying hydrocortisone cream, are very effective.",
        links: [
            "https://myhealth.alberta.ca/Health/pages/conditions.aspx?hwid=tw6850",
        ],
    },
}

export default class DiagnosisScreen extends React.PureComponent {

    constructor(props) {
        super(props);

        this.endpoint = '<put entrypoint here>';
        this.apiKey = '<put api key here>';

        this.state = {};
    }

    componentDidMount() {
        this.queryServer();
    }

    async queryServer() {
        // Get response from server
        let response = await axios.post(this.endpoint, {
            iam_apikey: this.apiKey,
            img: this.props.navigation.getParam('img'),
        });

        this.setState({ result: response.data });
    }

    renderDiagnosis(displayResult) {
        if (displayResult in DIAGNOSIS) {
            return (
                <View>
                    <Card>
                        <Text style={{ fontSize: 20 }}>{DIAGNOSIS[displayResult]['text']}</Text>
                    </Card>
                    <Card>
                        <FlatList
                            data={DIAGNOSIS[displayResult]['links']}
                            renderItem={({ item, index, separators }) => (
                                <TouchableHighlight
                                    onPress={() => Linking.openURL(item)}
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}
                                    style={{ margin: 10 }}>
                                    <View style={{ backgroundColor: 'gainsboro' }}>
                                        <Text style={{ fontSize: 15, color: 'blue' }}>{item}</Text>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </Card>
                </View>
            );
        }
        else {
            return (
                <View></View>
            );
        }
    }

    render() {
        const receivedResult = !!this.state.result

        if (!receivedResult) {
            return (
                <ActivityIndicator size="large" color="#0000ff" />
            );
        }
        else {
            let displayResult = "No Problem";
            let percentage = "";

            if (this.state.result["images"][0]["classifiers"][0]["classes"].length > 0) {
                displayResult = this.state.result["images"][0]["classifiers"][0]["classes"][0]["class"];
                percentage = Math.round(this.state.result["images"][0]["classifiers"][0]["classes"][0]["score"] * 100) + "%";
            }

            return (
                <View style={{ margin: 10 }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text h1>{displayResult}</Text>
                        <View style={{ display: "flex", flex: 1 }}></View>
                        <Text h1>{percentage}</Text>
                    </View>
                    {this.renderDiagnosis(displayResult)}
                </View>
            );
        }
    }
}
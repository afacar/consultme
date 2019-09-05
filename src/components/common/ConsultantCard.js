import React, { Component } from 'react';
import { View, Text } from 'react-native';


class ConsultantCard extends Component {

    renderPricing = () => {
        const { consultationDetails } = this.props.consultant;
        if (consultationDetails.type == 'subscription') {
            return (
                <Text>
                    {'Subscription Price: ' + consultationDetails.subscriptionPrice}
                </Text>
            )
        } else {
            return (
                <View>
                    <Text>
                        {'Text Price: ' + consultationDetails.textPrice}
                    </Text>
                    <Text>
                        {'Audio Price: ' + consultationDetails.audioPrice}
                    </Text>
                    <Text>
                        {'Video Price: ' + consultationDetails.videoPrice}
                    </Text>
                </View>

            )
        }
    }

    render() {
        const { consultant } = this.props;
        const { consultationDetails } = consultant;
        return (
            <View>
                <Text>
                    {'Name: ' + consultant.name}
                </Text>
                <Text>
                    {'Number: ' + consultant.number}
                </Text>
                <Text>
                    {'PhotoUrl: ' + consultant.photoURL}
                </Text>
                <Text>
                    {'User Id: ' + consultant.uid}
                </Text>
                <Text>
                    {'Address: ' + consultationDetails.address}
                </Text>
                <Text>
                    {'Branch: ' + consultationDetails.branch}
                </Text>
                <Text>
                    {'Interest: ' + consultationDetails.interest}
                </Text>
                <Text>
                    {'SubBranch: ' + consultationDetails.subBranch}
                </Text>
                {this.renderPricing()}

            </View>
        )
    }
}

export default (ConsultantCard)
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, Avatar } from 'react-native-elements';
import { InformationIcon } from '../common/Icons';


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

    renderPricingType = () => {
        const { consultationDetails } = this.props.consultant;
        if (consultationDetails.type == 'subscription') {
            return (
                <Text>
                    {'Payment Type: ' + 'Subscription'}
                </Text>

            )
        } else {
            return (
                <Text>
                    {'Payment Type: ' + 'Session'}
                </Text>
            )
        }
    }

    render() {
        const { consultant } = this.props;
        const { consultationDetails } = consultant;
        return (
            <TouchableOpacity activeOpacity={0.80} onPress={()=> {this.props.infoPressed(this.props.consultant)}}>
                <Card
                    containerStyle={styles.container}>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', margin: 5 }}>

                        <Avatar
                            size="large"
                            rounded={true}
                            source={{ uri: consultant.photoURL }}
                        />
                        <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'column', margin: 5, paddingLeft: 15 }}>
                            <Text style={{ marginTop: 10, textAlign: 'left', fontSize: 20, color: 'black', marginBottom: 5 }}>
                                {consultant.name}
                            </Text>
                            <Text>
                                {'Branş: ' + consultationDetails.branch}
                            </Text>
                            <Text>
                                {'Adres: ' + consultationDetails.address}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        position: 'absolute',
                        right: -18,
                        top: -21
                    }}>

                        <Button
                            onPress={() => { this.props.infoPressed(this.props.consultant) }}
                            disabled={this.props.disabled || false}
                            style={{ flex: 1 }}
                            type='clear'
                            icon={<InformationIcon size={29} disabled={this.props.disabled} />}
                        />

                    </View>
                </Card>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
        borderWidth: 0,
        borderRightWidth: 0.2,
        borderBottomWidth: 0.1,
        borderRadius: 21,
        backgroundColor: 'white',
        borderColor: 'grey',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 12.00,
        
        elevation: 24,

    }
})
export default (ConsultantCard)
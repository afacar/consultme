import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

export default class ConsultantInfoForm extends Component {

    renderPricing = (textType) => {
        if (textType === 'text') {
            const type = this.props.consultant.consultationDetails.type;
            if (type == 'subscription') {
                return (
                    <Text>Aylık abonelik ücreti</Text>
                )
            } else if (type == 'session') {
                return (
                    <View>
                        <Text>Mesaj ücreti</Text>
                        <Text>Sesli konuşma ücreti</Text>
                        <Text>Görüntülü arama ücreti</Text>
                    </View>
                )
            }
        } else if (textType == 'value') {
            const { consultant } = this.props;
            const type = consultant.consultationDetails.type;
            if (type == 'subscription') {
                return (
                    <Text>{consultant.subscriptionPrice}</Text>
                )
            } else if (type == 'session') {
                return (
                    <View>
                        <Text>{consultant.consultationDetails.textPrice + "(tl/300 karakter)"}</Text>
                        <Text>{consultant.consultationDetails.audioPrice + "(tl/dk)"}</Text>
                        <Text>{consultant.consultationDetails.videoPrice + "(tl/dk)"}</Text>
                    </View>
                )
            }
        }
    }

    renderSubBranch = (textType) => {
        const { consultant } = this.props;
        if (consultant.consultationDetails.subBranch) {
            if (textType == 'text') {
                return (
                    <Text>Alt Branş</Text>
                )
            } else if (textType == 'value') {
                return (
                    <Text>{consultant.subBranch}</Text>
                )
            }
        }
    }

    renderInterest = (textType) => {
        const { consultant } = this.props;
        if (consultant.consultationDetails.interest) {
            if (textType == 'text') {
                return (
                    <Text>İlgi Alanları</Text>
                )
            } else if (textType == 'value') {
                return (
                    <Text>{consultant.consultationDetails.interest}</Text>
                )
            }
        }
    }

    render() {
        const { consultant } = this.props
        return (
            <Card>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{ flex: 1 }}>
                        <Text>İsim</Text>
                        <Text>Branş</Text>
                        {this.renderSubBranch('text')}
                        {this.renderInterest('text')}
                        <Text>İş adresi</Text>
                        {this.renderPricing('text')}
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text>{consultant.name}</Text>
                        <Text>{consultant.consultationDetails.branch}</Text>
                        {this.renderSubBranch('value')}
                        {this.renderInterest('value')}
                        <Text>{consultant.consultationDetails.address}</Text>
                        {this.renderPricing('value')}
                    </View>

                </View>
            </Card>
        )
    }
}
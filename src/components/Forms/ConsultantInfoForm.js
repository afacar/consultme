import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

export default class ConsultantInfoForm extends Component {

    renderPricing = () => {
        const { consultant } = this.props;
        const type = this.props.consultant.consultationDetails.type;
        return (
            <Card>
                <ScrollView
                    style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Text style={{ textAlign: 'left' }}>Abonelik ücreti</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Text>{consultant.consultationDetails.subscriptionPrice + " tl"}</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Text >{'Mesaj ücreti'}</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Text>{consultant.consultationDetails.textPrice + " \n(tl/ 300 \nkarakter)"}</Text>
                    </View>
                    <View
                        style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <Text style={{ textAlign: 'left' }}>{`Sesli konuşma \nücreti`}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <Text >{consultant.consultationDetails.audioPrice + " (tl/ dk)"}</Text>
                        </View>
                    </View>

                    <View
                        style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <Text style={{ textAlign: 'left' }}>{'Görüntülü arama \nücreti'}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <Text>{consultant.consultationDetails.videoPrice + " (tl/ dk)"}</Text>
                        </View>
                    </View>
                </ScrollView>
            </Card>
        )
    }

    renderSubBranch = (textType) => {
        const { consultant } = this.props;
        if (consultant.consultationDetails.subBranch) {
            return (
                <Card>
                    <View
                        style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <Text>Alt Branş</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <Text>{consultant.consultationDetails.subBranch}</Text>
                        </View>
                    </View>
                </Card>
            )
        }
    }

    renderInterest = (textType) => {
        const { consultant } = this.props;
        if (consultant.consultationDetails.interest) {
            return (<Card>
                <View
                    style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Text>İlgi Alanları</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Text>{consultant.consultationDetails.interest}</Text>
                    </View>
                </View>
            </Card>
            )
        }
    }

    render() {
        const { consultant } = this.props
        return (
            <Card>

                <View style={{ flex: 1, flexDirection: 'column' }}>

                    <Card>
                        <View
                            style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text>İsim</Text>
                            </View>

                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text>{consultant.name}</Text>
                            </View>
                        </View>
                    </Card>

                    <Card>
                        <View
                            style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text>Branş</Text>
                            </View>

                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text>{consultant.consultationDetails.branch}</Text>
                            </View>
                        </View>
                    </Card>

                    {this.renderSubBranch()}
                    {this.renderInterest()}

                    <Card>
                        <View
                            style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text>İş adresi</Text>
                            </View>

                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text>{consultant.consultationDetails.address}</Text>
                            </View>
                        </View>
                    </Card>

                    {this.renderPricing()}

                </View>
            </Card >
        )
    }
}
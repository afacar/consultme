import React, { Component } from 'react';
import { Button, Card, Input } from 'react-native-elements';

import { CardItem } from '../common/CardItem'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BuyButton } from '../common/Buttons';

export class WalletForm extends Component {

    renderFive = () => {
        if (this.props.fiveKontorOpened) {
            return (
                <ScrollView>
                    <TouchableOpacity  onPress={() => { this.props.makeAllFalse() }}>
                        <CardItem style={{ flex: 1, borderWidth: 1, }}>
                            <Text> 5 kontor 5 lira</Text>
                        </CardItem>
                        </TouchableOpacity>
                </ScrollView>

            )
        }
    }

    renderTen = () => {
        if (this.props.tenKontorOpened) {
            return (
                <ScrollView>
                    <TouchableOpacity  onPress={() => { this.props.makeAllFalse() }}>
                        <CardItem style={{ flex: 1, borderWidth: 1, }}>
                            <Text> 10 kontor 10 lira</Text>
                        </CardItem>
                        </TouchableOpacity>
                </ScrollView>

            )

        }
    }

    renderTwentyFive = () => {
        if (this.props.twentyFiveKontorOpened) {
            return (
                <ScrollView>
                <TouchableOpacity  onPress={() => { this.props.makeAllFalse() }}>
                    <CardItem style={{ flex: 1, borderWidth: 1, }}>
                        <Text> 25 kontor 25 lira</Text>
                    </CardItem>
                    </TouchableOpacity>
            </ScrollView>

            )

        }
    }
    renderFifty = () => {
        if (this.props.fiftyKontorOpened) {
            return (
                <ScrollView>
                    <TouchableOpacity  onPress={() => { this.props.makeAllFalse() }}>
                        <CardItem style={{ flex: 1, borderWidth: 1, }}>
                            <Text> 50 kontor 50 lira</Text>
                        </CardItem>
                        </TouchableOpacity>
                </ScrollView>

            )

        }
    }
    renderHundred = () => {
        if (this.props.hundredKontorOpened) {
            return (
                <ScrollView>
                    <TouchableOpacity  onPress={() => { this.props.makeAllFalse() }}>
                        <CardItem style={{ flex: 1, borderWidth: 1, }}>
                            <Text> 100 kontor 100 lira</Text>
                        </CardItem>
                        </TouchableOpacity>
                </ScrollView>

            )

        }
    }
    renderTwoHundred = () => {
        if (this.props.twoHundredKontorOpened) {
            return (
                <ScrollView>
                <TouchableOpacity  onPress={() => { this.props.makeAllFalse() }}>
                    <CardItem style={{ flex: 1, borderWidth: 1, }}>
                        <Text> 200 kontor 200 lira</Text>
                    </CardItem>
                    </TouchableOpacity>
            </ScrollView>

            )

        }
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Card
                        containerStyle={{ margin: 5 }}>
                        <CardItem>
                            <Input
                                key='iban'
                                label='IBAN'
                                //value={this.state.IBAN ? this.state.IBAN : ""}
                                placeholder={'TR012345678901234567890123456'}
                                multiline={false}
                                onChangeText={(text) => {
                                    this.setState({ text })
                                }}
                                editable={true}
                                leftIcon={{
                                    type: 'font-awesome',
                                    name: 'bank',
                                    size: 18
                                }}
                                leftIconContainerStyle={{ marginLeft: 0 }} />
                        </CardItem>
                    </Card>
                    <Card
                        containerStyle={styles.sha}>
                        <CardItem>
                            <Input
                                key='balance'
                                label="Bakiye"
                                //value={this.state.balance}
                                multiline={false}
                                editable={false}
                                rightIcon={{
                                    type: 'font-awesome',
                                    name: 'turkish-lira',
                                    size: 18
                                }} />
                        </CardItem>
                    </Card>

                    <View
                        style={{ flex: 1, alignItems: 'center', paddingTop: 30 }} >
                        <BuyButton
                            onPress={() => { this.props.onBuyCreditsPressed() }}
                        />
                    </View>
                    <View
                        style={{ flex: 1, flexDirection: 'row', paddingTop: 30 }} >

                        <TouchableOpacity
                            onPress={() => { this.props.openFiveDetails() }}
                        >
                            <Card containerStyle={styles.carST}>
                                <CardItem style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>5 kontor</Text>
                                </CardItem>
                                {this.renderFive()}
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.props.openTenDetails() }}
                        >
                            <Card containerStyle={styles.carST}>
                                <CardItem style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>10 kontor</Text>
                                </CardItem>
                                {this.renderTen()}
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.props.openTwentyFiveDetails() }}
                        >
                            <Card containerStyle={styles.carST}>
                                <CardItem style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>25 kontor</Text>
                                </CardItem>
                                {this.renderTwentyFive()}
                            </Card>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{ flex: 1, flexDirection: 'row', paddingTop: 30 }} >
                        <TouchableOpacity
                            onPress={() => { this.props.openFiftyDetails() }}
                        >
                            <Card containerStyle={styles.carST}>
                                <CardItem style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>50 kontor</Text>
                                </CardItem>
                                {this.renderFifty()}
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.props.openHundredDetails() }}
                        >
                            <Card containerStyle={styles.carST}>
                                <CardItem style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>100 kontor</Text>
                                </CardItem>
                                {this.renderHundred()}
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.props.openTwoHundredDetails() }}
                        >
                            <Card containerStyle={styles.carST}>
                                <CardItem style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>200 kontor</Text>
                                </CardItem>
                                {this.renderTwoHundred()}
                            </Card>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    sha: {
        borderWidth: 0,
        borderRadius: 10,
        borderColor: 'grey',
        borderBottomWidth: 0.1,
        borderRightWidth: 0.2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 40,
    },
    carST: {
        height: 100,
        width: 100,
        flex: 1,
        borderWidth: 1,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10

    }
})
import React, { Component } from 'react';
import { Button, Card, Input } from 'react-native-elements';

import { CardItem } from '../common/CardItem'
import { Text, View, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import colors from '../../Constants/Colors';

export class WalletForm extends Component {

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <Card
                        containerStyle={[styles.cardShadow, { backgroundColor: colors.WHITE_RED }]}>
                        <CardItem>
                            <Input
                                key='balance'
                                label="Bakiye"
                                labelStyle={{ color: 'white' }}
                                inputStyle={{ color: colors.IOS_BLUE }}
                                value={this.props.wallet ? this.props.wallet + '' : '0'}
                                multiline={false}
                                editable={false}
                                rightIcon={{
                                    type: 'font-awesome',
                                    name: 'turkish-lira',
                                    size: 18,
                                    color: colors.IOS_BLUE
                                }} />
                        </CardItem>
                    </Card>
                </View>

                <View style={{ flex: 1, marginBottom: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <TouchableHighlight onPress={() => { this.props.onBuyCreditsPressed(10) }} underlayColor={colors.LIGHT_GRAY_BACKGROUND_COLOR}>
                                <Card containerStyle={{ borderRadius: 10, backgroundColor: colors.ORANGE_RED, paddingBottom: 0 }}>
                                    <CardItem style={{ justifyContent: 'center' }}>
                                        <View style={{ flex: 1, alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>{`10 Kredi`}</Text>
                                        </View>

                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}>
                                            <Button
                                                type='clear'
                                                title='Paket Seç'
                                                titleStyle={{ color: colors.LIGHT_YELLOW }}
                                                onPress={() => { this.props.onBuyCreditsPressed(10) }}
                                            />
                                        </View>
                                    </CardItem>
                                </Card>
                            </TouchableHighlight>
                        </View>

                        <View style={{ flex: 1 }}>
                            <TouchableHighlight onPress={() => { this.props.onBuyCreditsPressed(25) }} underlayColor={colors.LIGHT_GRAY_BACKGROUND_COLOR}>
                                <Card containerStyle={{ borderRadius: 10, backgroundColor: colors.LIGHT_GREEN, paddingBottom: 0 }}>
                                    <CardItem style={{ justifyContent: 'center' }}>
                                        <View style={{ flex: 1, alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center', color: colors.IOS_RED, fontSize: 18 }}>{`25 Kredi`}</Text>
                                        </View>

                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}>
                                            <Button
                                                type='clear'
                                                title='Paket Seç'
                                                titleStyle={{ color: colors.LIGHT_BLUE }}
                                                onPress={() => { this.props.onBuyCreditsPressed(25) }}
                                            />
                                        </View>
                                    </CardItem>
                                </Card>
                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <TouchableHighlight onPress={() => { this.props.onBuyCreditsPressed(50) }} underlayColor={colors.LIGHT_GRAY_BACKGROUND_COLOR}>
                                <Card containerStyle={{ borderRadius: 10, backgroundColor: colors.IOS_BLUE, paddingBottom: 0 }}>
                                    <CardItem style={{ justifyContent: 'center' }}>
                                        <View style={{ flex: 1, alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center', color: colors.LIGHT_YELLOW, fontSize: 18 }}>{`50 Kredi`}</Text>
                                        </View>

                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}>
                                            <Button
                                                type='clear'
                                                title='Paket Seç'
                                                titleStyle={{ color: 'white' }}
                                                onPress={() => { this.props.onBuyCreditsPressed(50) }}
                                            />
                                        </View>
                                    </CardItem>
                                </Card>
                            </TouchableHighlight>
                        </View>

                        <View style={{ flex: 1 }}>
                            <TouchableHighlight onPress={() => { this.props.onBuyCreditsPressed(100) }} underlayColor={colors.LIGHT_GRAY_BACKGROUND_COLOR}>
                                <Card containerStyle={{ borderRadius: 10, backgroundColor: colors.LIGHT_YELLOW, paddingBottom: 0 }}>
                                    <CardItem style={{ justifyContent: 'center' }}>
                                        <View style={{ flex: 1, alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center', color: colors.WHITE_BLUE, fontSize: 18 }}>{`100 Kredi`}</Text>
                                        </View>

                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}>
                                            <Button
                                                type='clear'
                                                title='Paket Seç'
                                                titleStyle={{ color: colors.DARK_RED }}
                                                onPress={() => { this.props.onBuyCreditsPressed(100) }}
                                            />
                                        </View>
                                    </CardItem>
                                </Card>
                            </TouchableHighlight>
                        </View>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    cardShadow: {
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
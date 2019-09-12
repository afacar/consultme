import React, { Component } from 'react';
import { Button, Card, Input } from 'react-native-elements';

import { CardItem } from '../common/CardItem'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SaveButton, BuyButton } from '../common/Buttons';

export class WalletForm extends Component {

    render() {
        return (
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
                            leftIconContainerStyle = {{ marginLeft: 0}} />
                    </CardItem>
                </Card>
                <Card
                containerStyle = {styles.sha}>
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
                style = {{flex :1, alignItems: 'center', paddingTop: 30}} >
                    <BuyButton
                    />
                </View>
            </View>
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
    }
})
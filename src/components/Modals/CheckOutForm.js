import React, { Component } from 'react';
import { ScrollView, View, Dimensions, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { Button, Input, CheckBox, Text, Overlay } from 'react-native-elements';
import colors from '../../Constants/Colors';
import { SuccessIcon, FailIcon } from '../common/Icons';
import styles from '../../Constants/Styles';
import { WebView } from 'react-native-webview'

import Base64 from '../../Utils/Base64';

export default class CheckOutForm extends Component {

    render() {
        console.log("Render", this.props.threedsPaymentResult)
        return (
            <Overlay
                isVisible={this.props.showCheckOutForm}
                animationType='slide'
                onRequestClose={() => { this.props.onCancelPayment() }}
                containerStyle={{ justifyContent: 'center'}}>
                <>
                    {
                        !this.props.checkOutFormSubmitted && (
                            <ScrollView style={styles.checkOutFormStyle} contentContainerStyle={{ justifyContent: 'center', }}>
                                <KeyboardAvoidingView style={{flex: 1}}>
                                    <Input
                                        style={{ flex: 1 }}
                                        editable={!this.props.disabled}
                                        key='cardName'
                                        keyboardType='default'
                                        autoFocus={true}
                                        maxLength={26}
                                        errorMessage={this.props.cardNameError}
                                        placeholder='Kart üzerindeki isim'
                                        onChangeText={(value) => { this.props.onCardNameChanged(value) }}
                                        value={this.props.cardName || ''}
                                    />
                                    <Input
                                        style={{ flex: 1 }}
                                        editable={!this.props.disabled}
                                        key='card_number'
                                        keyboardType='number-pad'
                                        maxLength={19}
                                        placeholder='Kart Numarası'
                                        errorMessage={this.props.cardNumberError}
                                        onChangeText={(value) => { this.props.onCardNumberChanged(value) }}
                                        value={this.props.cardNumber || ''}
                                    />

                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Input
                                                style={{ flex: 1 }}
                                                editable={!this.props.disabled}
                                                key='month'
                                                keyboardType='number-pad'
                                                placeholder='MM'
                                                maxLength={2}
                                                errorMessage={this.props.monthError}
                                                onChangeText={(value) => { this.props.onMonthChanged(value) }}
                                                value={this.props.month || ''}
                                            />
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <Input
                                                style={{ flex: 1 }}
                                                key='year'
                                                editable={!this.props.disabled}
                                                keyboardType='number-pad'
                                                placeholder='YY'
                                                errorMessage={this.props.yearError}
                                                maxLength={2}
                                                onChangeText={(value) => { this.props.onYearChanged(value) }}
                                                value={this.props.year || ''}
                                            />
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <Input
                                                style={{ flex: 1 }}
                                                key='cvc'
                                                editable={!this.props.disabled}
                                                keyboardType='number-pad'
                                                placeholder='CVC'
                                                maxLength={3}
                                                errorMessage={this.props.CVCError}
                                                onChangeText={(value) => { this.props.onCVCChanged(value) }}
                                                value={this.props.CVC || ''}
                                            />
                                        </View>
                                    </View>

                                    <CheckBox title='3D Secure' onPress={() => { this.props.onThreeDSChecked() }} checked={this.props.threeDSChecked} />

                                    <Button disabled={this.props.disabled} title={this.props.payButtonTitle} titleStyle={{ color: 'white' }}
                                        type='solid' buttonStyle={{ backgroundColor: colors.IOS_BLUE, marginTop: 10 }}
                                        onPress={() => { this.props.onPayButtonPressed() }} />
                                    <Button disabled={this.props.disabled} title={'Ödemeyi iptal et'} titleStyle={{ color: 'white' }}
                                        type='solid' buttonStyle={{ backgroundColor: colors.IOS_RED, marginTop: 10 }}
                                        onPress={() => { this.props.onCancelPayment() }} />
                                </KeyboardAvoidingView>
                            </ScrollView>
                        )
                    }
                    {
                        this.props.checkOutFormSubmitted && (!this.props.threedsPaymentResult || this.props.threedsPaymentLoading || this.props.paymentLoading) && (
                            <View style={styles.screenCenter}>
                                <ActivityIndicator size='large' color={colors.IOS_BLUE} />
                            </View>
                        )
                    }
                    {this.props.checkOutFormSubmitted && this.props.threedsPaymentResult && this.props.threeDSChecked && (
                        <View style={{ flex: 1 }}>
                            <WebView
                                source={{ html: Base64.atob(this.props.threedsPaymentResult.data.htmlContent) }}
                                onTouchCancel={() => this.props.resetState()} />
                        </View>
                    )}
                    {
                        this.props.checkOutFormSubmitted && ((this.props.threedsPaymentResult && !this.props.threedsPaymentLoading) || this.props.paymentFinished) && this.props.paymentSuccessfull && (
                            <ScrollView style={styles.checkOutFormStyle} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button
                                    disabled={true}
                                    icon={<SuccessIcon size={48} />}
                                    type='clear'
                                />
                                <Text style={{ fontSize: 24, textAlign: 'center' }}>Ödeme işleminiz başarı ile gerçekleşmiştir</Text>
                            </ScrollView>
                        )
                    }
                    {
                        this.props.checkOutFormSubmitted && this.props.threedsPaymentResult && !this.props.threedsPaymentLoading && this.props.paymentFailed && (
                            <ScrollView style={styles.checkOutFormStyle} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button
                                    disabled={true}
                                    icon={<FailIcon size={48} />}
                                    type='clear'
                                />
                                <Text style={{ fontSize: 24, textAlign: 'center' }}>Ödeme işleminiz başarısız oldu</Text>
                                <Text style={{ fontSize: 24, textAlign: 'center', color: colors.IOS_RED }}>{this.props.paymentErrorMessage}</Text>
                            </ScrollView>
                        )
                    }
                </>
            </Overlay>
        )
    }
}
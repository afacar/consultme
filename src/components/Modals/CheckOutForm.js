import React, { Component } from 'react';
import { ScrollView, View, Dimensions, Modal } from 'react-native';
import { Button, Input, CheckBox } from 'react-native-elements';
import colors from '../../Constants/Colors';

const { width, height } = Dimensions.get('window')

export default class CheckOutForm extends Component {

    render() {
        return (
            <Modal
                visible={this.props.showCheckOutForm}
                transparent={true}
                animationType='slide'
                onRequestClose={() => { this.props.onCancelPayment() }}
            >
                <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center' }} >
                    <ScrollView style={{ height: height / 3, margin: 10, backgroundColor: colors.LIGHT_GRAY_BACKGROUND_COLOR }} contentContainerStyle={{ justifyContent: 'flex-start', }}>
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

                        <View style={{ flex: 1 }}>
                            <Input
                                key='value'
                                editable={!this.props.disabled}
                                keyboardType='number-pad'
                                placeholder='Yüklemek istediğiniz tutarı girin.'
                                maxLength={4}
                                errorMessage={this.props.valueError}
                                onChangeText={(value) => { this.props.onValueChanged(value) }}
                                value={this.props.value || ''}
                                containerStyle={{ marginTop: 10 }}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Input
                                key='city'
                                editable={!this.props.disabled}
                                keyboardType='default'
                                placeholder='Yaşadığınız şehir'
                                errorMessage={this.props.cityError}
                                onChangeText={(value) => { this.props.onCityChanged(value) }}
                                value={this.props.city || ''}
                                containerStyle={{ marginTop: 10 }}
                            />

                            <Input
                                key='address'
                                editable={!this.props.disabled}
                                keyboardType='default'
                                placeholder='Tam adresinizi girin'
                                errorMessage={this.props.addressError}
                                onChangeText={(value) => { this.props.onAddressChanged(value) }}
                                value={this.props.address || ''}
                                containerStyle={{ marginTop: 10 }}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Input
                                key='zipCode'
                                editable={!this.props.disabled}
                                keyboardType='number-pad'
                                placeholder='Posta kodu'
                                errorMessage={this.props.zipCodeError}
                                onChangeText={(value) => { this.props.onZipCodeChanged(value) }}
                                value={this.props.zipCode || ''}
                                containerStyle={{ marginTop: 10 }}
                            />

                        </View>

                        <Button disabled={this.props.disabled} title={this.props.payButtonTitle} titleStyle={{ color: 'white' }}
                            type='solid' buttonStyle={{ backgroundColor: colors.IOS_BLUE, marginTop: 10 }}
                            onPress={() => { this.props.onPayButtonPressed() }} />
                        <Button disabled={this.props.disabled} title={'Ödemeyi iptal et'} titleStyle={{ color: 'white' }}
                            type='solid' buttonStyle={{ backgroundColor: colors.IOS_RED, marginTop: 10 }}
                            onPress={() => { this.props.onCancelPayment() }} />

                    </ScrollView>
                </View>
            </Modal>
        )
    }
}
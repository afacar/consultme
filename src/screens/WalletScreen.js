import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'

import * as actions from '../appstate/actions';
import styles from '../Constants/Styles';
import CheckOutForm from '../components/Modals/CheckOutForm';
import { WalletForm } from '../components/Forms/WalletForm';

class WalletScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Cüzdanım`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    state = {
        buyCredits: false,
        checkOutFormSubmited: false,
        disabled: false,
        cardName: 'Javid Haji-zada',
        cardNumber: '5890 0400 0000 0016',
        month: '12',
        year: '23',
        CVC: '132',
        value: '23',
        city: 'Ankara',
        address: 'ODTU Teknokent',
        zipCode: '60001',
        threeDSChecked: false,
        cardNumberError: '',
        nameError: '',
        monthError: '',
        yearError: '',
        CVCError: '',
        valueError: '',
        cityError: '',
        addressError: '',
        zipCodeError: '',
        payButtonTitle: 'Kart Bilgilerini girin',
    }

    componentDidMount() {
    }

    onBuyCreditsPressed = () => {
        this.setState({
            buyCredits: true,
        })
    }

    onCancelPayment = () => {
        this.resetState();
    }

    onCardNameChanged = (name) => {
        this.setState({
            nameError: '',
            cardName: name,
        })
    }

    onCardNumberChanged = (number) => {
        let formattedText = number.split(' ').join('');
        if (formattedText.length > 0) {
            formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        this.setState({
            cardNumberError: '',
            cardNumber: formattedText,
        })
    }

    onMonthChanged = (month) => {
        this.setState({
            monthError: '',
            month: month,
        })
    }

    onYearChanged = (year) => {
        this.setState({
            yearError: '',
            year: year,
        })
    }

    onCVCChanged = (CVC) => {
        this.setState({
            CVCError: '',
            CVC: CVC,
        })
    }

    onThreeDSChecked = () => {
        this.setState({
            threeDSChecked: !this.state.threeDSChecked
        })
    }

    onValueChanged = (value) => {
        this.setState({
            valueError: '',
            value,
            payButtonTitle: `${value}TL öde`
        })
    }

    onCityChanged = (city) => {
        this.setState({
            city,
            cityError: ''
        })
    }

    onAddressChanged = (address) => {
        this.setState({
            address,
            addressError: ''
        })
    }

    onZipCodeChanged = (zipCode) => {
        this.setState({
            zipCode,
            zipCodeError: ''
        })
    }

    onPayButtonPressed = () => {
        var { cardNumber } = this.state;
        cardNumber = cardNumber.replace(/\s+/g, '')
        console.log("card number", cardNumber)

        console.log(this.luhnChk(cardNumber))
        if (!this.validateName()) {
            this.setState({
                nameError: 'Geçersiz isim girildi'
            })
        } else if (this.luhnChk(cardNumber) !== true) {
            this.setState({
                cardNumberError: 'Kart Numarası geçersiz.'
            })
        }
        else if (!this.validateMonth()) {
            this.setState({
                monthError: 'Geçersiz Ay girildi'
            })
        } else if (!this.validateYear()) {
            this.setState({
                yearError: 'Geçersiz Yıl girildi'
            })
        } else if (!this.validateCVC()) {
            this.setState({
                CVCError: 'CVC boş bırakılamaz.'
            })
        } else if (!this.validateValue()) {
            this.setState({
                valueError: 'Ödeme yapacağınız tutarı girin. Girdiğiniz tutar 5TL-den çok olmalıdır.'
            })
        } else if (!this.validateCity()) {
            this.setState({
                cityError: 'Şehir boş olmamalıdır.'
            })
        } else if (!this.validateAddress()) {
            this.setState({
                addressError: 'Adres boş olmamalıdır.'
            })
        } else if (!this.validateZipCode()) {
            this.setState({
                zipCodeError: 'Posta kodu boş olmamalıdır.'
            })
        }
        else {
            this.setState({
                disabled: true
            })
            const { cardName, month, year, CVC, cardNumber, value, city, address, zipCode } = this.state;
            var { user } = this.props;

            const card = {
                name: cardName,
                number: cardNumber,
                month,
                year,
                CVC
            }

            user = {
                ...user,
                city,
                address,
                zipCode
            }
            if (this.state.threeDSChecked) {
                this.props.startThreeDSPayment(card, user, value)
            } else {
                this.props.startPayment(card, user, value)
            }
        }
    }

    validateName = () => {
        const { cardName } = this.state;
        if (!cardName)
            return false;
        return true
    }

    validateValue = () => {
        const { value } = this.state;
        if (!value)
            return false;
        else if (value < 5)
            return false;
        return true
    }


    validateMonth = () => {
        const { month } = this.state;
        if (month.length != 2)
            return false;
        if (month > 12 || month < 1 || month === '00')
            return false;
        return true;
    }

    validateYear = () => {
        const { year } = this.state;
        if (year.length != 2)
            return false;
        if (year < 19)
            return false;
        return true;
    }

    validateCVC = () => {
        const { CVC } = this.state;
        if (CVC.length != 3)
            return false;
        return true;
    }

    validateCity = () => {
        const { city } = this.state;
        return city ? true : false
    }

    validateAddress = () => {
        const { address } = this.state;
        return address ? true : false
    }

    validateZipCode = () => {
        const { zipCode } = this.state;
        return zipCode ? true : false
    }

    resetState = () => {
        this.setState({
            buyCredits: false,
            checkOutFormSubmited: false,
            disabled: false,
            cardName: '',
            cardNumber: '',
            month: '',
            year: '',
            CVC: '',
            value: '',
            city: '',
            address: '',
            zipCode: '',
            threeDSChecked: false,
            cardNumberError: '',
            nameError: '',
            monthError: '',
            yearError: '',
            CVCError: '',
            valueError: '',
            cityError: '',
            addressError: '',
            zipCodeError: '',
            payButtonTitle: 'Kart Bilgilerini girin',
        })
    }

    luhnChk = (function (arr) {
        return function (ccNum) {
            var
                len = ccNum.length,
                bit = 1,
                sum = 0,
                val;

            while (len) {
                val = parseInt(ccNum.charAt(--len), 10);
                sum += (bit ^= 1) ? arr[val] : val;
            }

            return sum && sum % 10 === 0;
        };
    }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));


    render() {
        return (
            <ScrollView>
                {!this.state.buyCredits &&
                    (
                        <WalletForm onBuyCreditsPressed={this.onBuyCreditsPressed} />
                    )
                }
                {this.state.buyCredits && !this.state.checkOutFormSubmited &&
                    (
                        <CheckOutForm cardName={this.state.cardName} cardNumber={this.state.cardNumber}
                            month={this.state.month} year={this.state.year} CVC={this.state.CVC} value={this.state.value}
                            threeDSChecked={this.state.threeDSChecked} city={this.state.city} address={this.state.address}
                            zipCode={this.state.zipCode}
                            onCardNameChanged={this.onCardNameChanged} onCardNumberChanged={this.onCardNumberChanged}
                            onMonthChanged={this.onMonthChanged} onYearChanged={this.onYearChanged}
                            onCVCChanged={this.onCVCChanged} onValueChanged={this.onValueChanged}
                            onThreeDSChecked={this.onThreeDSChecked} onCityChanged={this.onCityChanged}
                            onAddressChanged={this.onAddressChanged} onZipCodeChanged={this.onZipCodeChanged}
                            cardNumberError={this.state.cardNumberError} cardNameError={this.state.nameError} CVCError={this.state.CVCError}
                            monthError={this.state.monthError} yearError={this.state.yearError} valueError={this.state.valueError}
                            cityError={this.state.cityError} addressError={this.state.addressError} zipCodeError={this.state.zipCodeError}
                            payButtonTitle={this.state.payButtonTitle} disabled={this.state.disabled}
                            onPayButtonPressed={this.onPayButtonPressed} onCancelPayment={this.onCancelPayment}
                        />
                    )
                }
                {(this.state.buyCredits) && this.state.checkOutFormSubmited && (
                    <View style={styles.fullScreen}>
                        <WebView
                            source={{ uri: 'https://github.com/react-native-community/react-native-webview/blob/master/docs/Getting-Started.md' }}
                        />
                    </View>
                )}
            </ScrollView>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { user } = auth
    return { user }
}

export default connect(mapStateToProps, actions)(WalletScreen);
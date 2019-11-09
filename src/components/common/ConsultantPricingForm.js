import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../Constants/Styles';
import { CardItem } from './CardItem';
import { Input } from 'react-native-elements';

export default class ConsultantPricingForm extends Component {

    render() {
        const { consultationDetails } = this.props;
        return (
            <ScrollView style={styles.fullScreen}>
                <CardItem style={{ flex: 1 }}>
                    <Input
                        key={'subs_price'}
                        label={'Abonelik ücreti ( tl / ay)'}
                        multiline={false}
                        maxLength={4}
                        placeholder={'Aylık abonelik ücreti'}
                        value={consultationDetails.subscriptionPrice || ''}
                        onChangeText={(value) => { this.props.onSubscriptionPriceChanged(value) }}
                    />
                </CardItem>

                <CardItem style={{ flex: 1 }}>
                    <Input
                        key={'text_price'}
                        label={'Mesaj ücreti (300 karakter)'}
                        multiline={this.props.textPrice ? false : true}
                        maxLength={4}
                        placeholder={'300 karakterlik mesaj başına ücret'}
                        value={consultationDetails.textPrice || ''}
                        onChangeText={(value) => { this.props.onTextPriceChanged(value) }}
                    />

                </CardItem>

                <CardItem style={{ flex: 1 }}>
                    <Input
                        key={'video_price'}
                        label={'Görüntülü arama ücreti ( tl / dk )'}
                        multiline={false}
                        maxLength={4}
                        placeholder={'Görüntülü arama ücreti'}
                        value={consultationDetails.audioPrice || ''}
                        onChangeText={(value) => { this.props.onAudioPriceChanged(value) }}
                    />

                </CardItem>

                <CardItem style={{ flex: 1 }}>
                    <Input
                        key={'audio_price'}
                        label={'Sesli arama ücreti ( tl / dk )'}
                        multiline={false}
                        maxLength={4}
                        placeholder={'Sesli arama ücreti'}
                        value={consultationDetails.videoPrice || ''}
                        onChangeText={(value) => { this.props.onVideoPriceChanged(value) }}
                    />
                </CardItem>
            </ScrollView>
        )
    }
}
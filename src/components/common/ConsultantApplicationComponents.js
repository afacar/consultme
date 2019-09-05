import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListPicker, CardItem } from './index'
import * as styles from '../../Constants/Styles';
import { Input, Button, Card } from 'react-native-elements';

export class ApplicationFirstComponent extends Component {
    render() {
        return (
            <ScrollView style={[styles.fullScreen, { margin: 10 }]}>
                <Text style={styles.welcomeText} >Danışmanlık başvurusuna hoşgeldiniz!</Text>
                <CardItem style={{ marginTop: 10 }}>
                    <ListPicker
                        label='Branş*'
                        selectedValue={this.props.branch}
                        onValueChange={(branch, itemIndex) => this.props.selectBranch({ branch })}
                        options={['Doktor', 'Dietisyen', 'Psikolog', 'Eğitim Danışmanı']}
                    />
                </CardItem>

                <CardItem style={{ marginTop: 10 }}>
                    <Input
                        key='semi_branch'
                        label='Alt branş'
                        labelStyle={{ color: 'black' }}
                        placeholder='Alt branşınız varsa buraya girin'
                        multiline={false}
                        maxLength={25}
                        inputStyle={{ padding: 5 }}

                        value={this.props.subBranch || ''}
                        onChangeText={(value) => { this.props.onSubBranchChange(value) }}
                    />
                </CardItem>

                <CardItem style={{ marginTop: 10 }}>
                    <Input
                        key='interest'
                        label='ilgi alanı'
                        labelStyle={{ color: 'black' }}
                        placeholder='İlgili olduğunuz alanları buraya girin'
                        multiline={true}
                        inputStyle={{ padding: 5 }}
                        value={this.props.interest || ''}
                        onChangeText={(value) => { this.props.onInterestChange(value) }}
                    />
                </CardItem>

                <CardItem style={{ marginTop: 10 }}>
                    <Input
                        key='addrees'
                        label='İş adresi*'
                        shake={this.props.shake}
                        labelStyle={{ color: 'black' }}
                        placeholder='Ankara Şehir Hastanesi/Çankaya/Ankara'
                        multiline={true}
                        inputStyle={{ padding: 5 }}
                        value={this.props.address || ''}
                        onChangeText={(value) => { this.props.onAddressChange(value) }}
                    />
                </CardItem>

                <CardItem style={{ marginTop: 10, borderWidth: 1 }}>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Button
                            type='clear'
                            title='Geri'
                            titleStyle={{ color: 'red' }}
                            onPress={() => { this.props.onBackPressed() }}
                        />
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', color: 'red' }}>
                            {this.props.errorMessage}
                        </Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Button
                            type='clear'
                            title='Devam'
                            titleStyle={{ color: '#43B66D' }}
                            onPress={() => { this.props.onNextPressed() }}
                        />
                    </View>
                </CardItem>

            </ScrollView>
        )
    }
}

export class ApplicationSecondComponent extends Component {

    renderSubscriptionDetails = () => {
        if (this.props.subscriptionOpened) {
            return (
                <CardItem style={{ alignItems: 'center' }}>
                    <Input
                        key={'subs_price'}
                        label={'Abonelik ücreti ( tl / ay)'}
                        multiline={false}
                        maxLength={4}
                        value={this.props.subscriptionPrice || ''}
                        onChangeText={(value) => { this.props.onSubscriptionPriceChanged(value) }}
                    />
                </CardItem>
            )
        }
    }

    renderSessionDetails = () => {
        if (this.props.sessionOpened) {
            return (
                <ScrollView>
                    <CardItem style={{ flex: 1, borderWidth: 1, }}>
                        <Input
                            key={'text_price'}
                            label={'Mesaj ücreti (300 karakter)'}
                            multiline={false}
                            maxLength={4}
                            placeholder={'Ücreti giriniz'}
                            value={this.props.textPrice || ''}
                            onChangeText={(value) => { this.props.onSessionTextPriceChanged(value) }}
                        />

                    </CardItem>

                    <CardItem style={{ flex: 1, borderWidth: 1, }}>
                        <Input
                            key={'video_price'}
                            label={'Görüntülü arama ücreti ( tl / dk )'}
                            multiline={false}
                            maxLength={4}
                            placeholder={'Ücreti giriniz'}
                            value={this.props.audioPrice || ''}
                            onChangeText={(value) => { this.props.onSessionAudioPriceChanged(value) }}
                        />

                    </CardItem>

                    <CardItem style={{ flex: 1, borderWidth: 1, }}>

                        <Input
                            key={'audio_price'}
                            label={'Sesli arama ücreti ( tl / dk )'}
                            multiline={false}
                            maxLength={4}
                            placeholder={'Ücreti giriniz'}
                            value={this.props.videoPrice || ''}
                            onChangeText={(value) => { this.props.onSessionVideoPriceChanged(value) }}
                        />
                    </CardItem>
                </ScrollView>
            )
        }
    }
    render() {
        return (
            <ScrollView style={[styles.fullScreen, { margin: 10 }]}>
                <Text style={styles.welcomeText} >Ücretlendirme şeklinizi belirleyin!</Text>
                <TouchableOpacity onPress={() => { this.props.openSubscriptionDetails() }} >
                    <Card style={{ marginTop: 10 }}>
                        <CardItem style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 18 }}>Aylık abone</Text>
                        </CardItem>
                        {this.renderSubscriptionDetails()}
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.props.openSessionDetails() }} >
                    <Card style={{ marginTop: 10 }}>
                        <CardItem style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>Oturum başına ücretlendirme</Text>
                        </CardItem>
                        {this.renderSessionDetails()}
                    </Card>
                </TouchableOpacity >

                <CardItem style={{ marginTop: 10, borderWidth: 1 }}>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Button
                            type='clear'
                            title='Geri'
                            titleStyle={{ color: 'red' }}
                            onPress={() => { this.props.onBackPressed() }}
                        />
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', color: 'red' }}>
                            {this.props.errorMessage}
                        </Text>
                    </View>

                    <View style={{ alignItems: 'flex-end', }}>
                        <Button
                            type='clear'
                            title='Devam et'
                            titleStyle={{ color: '#43B66D' }}
                            disabled={this.props.disabled}
                            onPress={() => { this.props.onNextPressed() }}
                        />
                    </View>
                </CardItem>
                <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 18 }}>{this.props.footerText}</Text>
            </ScrollView >
        )
    }
}

export class ApplicationThirdComponent extends Component {


    renderLoading = () => {
        if (this.props.loading)
            return (
                <ActivityIndicator size='large' style={styles.screenCenter} color='green' />
            )
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Text style={styles.welcomeText}>{this.props.loading ? 'Danışmanlık başvurunuz alınıyor. Lütfen bekleyiniz.' : 'Başvurunuz alınmıştır'}</Text>
                {this.renderLoading()}
                <Button
                    type='solid'
                    title='Uygulamaya dön'
                    disabled={this.props.loading}
                    titleStyle={{ color: 'white' }}
                    onPress={() => { this.props.onThirdComponentFinished() }}
                />
            </ScrollView>
        )
    }
}
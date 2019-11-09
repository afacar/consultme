import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableHighlight } from 'react-native';
import { ListItem, Button, Card } from 'react-native-elements';

import { connect } from 'react-redux'
import colors from '../Constants/Colors';


class SettingsScreen extends Component {
    static navigationOptions = {
        title: 'Ayarlar'
    };

    render() {
        return (
            <ScrollView style={styles.containerStyle}>
                <View style={styles.itemStyle}>
                    <TouchableHighlight onPress={() => this.navigateNextScreen('profile')} underlayColor='white'>
                        <ListItem
                            key='profile'
                            title='Profil Ayarları'
                            titleStyle={{ fontSize: 21 }}
                            onPress={() => this.navigateNextScreen('profile')}
                            leftIcon={{ color: colors.LIGHT_GREEN, type: 'entypo', name: 'user' }}
                            rightIcon={{ type: 'material', name: 'keyboard-arrow-right', size: 33 }}
                            containerStyle={styles.btn}
                        />
                    </TouchableHighlight>
                </View>

                <View style={styles.itemStyle}>
                    <TouchableHighlight onPress={() => this.navigateNextScreen('archive')} underlayColor='white'>
                        <ListItem
                            key='archive'
                            title='Arşiv'
                            titleStyle={{ fontSize: 21 }}
                            onPress={() => this.navigateNextScreen('archive')}
                            leftIcon={{ color: colors.CYAN_BLUE, type: 'material', name: 'archive' }}
                            rightIcon={{ type: 'material', name: 'keyboard-arrow-right', size: 33 }}
                            containerStyle={styles.btn}
                        />
                    </TouchableHighlight>
                </View>

                <View style={styles.itemStyle}>
                    <TouchableHighlight onPress={() => this.navigateNextScreen('wallet')} underlayColor='white'>
                        <ListItem
                            key='wallet'
                            title='Cüzdanım'
                            titleStyle={{ fontSize: 21 }}
                            onPress={() => this.navigateNextScreen('wallet')}
                            leftIcon={{ color: colors.ORANGE, type: 'entypo', name: 'wallet' }}
                            rightIcon={{ type: 'material', name: 'keyboard-arrow-right', size: 33 }}
                            containerStyle={styles.btn}
                        />
                    </TouchableHighlight>
                </View>

                {
                    !this.props.user.isProvider && (
                        <View style={{ flex: 1, margin: 10, alignSelf: 'center', alignItems: 'center' }}>
                            <Button
                                type='outline'
                                title='Danışmanlık vermek istiyorum'
                                onPress={() => {
                                    this.navigateNextScreen('consultant')
                                }}
                                buttonStyle={{ borderRadius: 10 }}
                            />
                        </View>
                    )
                }

                {
                    this.props.user.isProvider && (
                        <View style={styles.itemStyle}>
                            <TouchableHighlight onPress={() => this.navigateNextScreen('wallet')} underlayColor='white'>
                                <ListItem
                                    key='consultancy_settings'
                                    title='Danışmanlık Ayarları'
                                    titleStyle={{ fontSize: 21 }}
                                    onPress={() => this.navigateNextScreen('consultant_settings')}
                                    leftIcon={{ color: colors.RED, type: 'FontAwesome', name: 'edit' }}
                                    rightIcon={{ type: 'material', name: 'keyboard-arrow-right', size: 33 }}
                                    containerStyle={styles.btn}
                                />
                            </TouchableHighlight>
                        </View>
                    )
                }

            </ScrollView >
        )
    }

    navigateNextScreen = (screen) => {
        const { navigate } = this.props.navigation;
        if (screen === 'profile') {
            navigate('ProfileScreen', { navigation: this.props.navigation });
        }
        else if (screen === 'wallet') {
            navigate('WalletScreen', { navigation: this.props.navigation });
        }
        else if (screen === 'archive') {
            navigate('ArchivedChatsScreen', { navigation: this.props.navigation });
        } else if (screen === 'consultant') {
            navigate('ConsultantApplicationScreen');
        } else if ( screen === 'consultant_settings'){
            navigate('ConsultationSettingsScreen');
        }
    }
}

mapStateToProps = (state) => {
    return { user: state.auth.user }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#f7f7f7',
    },
    btn: {
        borderBottomWidth: 1,
        backgroundColor: "white",
    },
    itemStyle: {
        marginBottom: 10
    }
});

export default connect(mapStateToProps, null)(SettingsScreen)
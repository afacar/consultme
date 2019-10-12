import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

export default class VideoTimeout extends Component {

    render() {
        var { remainingMinutes } = this.props;
        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', top: '10%', alignSelf: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, backgroundColor: 'white', alignSelf: 'baseline' }}>
                        <Text style={styles.text}>{( remainingMinutes || remainingMinutes > 0) ? remainingMinutes + ' Dakika konuşmanız kaldı': "Yetersiz bakiye"}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        flex: 1,
        justifyContent: 'center'
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        fontSize: 14,
        alignSelf: 'center',
        color: 'black',
        marginRight: 10
    }
})

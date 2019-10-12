import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

class VideoTimeout extends Component {

    render() {
        var { minutes, seconds, remainingMinutes } = this.props;
        if (seconds < 10)
            seconds = '0' + seconds;
        if (minutes < 10)
            minutes = '0' + minutes;

        return (
            <View style={styles.container}>
                {this.props.callInProgress &&
                    <View style={{ position: 'absolute', top: '20%', alignSelf: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 1, backgroundColor: 'white', alignSelf: 'baseline' }}>
                            <Text>{minutes}:{seconds}</Text>
                        </View>
                    </View>
                }
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        callInProgress: state.connectycube_videosession.callInProgress
    }
}

export default connect(mapStateToProps, null)(VideoTimeout);

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
        fontSize: 12,
        color: 'black',
        marginRight: 10
    }
})

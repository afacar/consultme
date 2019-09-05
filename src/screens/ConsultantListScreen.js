import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import * as actions from '../appstate/actions/auth_actions'
import { connect } from 'react-redux'
import ConsultantListScreenHeaderRight from '../components/common/Headers';

class ConsultantListScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Danışman listesi`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
        headerRight: (
            <ConsultantListScreenHeaderRight navigation={navigation}/>
        )
    });

    componentDidMount() {
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>List of all Consultants will be here</Text>
            </View>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { user } = auth
    return user
}

export default connect(mapStateToProps, actions)(ConsultantListScreen);
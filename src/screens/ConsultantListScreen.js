import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { LoginIcon } from '../components/common/Icons';
import { Button } from 'react-native-elements';
import * as actions from '../appstate/actions/auth_actions'
import { connect } from 'react-redux'

class ConsultantListScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Danışman listesi`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },

        headerRight: (
            // navigation.state.params.user ?
                // (
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                            <Button
                                onPress={() => navigation.navigate('LoginScreen')}
                                type='clear'
                                icon={<LoginIcon size={24} />}
                                />
                        </View>
                    </View>
                // )
                // :
                // (
                //     <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                //         <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                //             <Button
                //                 onPress={() => navigation.navigate('LoginScreen')}
                //                 type='clear'
                //                 title={'Arama butonu'}
                //             />
                //             />
                //         </View>
                //     </View>
                // )
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
    console.log("auth", auth)
    const { user } = auth
    console.log("User", user);
    return user
}

export default connect(mapStateToProps, actions)(ConsultantListScreen);
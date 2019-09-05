import React, { Component } from 'react';
import { Input, Button, Card } from 'react-native-elements';
import { LoginIcon } from './Icons';
import { connect } from 'react-redux';
import * as actions from '../../appstate/actions';

class ConsultantListScreenHeaderRight extends Component {
    render() {
        console.log('CLSHR', this.props.user);
        return (
            this.props.user.uid ? (
                <Button
                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                    type='clear'
                    title={'Arama butonu'}
                />
            ) :
                (
                    <Button
                        onPress={() => this.props.navigation.navigate('LoginScreen')}
                        type='clear'
                        icon={<LoginIcon size={24} />}
                    />
                )
        )
    }
}

const mapStateToProps = ({ auth }) => {
    console.log("auth", auth)
    const { user } = auth
    console.log("User", user);
    return {user}
}

export default connect(mapStateToProps, actions)(ConsultantListScreenHeaderRight);
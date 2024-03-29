import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { LoginIcon } from './Icons';
import { connect } from 'react-redux';
import * as actions from '../../appstate/actions';

class ConsultantListScreenHeaderRight extends Component {
    render() {
        return (
            this.props.user.uid ? (
                <Button
                    // onPress={() => this.props.navigation.navigate('LoginScreen')}
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
    const { user } = auth
    return { user }
}

export default connect(mapStateToProps, actions)(ConsultantListScreenHeaderRight);



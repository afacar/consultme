import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import * as actions from '../appstate/actions/auth_actions'
import { connect } from 'react-redux'
import ConsultantListScreenHeaderRight from '../components/common/Headers';

import * as styles from '../Constants/Styles';
import { FlatList } from 'react-native-gesture-handler';
import ConsultantCard from '../components/common/ConsultantCard';

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

    extractKeyForFlatlist = (item, index) => {
        return item.uid
    }

    renderConsultant = ({item}) => {
        return <ConsultantCard consultant={item}/>
    }
    render() {
        return (
            <View style={styles.fullScreen}>
                <FlatList
                data={this.props.state.consultants} 
                extraData={this.props.state.consultants}
                keyExtractor={this.extractKeyForFlatlist} 
                renderItem={this.renderConsultant}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const {user} = state.auth;
    const {consultants} = state.app;
    return {state: { user, consultants }  }
}

export default connect(mapStateToProps, actions)(ConsultantListScreen);
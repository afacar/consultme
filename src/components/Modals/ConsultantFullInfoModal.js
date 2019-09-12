import React, { Component } from "react";
import { ScrollView, View, Modal, Text } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../appstate/actions';

import { Image, Button, Avatar, Card } from "react-native-elements";
import styles from "../../Constants/Styles";
import { LoginIcon } from "../common";
import colors from "../../Constants/Colors";
import ConsultantInfoForm from "../Forms/ConsultantInfoForm";


class ConsultantFullInfoModal extends Component {

    render() {
        return (
            <Modal visible={this.props.visible} transparent={true} animationType='fade'>
                <ScrollView style={styles.consultantCard}>
                    <View style={styles.consultantCardAvatarContainer}>
                        <Avatar
                            width='100%'
                            size='xlarge'
                            source={{ uri: this.props.consultant.photoURL }}
                        />
                    </View>

                    <ConsultantInfoForm consultant={this.props.consultant} />

                    <Card style={{ flex: 1, borderWidth: 1 }}>
                        <Button
                            type='outline'
                            title='Danışmanlık al'
                            onPress={() => { this.props.consultMe(this.props.consultant) }}
                        />
                    </Card>

                    <Card style={{ flex: 1, borderWidth: 1, marginBottom: 10 }}>
                        <Button
                            type='outline'
                            title='Kapat'
                            titleStyle={{ color: colors.IOS_RED }}
                            onPress={() => { this.props.onModalClose() }}
                        />
                    </Card>

                </ScrollView>
            </Modal>

        )
    }
}

export default connect(null, actions)(ConsultantFullInfoModal)
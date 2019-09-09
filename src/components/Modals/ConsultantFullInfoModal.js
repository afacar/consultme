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

    renderPricing = () => {
        const type = this.props.consultant.type;
        if (type == 'subscription') {
            return (
                <Text>Aylık abonelik ücreti</Text>
            )
        } else if (type == 'session') {
            return (
                <View>
                    <Text>Mesaj ücreti</Text>
                    <Text>Sesli konuşma ücreti</Text>
                    <Text>Görüntülü arama ücreti</Text>
                </View>
            )
        }
    }

    render() {
        console.log("Incoming consultant ", JSON.stringify(this.props.consultant))
        return (
            <Modal visible={this.props.visible} transparent={true} animationType='fade'>
                <ScrollView style={styles.consultantCard}>
                    <View style={styles.consultantCardAvatarContainer}>
                        <Avatar
                            avatarStyle={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50, }}
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
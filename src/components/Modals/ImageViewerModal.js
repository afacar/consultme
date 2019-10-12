import React, { Component } from 'react';
import { Modal, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Icon } from 'react-native-elements';
import styles from '../../Constants/Styles';

class ImageViewerModal extends Component {

    render() {
        return (
            <Modal
                visible={this.props.showImage}
                transparent={true}
                animationType='fade'
                onRequestClose={() => { this.props.changeImageViewState(false) }}
            >
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <TouchableOpacity onPress={() => { this.props.changeImageViewState(false) }}>
                        <Icon type='font-awesome' name='times' iconStyle={{ position: 'relative', marginRight: Math.round(Dimensions.get('window').width) / 1.1 }} size={32} color='white' />
                    </TouchableOpacity>
                    <ImageViewer
                        style={{ backgroundColor: 'transparent'}}
                        imageUrls={this.props.images}
                        onSwipeDown={() => { this.props.changeImageViewState(false) }}
                        enableSwipeDown={true}
                        enablePreload={true}
                        saveToLocalByLongPress={false}
                        index={this.props.currentIndex - 1}
                    />
                </View>
            </Modal>
        )
    }
}
export default (ImageViewerModal)

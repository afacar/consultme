import { Dimensions, StyleSheet } from 'react-native'
import colors from "./Colors";


const { width, height } = Dimensions.get('window');
const MODAL_HEIGHT = 4 * height / 5;
const styles = StyleSheet.create({
    screenCenter: {
        position: 'absolute',
        flex: 1,
        bottom: 0,
        top: 0,
        right: 0,
        left: 0
    },
    fullScreen: {
        flex: 1,
        margin: 10,
    },
    fullScreenSearchComponent: {
        flex: 1,
        margin: 10,
        marginTop: 10
    },
    welcomeText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    consultantCard: {
        height: MODAL_HEIGHT,
        margin: 15,
        backgroundColor: colors.LIGHT_GRAY_BACKGROUND_COLOR,
        borderRadius: 20
    },
    consultantCardAvatarContainer: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    consultantCardCloseButtonContainer: {
        position: 'absolute',
        top: 5,
        left: 5
    },
    buttonStyle: {
        flex: 1,
        padding: 1,
        borderRadius: 20,
        justifyContent: 'center',
        marginHorizontal: '20%'
    },
    searchButtonStyle: {
        flex: 1,
        padding: 1,
        borderRadius: 3,
        justifyContent: 'center',
        marginHorizontal: '16%'
    },
    cardItemRowStyle: {
        borderWidth: 0,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        borderColor: '#ddd',
        position: 'relative'
    },
    cardItemColumnStyle: {
        borderWidth: 0,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    },
    cardItemContentStyle: {
        flexDirection: 'row',
    },
    cardItemLabelStyle: {
        fontWeight: "bold",
        alignContent: "center",
        paddingRight: 30,
    },
    chatMessageImage: {
        width: 200,
        height: 200,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
    },
    audioCardLoader: {
        flexDirection: "row",
        backgroundColor: 'rgb(220,220,220)',
        height: 60,
        width: "100%",
        borderRadius: 4,
        justifyContent: 'center',
        padding: 8
    },
    checkOutFormStyle: {
        height: height,
        margin: 10,
        backgroundColor: colors.LIGHT_GRAY_BACKGROUND_COLOR
    },
    buttonBar: {
        height: 50,
        backgroundColor: colors.IOS_BLUE,
        display: 'flex',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'space-around'
    },
    customHeader: {
        height: 50,
        backgroundColor: colors.IOS_BLUE,
        display: 'flex',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    },
    absView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
    },
    videoView: {
        padding: 5,
        flexWrap: 'wrap',
        flexDirection: 'row',
        zIndex: 100
    },
    localView: {
        flex: 1
    },
    remoteView: {
        width: (width - 40) / 3,
        height: (width - 40) / 3,
        margin: 5
    },
    bottomView: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default styles;
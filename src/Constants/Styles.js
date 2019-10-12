import { Dimensions, StyleSheet } from 'react-native'
import colors from "./Colors";


const { width, height } = Dimensions.get('window');
const MODAL_HEIGHT = 4 * height / 5;
const styles = StyleSheet.create({
    screenCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
    }
})

export default styles;
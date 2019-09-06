import { Dimensions, StyleSheet } from 'react-native'
import colors from "./Colors";


const { width, height } = Dimensions.get('window');
const MODAL_HEIGHT = 4 * height / 5;
const styles = StyleSheet.create({
    screenCenter: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fullScreen: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    welcomeText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    consultantCard: {
        height: MODAL_HEIGHT,
        margin: 15,
        paddingBottom:5, 
        backgroundColor: colors.LIGHT_GRAY_BACKGROUND_COLOR,
        borderRadius: 20
    },
    consultantCardAvatarContainer: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    consultantCardCloseButtonContainer: {
        position: 'absolute',
        top: 5,
        left: 5
    }
})

export default styles;
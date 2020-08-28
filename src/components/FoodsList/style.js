import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',        
    },
    closeSection: {
        width: '100%',
        marginTop: 20
    },
    close: {
        width: 30,
        height: 30
    },
    headingSection: {
        width: '100%',
        marginTop: 20
    },
    heading: {
        fontSize: 26,
        fontWeight: '700'
    },
    searchSection: {
        width: '100%',
        backgroundColor: '#e5ecf9',
        borderWidth: 1,
        borderColor: '#d7e3f9',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderRadius: 4,
        marginTop: 10,
        paddingVertical: 5
    },
    chatSection: {
        position: 'absolute',
        right: 1,
        zIndex: 1000,
        top: 30
    },
    chatIcon: {
        width: 50,
        height: 50
    }
});
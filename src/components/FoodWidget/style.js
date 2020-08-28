import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    widget: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d7e3f9',
        paddingHorizontal: 5,
        marginTop: 10
    },
    categorySection: {
        width: '100%',
        flexDirection: 'row',
        borderRadius: 4,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5'
    },
    subCategorySection: {
        backgroundColor: '#fff'
    },
    quoteSection: {
        backgroundColor: '#e5ecf9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d7e3f9',
        marginVertical: 10,
        marginHorizontal: 20
    },
    quote: {
        color: '#777',
        fontSize: 12,
        alignSelf: 'center'
    }
});
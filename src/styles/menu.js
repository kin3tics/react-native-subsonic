import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    menu: {
        width: 250
    },
    menuHeader: {
        padding: 10,
        paddingBottom: 12,
        flexDirection:'row',
        borderBottomWidth: 5
    },
    menuHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20
    },
    menuItem: {
        flexDirection:'row',
        padding: 10
    },
    menuItemText: {
        fontSize: 20,
        paddingLeft: 20,
        fontWeight: 'bold'
    }
});
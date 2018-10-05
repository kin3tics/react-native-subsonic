import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    menu: {
        width: 250
    },
    menuHeader: {
        flexDirection:'row',
        borderBottomWidth: 5,
        borderColor: '#2a2a2a'
    },
    menuHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20
    },
    menuItem: {
        padding: 10
    },
    menuItemImg: {
        height: 24,
        width: 24
    },
    selectedMenuItem: {
        backgroundColor: '#2a2a2a'
    },
    menuItemText: {
        fontSize: 20,
        paddingLeft: 20,
        fontWeight: 'bold'
    },
    mobileMenuItem: {
        padding: 10
    },
    mobileMenuItemImg: {
        height: 42,
        width: 42
    },
});
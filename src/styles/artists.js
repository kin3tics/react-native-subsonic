import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: 250
    },
    footer: {
        position: 'absolute',
        //flex:0.1,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection:'row',
        height:50,
        alignItems:'center',
    },
    subHeader: {
        padding: 5
    },
    subHeaderText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    listItem: {
        paddingLeft: 10,
        paddingTop: 2,
        paddingBottom: 2
    },
    listItemText: {
        fontWeight: 'bold'
    },
    listItem2: {
        padding: 2
    }
});
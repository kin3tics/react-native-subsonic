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
        height:75,
        padding: 15,
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
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2
    },
    listItemText: {
        fontWeight: 'bold'
    },
    listItem2: {
        padding: 1.5
    },

    albumList: {
        position: 'absolute',
        //flex:0.1,
        //right: 0,
        bottom: 0,
        height:160,
        justifyContent: 'center',
        paddingTop:10,
        paddingLeft: 10
    },

    albumListItem: {
        height: 125,
        width: 125,
        backgroundColor: '#FFF',
        margin: 10
    },
    albumDetailTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },
    albumDetailSubtitle: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 10
    },
    albumDetailText: {
        flexDirection:'row',
        paddingLeft: 10
    },
    albumSongContainer: {
        
        position: 'absolute',
        top: 120,
        left: 30,
    },
    albumSong: {
        padding: 5
    },
    songDuration: {
        flexDirection: 'row',
        position: 'absolute',
        right: 30
    }

});
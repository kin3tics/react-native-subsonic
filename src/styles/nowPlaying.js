import { StyleSheet } from 'react-native';
import { rgbDiff } from 'node-vibrant/lib/util';

export default StyleSheet.create({
    //Library Sidebar
    nowPlaying: {
        width: 250
    },
    mediaSection: {
        height: 250,
        width: 250,
        padding: 10
    },
    playlistSection: {

    },
    playlistHeader: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    playlistTrackCount: {
        padding: 10
    },
    songText: {
        fontWeight: 'bold'
    },
    artistText: {
        fontSize: 10
    },
    progressBar: {
        height: 10, 
        width: 150, 
        marginTop: 10,
        //marginBottom: 10,
    },
    //Fullscreen
    fs_main: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fs_menu: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10
    },
    fs_mediaSection: {
        height: 500,
        width: 500
    },
    fs_songText: {
        //paddingTop: 15,
        paddingBottom: 5,
        fontWeight: 'bold',
        fontSize: 20,
    },
    fs_artistText: {
        fontSize: 16,
    },
    fs_progressBar: {
        width: 350, 
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'rgba(127, 127, 127, 0.34)',
        borderRadius: 10
    },
    fs_visualizer: {
        zIndex: 0, 
        position: 'absolute',
        top: 0,
        left: 0
    }
});
import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import  { Text, View, TouchableWithoutFeedback, ImageBackground} from 'react-native'
import { useCompare } from '../../helpers/hooks';
import { getCoverArt } from '../../actions/library-actions';

import a_styles from '../../styles/artists';

const AlbumTileComponent = ({ album, backgroundColor, color, onPress, dispatch }) => {
    const [ coverArt, setCoverArt ] = useState();
    let albumHasChanged = useCompare(album.id);
    let albumArtHasChanged = useCompare(album.coverArt);
    useEffect(() => {
        if(albumHasChanged)
            setCoverArt(null);
        if(albumArtHasChanged && album.coverArt)
            dispatch(getCoverArt(album.coverArt, setCoverArt)); 
    })
    return (
        <TouchableWithoutFeedback
            onPress={() => onPress(album)}>
        <View style={[a_styles.albumListItem, { backgroundColor:  coverArt ? 'transparent' : backgroundColor }]}>
            {coverArt 
                ? (<ImageBackground 
                    resizeMode="contain"
                    style={{ height:125, width:125}}
                    source={{ uri: coverArt.data }} />)
                : (<Text style={{color:color, padding: 5}}>{album.name}</Text>)
            }
        </View>
        </TouchableWithoutFeedback>
    );
};

export default connect()(AlbumTileComponent);
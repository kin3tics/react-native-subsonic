import React, { useState } from 'react'
import  { Platform, View } from 'react-native'

import DesktopScreen from './screen-desktop';
import MobileScreen from './screen-mobile';

const DashboardScreen = () => {
    const isMobile = Platform.OS === "ios" || Platform.OS === "android";
    const [dimensions, setDimensions] = useState({width:0, height:0});

    return (
        <View onLayout={(event) => {
            const {x, y, width, height} = event.nativeEvent.layout;
            setDimensions({width:width, height:height});
        }}>
            { isMobile || dimensions.width < 1000 
                ? <MobileScreen dimensions={dimensions} />
                : <DesktopScreen dimensions={dimensions} />}
        </View>
    )
}

export default DashboardScreen;
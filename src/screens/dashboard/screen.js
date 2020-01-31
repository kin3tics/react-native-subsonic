import React, { useState } from 'react';
import  { Platform, View } from 'react-native';
import { withTheme } from '../../themeProvider';

import DesktopScreen from './screen-desktop';
import MobileScreen from './screen-mobile';

import styles from '../../styles/global';

const DashboardScreen = ({ theme }) => {
    const isMobile = Platform.OS === "ios" || Platform.OS === "android";
    const [dimensions, setDimensions] = useState({width:0, height:0});

    return (
        <View 
            style={[styles.container, { flexDirection:'row', backgroundColor: theme.background }]}
            onLayout={(event) => {
                const {x, y, width, height} = event.nativeEvent.layout;
                setDimensions({width:width, height:height});
            }}>
            { isMobile || dimensions.width < 1000 
                ? <MobileScreen dimensions={dimensions} />
                : <DesktopScreen dimensions={dimensions} />}
        </View>
    )
}

export default withTheme(DashboardScreen);
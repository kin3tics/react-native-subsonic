import React from 'react';
import { default as ArtistInfoDesktop } from './component';
import { default as ArtistInfoMobile } from './mobile-component';

const ArtistInfo = ({isMobile, width, height}) => {
    if(isMobile) return <ArtistInfoMobile width={width} height={height} />;
    return <ArtistInfoDesktop width={width} height={height} />;
};

export default ArtistInfo;


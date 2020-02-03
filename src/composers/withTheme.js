import React, { Component } from 'react';
import themes from '../styles/themes';

export default (ComposedComponent) => {
    class BaseScreenComposer extends Component {
        static navigationOptions = ({ navigation }) => {
            let headerType = navigation.getParam('headerType');
            if (headerType === 'none') {
              return { header: null }
            } else if (headerType === 'logo') {
              return { headerTitle: <HeaderTitle logo /> }
            } else if (headerType === 'text') {
                return { headerTitle: <HeaderTitle title={navigation.getParam('headerTitle')} /> }
            } else if (headerType === 'map') {
                let { ResortMapHeader } = require('../resort-map-header'); //I don't understand why this has to be here...or it all breaks
                return { headerTitle: <ResortMapHeader clickHandler={navigation.getParam('toggleView')} view={navigation.getParam('view')} /> }
            }
        }

        constructor(props, state) {
            super(props, state);
        }

        render() {
            return <><SecondaryMenuComponent {...this.props}/><ComposedComponent {...this.props} /></>
        }
    }
    return BaseScreenComposer;
}
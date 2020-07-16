import React from 'react';
import {
    StyleSheet,
} from 'react-native';

const style = StyleSheet.create({
    background: {
        backgroundColor: '#F3F6EF',
        flex: 1,
    },

    main: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        margin: 32,
        paddingTop: 32,
        // backgroundColor: 'lightgrey',
    },

    titleText: {
        fontFamily: 'Cardo-Bold',
        fontSize: 48,
        textAlign: 'left',
    },
});

export default style;
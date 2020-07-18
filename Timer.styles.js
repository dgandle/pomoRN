import React from 'react';
import {
    StyleSheet,
} from 'react-native';

const style = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 32,
    },

    titleText: {
        fontFamily: 'Cardo-Bold',
        fontSize: 48,
        textAlign: 'left',
        alignSelf: 'flex-start'
    },

    timerVisual: {
        backgroundColor: 'red',
    },

    buttonSequenceContainer: {
        alignSelf: 'stretch',
        justifyContent: 'space-between',
    },

    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
        padding: 32,
    },

    secondText: {
        fontSize: 25,
    },

    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        fontFamily: 'Cardo-Bold',
        fontSize: 22,
        color: '#6C9885',
    },
});

export default style;
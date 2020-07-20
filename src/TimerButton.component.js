import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const TimerButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{...styles.button, ...props.style}}>
                <Text style={{...styles.buttonText, ...props.textStyling }}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'Cardo-Bold',
        fontSize: 22,
        color: '#6C9885',
    }
})

export default TimerButton
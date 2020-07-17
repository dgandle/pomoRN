import React, { useState } from 'react'
import Animated, { Easing } from 'react-native-reanimated'
import {View, StyleSheet } from 'react-native';
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
  } from 'react-native-svg';

const TimerVisual = (props) => {

    const [transY, setTransY] = useState(0);

    const config = {
        duration: 500,
        toValue: 100,
        easing: Easing.inOut(Easing.ease)
    }

    const anim = Animated.timing(transY, config)

    const clipRect = (
        <Animated.View style={[styles.clipRect, { transform: [{ translateY: this.transX }] }]}/>
    )

    const innerCircle = (
        <Circle cx='160' cy='160' r='150' fill='#34454E' clipPath='url(#clip)'/>
    )

    const outerCircle = (
        <Circle cx='160' cy='160' r='154' stroke='#34454E' strokeWidth='3'/>
    )

    return (
        <View>
            <Svg style='element' height='320' width='320'>
                {innerCircle}
                {clipRect}
                {outerCircle}
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    clipRect: {
        width: 320,
        height: 100,
        backgroundColor: '#F3F6EF',
    }
})

export default TimerVisual
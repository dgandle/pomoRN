import React, { useState, useEffect, Component } from 'react'
import { Animated, Easing } from 'react-native';
import Svg, {
    Circle,
    ClipPath,
    Rect,
    Text
  } from 'react-native-svg';
import TimerStatus from './TimerStatus';

class Clipped extends Component {
    render() {
        switch (this.props.status) {
            case TimerStatus.STOPPED:
            case TimerStatus.ACTIVE:
            case TimerStatus.PAUSED_ACTIVE:
                return (
                    <Svg style='element' height='320' width='320'>
                        <Circle cx='160' cy='160' r='150' fill='#34454E' clipPath='url(#clip)'/>
                        <ClipPath id='clip'>
                            <Rect x='0' y={310 - this.props.clipHeight} width='320' height={this.props.clipHeight} />
                        </ClipPath>
                        <Circle cx='160' cy='160' r='154' stroke='#34454E' strokeWidth='3'/>
                    </Svg>
                )
            case TimerStatus.RESTING:
            case TimerStatus.PAUSED_RESTING:
                return (
                    <Svg style='element' height='320' width='320'>
                        <Circle cx='160' cy='160' r='150' fill='#34454E' clipPath='url(#clip)'/>
                        <ClipPath id='clip'>
                            <Rect x='0' y='10' width='320' height={this.props.clipHeight} />
                            <Text x='160' y='160' fontSize='17' fontFamily='Cormorant-BoldItalic' textAnchor='middle'>Take a break.</Text>
                        </ClipPath>
                        <Circle cx='160' cy='160' r='154' stroke='#34454E' strokeWidth='3'/>
                    </Svg>
                )
        }
    }
}

const AnimatedClipped = Animated.createAnimatedComponent(Clipped);

const TimerVisual = (props) => {

    const [progress] = useState(new Animated.Value(props.progress))

    useEffect(() => {
        Animated.timing(progress, {
            toValue: props.progress,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease)
        }).start()
    }, [props.progress])

    isResting = () => {
        switch (props.status) {
            case TimerStatus.RESTING:
            case TimerStatus.PAUSED_RESTING:
                return true;
            default:
                return false;
        }
    }

    const height = () => {
        switch (props.status) {
            case TimerStatus.STOPPED:
            case TimerStatus.ACTIVE:
            case TimerStatus.PAUSED_ACTIVE:
                return (progress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 300],
                }))
            case TimerStatus.RESTING:
            case TimerStatus.PAUSED_RESTING:
                return (progress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 300],
                }))
        }
    }

    return (
        <AnimatedClipped clipHeight={height()} status={props.status} />
    )
}

export default TimerVisual
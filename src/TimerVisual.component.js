import React, { useState, useEffect, Component } from 'react'
import { Animated, Easing, View, UIManager, LayoutAnimation } from 'react-native'
import Svg, { Circle, ClipPath, Rect, Text, TSpan } from 'react-native-svg'
import TimerStatus from './TimerStatus'

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

//  Would prefer to make this a functional component, but had to use a class because:
//      1)  SVG animation is not possible without first wrapping with createAnimatedComponent
//      2)  LayoutAnimation does not render 'delete' animations on android with useEffect, and likewise
//          componentDidUpdate(). Hence the use of UNSAFE_componentWillUpdate().
class Visual extends Component {
    constructor(props) {
        super(props);
        
        this.anim = {
            duration: 1000,
            create: {
                delay: 300,
                property: LayoutAnimation.Properties.opacity,
                type: LayoutAnimation.Types.linear,
            },
            delete: {
                duration: 300,
                property: LayoutAnimation.Properties.opacity,
                type: LayoutAnimation.Types.linear,
            },
        }
    }

    UNSAFE_componentWillUpdate(nextProps) {
        if (nextProps.status !== this.props.status) {
            LayoutAnimation.configureNext(this.anim)
        }
    }

    render() {
        return (
            <View>
                <Svg height='320' width='320' style={{position: "absolute"}}>
                    <Circle cx='160' cy='160' r='154' stroke='#34454E' strokeWidth='3'/>
                </Svg>
                <View>
                    {this.props.status == TimerStatus.STOPPED && (
                        <Svg height='320' width='320'>
                            <Text x='160' y='160' fontSize='17' fill='#797A77' fontFamily='Cormorant-BoldItalic' textAnchor='middle'>
                                <TSpan>It is recommended to turn on your</TSpan>
                                <TSpan x='160' dy='20'>device's “Do Not Disturb” mode.</TSpan>
                            </Text>
                        </Svg>
                    )}
                    {(this.props.status == TimerStatus.ACTIVE || this.props.status == TimerStatus.PAUSED_ACTIVE) && (
                        <Svg height='320' width='320'>
                            <Circle cx='160' cy='160' r='150' fill='#34454E' opacity={this.props.opacity} clipPath='url(#clip)'/>
                            <ClipPath id='clip'>
                                <Rect x='0' y={310 - this.props.clipHeight} width='320' height={this.props.clipHeight} />
                            </ClipPath>
                        </Svg>
                    )}
                    {(this.props.status == TimerStatus.RESTING || this.props.status == TimerStatus.PAUSED_RESTING) && (
                        <Svg height='320' width='320'>
                            <Circle cx='160' cy='160' r='150' fill='#34454E' opacity={this.props.opacity} clipPath='url(#clip)'/>
                            <ClipPath id='clip'>
                                <Rect x='0' y='10' width='320' height={this.props.clipHeight} />
                                <Text x='160' y='160' fontSize='17' fontFamily='Cormorant-BoldItalic' textAnchor='middle'>Take a break.</Text>
                            </ClipPath>
                        </Svg>
                    )}
                </View>
            </View>
        )
    }
}

const AnimatedVisual = Animated.createAnimatedComponent(Visual)

const TimerVisual = (props) => {

    const [progress] = useState(new Animated.Value(props.progress))
    const [opacity] = useState(new Animated.Value(1))

    useEffect(() => {
        Animated.timing(progress, {
            toValue: props.progress,
            duration: 100,
            useNativeDriver: false,
            easing: Easing.linear
        }).start()
    }, [props.progress])

    useEffect(() => {
        switch (props.status) {
            case TimerStatus.PAUSED_ACTIVE:
            case TimerStatus.PAUSED_RESTING:
                Animated.timing(opacity, {
                    toValue: 0.5,
                    duration: 300,
                    useNativeDriver: false,
                    easing: Easing.linear
                }).start()
                break;
            default:
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                    easing: Easing.linear
                }).start()
                break;
        } 
    }, [props.status])

    const height = () => {
        return (progress.interpolate({
            inputRange: [0, 1000],
            outputRange: [0, 300],
        }))
    }

    return (
        <AnimatedVisual status={props.status} clipHeight={height()} opacity={opacity}></AnimatedVisual>
    )
}

export default TimerVisual
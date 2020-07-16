import React, { useRef } from 'react';

import Button from 'react-native-button';
import Animated, { Easing } from 'react-native-reanimated';

import styles from './Timer.styles';

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.out(Easing.ease)
            }
        ).start();
    }, [fadeAnim])

    return (
        <Animated.View
            style={{
                ...props.style,
                opacity: fadeAnim,
                transform: [{
                    translateX: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [100, 0]
                    })
                }]
            }}
        >
            {props.children}
        </Animated.View>
    )
}

const TimerButton = (props) => {

    return (
        <FadeInView style={props.style}>
            <Button
                style={styles.button}
                onPress={props.onPress}>
                {props.title}
            </Button>
        </FadeInView>
    )
}

export default TimerButton;
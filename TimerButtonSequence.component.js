import React, { useState, useRef } from 'react'
import { View } from 'react-native'
import { Transitioning, Transition } from 'react-native-reanimated'
import styles from './Timer.styles';
import Button from 'react-native-button';
import TimerStatus from './TimerStatus';

const TimerButtonSequence = (props) => {
    // let [status, setStatus] = useState(TimerStatus.STOPPED);
    const ref = useRef()

    const transition = (
        <Transition.Sequence>
            <Transition.Together>
                <Transition.Out
                type="slide-left"
                durationMs={500}
                interpolation="easeOut"
                />
                <Transition.Out type="fade" durationMs={500} delayMs={0} />
                <Transition.In
                type="slide-right"
                durationMs={500}
                interpolation="easeOut"
                />
                <Transition.In type="fade" durationMs={500} delayMs={0} />
            </Transition.Together>
        </Transition.Sequence>
    );

    return (
        <Transitioning.View
            ref={ref}
            style={styles.container}
            transition={transition}>
                {props.status == TimerStatus.STOPPED && (
                    <View style={styles.buttonWrapper} key={props.status}>
                        <Button
                        style={styles.button}
                        onPress={() => {
                            ref.current.animateNextTransition();
                            // props.setStatus(TimerStatus.ACTIVE);
                            props.onPress();
                            }}
                        >
                            BEGIN →
                        </Button>
                    </View>
                )}
                {props.status == TimerStatus.ACTIVE && (
                    <View style={styles.buttonWrapper} key={props.status}>
                        <Button
                        style={styles.button}
                        onPress={() => {
                            ref.current.animateNextTransition();
                            // props.setStatus(TimerStatus.PAUSED);
                            props.onPress();
                            }}
                        >
                            PAUSE
                        </Button>
                    </View>
                )}
                {props.status == TimerStatus.RESTING && (
                    <View style={styles.buttonWrapper} key={props.status}>
                        <Button
                        style={styles.button}
                        onPress={() => {
                            ref.current.animateNextTransition();
                            // props.setStatus(TimerStatus.PAUSED);
                            props.onPress();
                            }}
                        >
                            PAUSE
                        </Button>
                    </View>
                )}
                {props.status == TimerStatus.PAUSED.ACTIVE && (
                    <View style={styles.buttonWrapper} key={props.status}>
                            <View style={styles.buttonContainer}>
                                <Button
                                    style={styles.button}
                                    onPress={() => {
                                        ref.current.animateNextTransition();
                                        // props.setStatus(TimerStatus.ACTIVE);
                                        props.onPress(false);
                                        }}
                                    >
                                    RESUME
                                </Button>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    style={styles.button}
                                    onPress={() => {
                                        ref.current.animateNextTransition();
                                        // props.setStatus(TimerStatus.STOPPED);
                                        props.onPress(true);
                                        }}
                                    >
                                    END
                                </Button>
                            </View>
                    </View>
                )}
                {props.status == TimerStatus.PAUSED.RESTING && (
                    <View style={styles.buttonWrapper} key={props.status}>
                            <View style={styles.buttonContainer}>
                                <Button
                                    style={styles.button}
                                    onPress={() => {
                                        ref.current.animateNextTransition();
                                        // props.setStatus(TimerStatus.ACTIVE);
                                        props.onPress(false);
                                        }}
                                    >
                                    RESUME
                                </Button>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    style={styles.button}
                                    onPress={() => {
                                        ref.current.animateNextTransition();
                                        // props.setStatus(TimerStatus.STOPPED);
                                        props.onPress(true);
                                        }}
                                    >
                                    END
                                </Button>
                            </View>
                    </View>
                )}
        </Transitioning.View>
    )
}

export default TimerButtonSequence;
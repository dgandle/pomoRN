import React from 'react'
import styles from './Timer.styles';
import TimerStatus from './TimerStatus';
import TimerButton from './TimerButton.component';
import { View } from 'react-native'

const TimerButtonSequence = (props) => {
    return (
        <View
            style={styles.buttonSequenceContainer}>
                {props.status == TimerStatus.STOPPED && (
                    <View style={styles.buttonWrapper}>
                        <TimerButton
                        onPress={props.onPress}
                        >
                            BEGIN  →
                        </TimerButton>
                    </View>
                )}
                {(props.status == TimerStatus.ACTIVE || props.status == TimerStatus.RESTING) && (
                    <View style={styles.buttonWrapper}>
                        <TimerButton
                        onPress={props.onPress}
                        >
                            PAUSE
                        </TimerButton>
                    </View>
                )}
                {props.status == TimerStatus.PAUSED_ACTIVE && (
                    <View style={styles.buttonWrapper}>
                            <View style={styles.buttonContainer}>
                                <TimerButton
                                    onPress={() => {
                                        props.onPress(false);
                                        }}
                                    >
                                    RESUME
                                </TimerButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TimerButton
                                    onPress={() => {
                                        props.onPress(true);
                                        }}
                                    >
                                    END
                                </TimerButton>
                            </View>
                    </View>
                )}
                {props.status == TimerStatus.PAUSED_RESTING && (
                    <View style={styles.buttonWrapper}>
                            <View style={styles.buttonContainer}>
                                <TimerButton
                                    onPress={() => {
                                        props.onPress(false);
                                        }}
                                    >
                                    RESUME
                                </TimerButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TimerButton
                                    onPress={() => {
                                        props.onPress(true);
                                        }}
                                    >
                                    END
                                </TimerButton>
                            </View>
                    </View>
                )}
        </View>
    )
}

export default TimerButtonSequence;
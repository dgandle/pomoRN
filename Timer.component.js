import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';
import Button from 'react-native-button';
import BackgroundTimer from 'react-native-background-timer';

import styles from './Timer.styles';

const Timer = () => {

    const timerStatus = {
        STOPPED: 'stopped',
        ACTIVE: 'active',
        RESTING: 'resting',
        PAUSED: 'paused'
    }

    const [count, setCount] = useState(0);
    const [status, setStatus] = useState(timerStatus.STOPPED)

    onStart = () => {
        setStatus(timerStatus.ACTIVE);
        BackgroundTimer.runBackgroundTimer(() => {
            updateTimer();
        }, 1000);
    }
    
    onPause = () => {
        BackgroundTimer.stopBackgroundTimer();
        setStatus(timerStatus.PAUSED)
    }
    
    onStop = () => {
        BackgroundTimer.stopBackgroundTimer();
        setStatus(timerStatus.STOPPED)
        setCount(0);
    }

    onResume = () => {
        setStatus(timerStatus.ACTIVE);
        BackgroundTimer.runBackgroundTimer(() => {
            updateTimer();
        }, 1000);
    }

    updateTimer = () => {
        setCount(count + 1);
        switch (status) {
            case timerStatus.ACTIVE:
                if (count >= 10) {
                    setCount(0)
                    setStatus(timerStatus.RESTING)
                }
                break;
            case timerStatus.RESTING:
                if (count >= 5) { 
                    setCount(0)
                    setStatus(timerStatus.ACTIVE)
                }
                break;
        }
    }
    
    // Rendering

    renderButtons = () => {
        switch (status) {
            case timerStatus.STOPPED:
                return (renderStartButton());
                break;
            case timerStatus.ACTIVE:
            case timerStatus.RESTING:
                return (renderPauseButton());
                break;
            case timerStatus.PAUSED:
                return (renderResumeStopButtons());
                break;
        }
    }
    
    renderStartButton = () => {
        return (
            <View style={styles.buttonWrapper}>
                <Button
                    style={styles.button}
                    onPress={onStart}>
                    BEGIN
                </Button>
            </View>
        )
    }
    
    renderPauseButton = () => {
        return (
            <View style={styles.buttonWrapper}>
                <Button
                    style={styles.button}
                    onPress={onPause}>
                    PAUSE
                </Button>
            </View>
        )
    }

    renderResumeStopButtons = () => {
        return (
            <View style={styles.buttonWrapper}>
                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.button}
                        onPress={onResume}>
                        RESUME
                    </Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.button}
                        onPress={onStop}>
                        END
                    </Button>
                </View>
            </View>
        )
    }
    
    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.secondText}>{count}</Text>
                {renderButtons()}
            </View>
        )
    }

    return (
        render()
    );
}

export default Timer;
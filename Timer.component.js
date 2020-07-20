import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import SplashScreen from 'react-native-splash-screen';

import TimerStatus from './TimerStatus';
import TimerButtonSequence from './TimerButtonSequence.component';

import styles from './Timer.styles';
import TimerVisual from './TimerVisual.component';

const Timer = () => {

    const [count, setCount] = useState(0);
    const [status, setStatus] = useState(TimerStatus.STOPPED)

    const activeMinutes = 25
    const restingMinutes = 5

    useEffect(() => {
        SplashScreen.hide()
    })

    startTimer = (newStatus) => {
        setStatus(newStatus)
        BackgroundTimer.runBackgroundTimer(() => {
            updateCount();
        }, 100);
    }
    
    pauseTimer = (newStatus) => {
        setStatus(newStatus)
        BackgroundTimer.stopBackgroundTimer();
    }
    
    resetTimer = () => {
        setStatus(TimerStatus.STOPPED)
        BackgroundTimer.stopBackgroundTimer();
        setCount(0);
    }

    updateCount = () => {
        setCount(count + 1);
        switch (status) {
            case TimerStatus.ACTIVE:
                if (count >= activeMinutes * 60 * 10) {
                    setCount(0)
                    setStatus(TimerStatus.RESTING)
                }
                break;
            case TimerStatus.RESTING:
                if (count >= restingMinutes * 60 * 10) { 
                    setCount(0)
                    setStatus(TimerStatus.ACTIVE)
                }
                break;
        }
    }

    onSequencePress = (stopped) => {
        switch (status) {
            case TimerStatus.STOPPED:
                startTimer(TimerStatus.ACTIVE)
                break;
            case TimerStatus.ACTIVE:
                pauseTimer(TimerStatus.PAUSED_ACTIVE)
                break;
            case TimerStatus.RESTING:
                pauseTimer(TimerStatus.PAUSED_RESTING)
                break;
            case TimerStatus.PAUSED_ACTIVE:
                stopped ? resetTimer() : startTimer(TimerStatus.ACTIVE)
                break;
            case TimerStatus.PAUSED_RESTING:
                stopped ? resetTimer() : startTimer(TimerStatus.RESTING)
                break;
        }
    }

    convertCountToProgress = () => {
        switch (status) {
            case TimerStatus.STOPPED:
            case TimerStatus.ACTIVE:
            case TimerStatus.PAUSED_ACTIVE:
                return (count * (100/(activeMinutes*60)))
            case TimerStatus.RESTING:
            case TimerStatus.PAUSED_RESTING:
                return (count * (100/(restingMinutes*60)))
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Pomo.</Text>
            <TimerVisual style={styles.timerVisual} progress={convertCountToProgress()} status={status} />
            <TimerButtonSequence status={status} onPress={onSequencePress}/>
        </View>
    );
}

export default Timer;
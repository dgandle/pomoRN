import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Svg, {
    Circle,
    Ellipse,
    G,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
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

import TimerStatus from './TimerStatus';
import TimerButtonSequence from './TimerButtonSequence.component';

import styles from './Timer.styles';
import TimerVisual from './TimerVisual.component';

const Timer = () => {

    const [count, setCount] = useState(0);
    const [status, setStatus] = useState(TimerStatus.STOPPED)

    startTimer = (status) => {
        setStatus(status)
        BackgroundTimer.runBackgroundTimer(() => {
            updateCount();
        }, 1000);
    }
    
    pauseTimer = (status) => {
        setStatus(status)
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
                if (count >= 10) {
                    setCount(0)
                    setStatus(TimerStatus.RESTING)
                }
                break;
            case TimerStatus.RESTING:
                if (count >= 5) { 
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
                pauseTimer(TimerStatus.PAUSED.ACTIVE)
            case TimerStatus.RESTING:
                pauseTimer(TimerStatus.PAUSED.RESTING)
                break;
            case TimerStatus.PAUSED.ACTIVE:
                stopped ? resetTimer() : startTimer(TimerStatus.ACTIVE)
                break;
            case TimerStatus.PAUSED.RESTING:
                stopped ? resetTimer() : startTimer(TimerStatus.RESTING)
                break;
        }
    }
    
    // Rendering

    renderButtons = () => {
        return (
            <TimerButtonSequence status={status} setStatus={setStatus} onPress={onSequencePress}/>
        )
    }
    
    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.secondText}>{count}</Text>
                <TimerVisual />
                {renderButtons()}
            </View>
        )
    }

    return (
        render()
    );
}

export default Timer;
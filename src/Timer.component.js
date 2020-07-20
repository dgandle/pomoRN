import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
import SplashScreen from 'react-native-splash-screen'
import Sound from 'react-native-sound'

import TimerStatus from './TimerStatus'
import TimerButton from './TimerButton.component'
import TimerVisual from './TimerVisual.component'

import styles from './Timer.styles'

const Timer = () => {

    const [count, setCount] = useState(0);
    const [status, setStatus] = useState(TimerStatus.STOPPED)

    const activeMinutes = 1/6
    const restingMinutes = 1/6

    var marimbaHigh = new Sound('marimba-high.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('Failed to load sound marimba-high.mp3', error)
            return
        }
    })

    var marimbaLow = new Sound('marimba-low.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('Failed to load sound marimba-low.mp3', error)
            return
        }
    })

    marimbaHigh.setVolume(0.5)
    marimbaLow.setVolume(0.5)

    useEffect(() => {
        SplashScreen.hide()
        Sound.setCategory('Playback')
    }, [])

    useEffect(() => {
        updateTimer()
    }, [status])

    updateTimer = () => {
        switch(status) {
            case TimerStatus.STOPPED:
                BackgroundTimer.stopBackgroundTimer()
                setCount(0)
                break
            case TimerStatus.ACTIVE:
            case TimerStatus.RESTING:
                BackgroundTimer.stopBackgroundTimer()
                BackgroundTimer.runBackgroundTimer(async () => {
                    updateCount()
                }, 100)
                break
            case TimerStatus.PAUSED_ACTIVE:
            case TimerStatus.PAUSED_RESTING:
                BackgroundTimer.stopBackgroundTimer();
                break
        }
    }

    updateCount = () => {
        setCount(count + 1)
        switch (status) {
            case TimerStatus.ACTIVE:
                if (count >= activeMinutes * 60 * 10) {
                    setCount(0)
                    setStatus(TimerStatus.RESTING)
                    marimbaHigh.play()
                }
                break
            case TimerStatus.RESTING:
                if (count >= restingMinutes * 60 * 10) { 
                    setCount(0)
                    setStatus(TimerStatus.ACTIVE)
                    marimbaLow.play()
                }
                break
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
            <View style={styles.buttonSequenceContainer}>
                    {status == TimerStatus.STOPPED && (
                        <View style={styles.buttonWrapper}>
                            <TimerButton
                            onPress={() => {
                                setStatus(TimerStatus.ACTIVE)
                                }}
                            >
                                BEGIN  →
                            </TimerButton>
                        </View>
                    )}
                    {(status == TimerStatus.ACTIVE || status == TimerStatus.RESTING) && (
                        <View style={styles.buttonWrapper}>
                            <TimerButton
                            onPress={() => {
                                setStatus(status == TimerStatus.ACTIVE ? TimerStatus.PAUSED_ACTIVE : TimerStatus.PAUSED_RESTING)
                                }}
                            >
                                PAUSE
                            </TimerButton>
                        </View>
                    )}
                    {(status == TimerStatus.PAUSED_ACTIVE || status == TimerStatus.PAUSED_RESTING) && (
                        <View style={styles.buttonWrapper}>
                                <View style={styles.buttonContainer}>
                                    <TimerButton
                                        onPress={() => {
                                            setStatus(status == TimerStatus.PAUSED_ACTIVE ? TimerStatus.ACTIVE : TimerStatus.RESTING)
                                            }}
                                        >
                                        RESUME
                                    </TimerButton>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TimerButton
                                        onPress={() => {
                                            setStatus(TimerStatus.STOPPED)
                                            }}
                                        >
                                        END
                                    </TimerButton>
                                </View>
                        </View>
                    )}
            </View>
        </View>
    )
}

export default Timer
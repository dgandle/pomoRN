![](./assets/images/pomo-wordmark.png "Pomo.")
###### An elegant productivity timer, built in React Native.

### About
The [Pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) is a productivity method which breaks down work into short, 25-minute chunks with 5-minute breaks between. **Pomo.** is a lightweight and extremely minimal timer which follows the Pomodoro technique 25/5 structure. There are many other Pomodoro timers available on the app store, but they're often buggy or suffer from feature bloat.

**Pomo.** was created as a hobby project so I could learn React Native, from initial app creeation through to public release. It can be found on both the [App Store]() and [Google Play Store](). _TODO: Add links._

### Known Issues
- On Android, the "Resume" button does not fade out.
- On Android, the "Take a break." text does not properly invert as the timer animation passes through it.
- On iOS, the background timer stops after 30 seconds. This is due to the way React Native uses dispatch queues (more info [here](https://github.com/ocetnik/react-native-background-timer/issues/222#issuecomment-628782753)), and fixing it will likely require a very involved work-around with native modules.

### Future Features
- Local push notifications for when the timer ends. Currently **blocked** by the background timer issue on iOS, will likely be implemented in the same native module.
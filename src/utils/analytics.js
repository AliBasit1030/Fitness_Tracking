import * as Analytics from 'expo-firebase-analytics'

export const trackWorkoutStarted = async () => {
  await Analytics.logEvent('workout_started')
}

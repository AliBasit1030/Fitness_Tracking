import React, { useState } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { firestore } from '../services/api'
import { useNavigation } from '@react-navigation/native'

export default function ActiveWorkoutScreen() {
  const [sessionActive, setSessionActive] = useState(false)
  const [exercises, setExercises] = useState([])
  const [exercise, setExercise] = useState({ name: '', sets: '', reps: '', weight: '' })
  const [timer, setTimer] = useState(0)
  const [intervalId, setIntervalId] = useState(null)
  const navigation = useNavigation()

  const startSession = () => {
    setSessionActive(true)
    setTimer(0)
    const id = setInterval(() => setTimer(t => t + 1), 1000)
    setIntervalId(id)
  }

  const stopSession = async () => {
    clearInterval(intervalId)
    setSessionActive(false)
    await firestore().collection('workouts').add({ exercises, duration: timer, started_at: new Date() })
    setExercises([])
    setTimer(0)
    navigation.navigate('History')
  }

  const addExercise = () => {
    setExercises([...exercises, exercise])
    setExercise({ name: '', sets: '', reps: '', weight: '' })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Workout</Text>
      <View style={styles.timerBox}>
        <Text style={styles.timerLabel}>Timer</Text>
        <Text style={styles.timer}>{timer}s</Text>
      </View>
      {sessionActive ? (
        <>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Add Exercise</Text>
            <TextInput placeholder="Name" value={exercise.name} onChangeText={v => setExercise({ ...exercise, name: v })} style={styles.input} />
            <View style={styles.rowInputs}>
              <TextInput placeholder="Sets" value={exercise.sets} onChangeText={v => setExercise({ ...exercise, sets: v })} style={[styles.input, styles.inputSmall]} keyboardType="numeric" />
              <TextInput placeholder="Reps" value={exercise.reps} onChangeText={v => setExercise({ ...exercise, reps: v })} style={[styles.input, styles.inputSmall]} keyboardType="numeric" />
              <TextInput placeholder="Weight" value={exercise.weight} onChangeText={v => setExercise({ ...exercise, weight: v })} style={[styles.input, styles.inputSmall]} keyboardType="numeric" />
            </View>
            <TouchableOpacity style={styles.button} onPress={addExercise}>
              <Text style={styles.buttonText}>Add Exercise</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={exercises}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.exerciseItem}>
                <Text style={styles.exerciseText}>{item.name} | {item.sets}x{item.reps} | {item.weight}kg</Text>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No exercises added yet.</Text>}
            style={{ marginVertical: 12 }}
          />
          <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopSession}>
            <Text style={[styles.buttonText, styles.stopButtonText]}>Stop Session</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={startSession}>
          <Text style={styles.buttonText}>Start Session</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fab6',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222f3e',
    marginBottom: 18,
    alignSelf: 'center',
  },
  timerBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  timerLabel: {
    fontSize: 15,
    color: '#8395a7',
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222f3e',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222f3e',
  },
  input: {
    backgroundColor: '#f7f8fa',
    borderWidth: 1,
    borderColor: '#d1d8e0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    flex: 1,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  inputSmall: {
    flex: 0.32,
    marginRight: 0,
  },
  button: {
    backgroundColor: '#222f3e',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stopButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ee5253',
    marginTop: 16,
  },
  stopButtonText: {
    color: '#ee5253',
  },
  exerciseItem: {
    backgroundColor: '#f7f8fa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  exerciseText: {
    fontSize: 16,
    color: '#222f3e',
  },
  emptyText: {
    color: '#8395a7',
    fontSize: 15,
    alignSelf: 'center',
    marginVertical: 8,
  },
})

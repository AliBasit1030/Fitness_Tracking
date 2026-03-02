import React from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useGetWorkoutsQuery } from '../store/workoutsApi'

export default function WorkoutHistoryScreen() {
  const [workouts, setWorkouts] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const fetchWorkouts = async () => {
    setLoading(true)
    const snapshot = await firestore().collection('workouts').orderBy('started_at', 'desc').limit(10).get()
    setWorkouts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    setLoading(false)
  }

  React.useEffect(() => {
    fetchWorkouts()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={fetchWorkouts} disabled={loading}>
        <Text style={styles.refreshButtonText}>{loading ? 'Refreshing...' : 'Refresh'}</Text>
      </TouchableOpacity>
      <FlatList
        data={workouts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.started_at ? new Date(item.started_at).toLocaleString() : 'Unknown Date'}</Text>
            <Text style={styles.cardDetail}>Duration: <Text style={styles.cardDetailValue}>{item.duration}s</Text></Text>
            <Text style={styles.cardDetail}>Exercises: <Text style={styles.cardDetailValue}>{item.exercises?.length ?? 0}</Text></Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No workout history yet.</Text>}
        style={{ marginTop: 12 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222f3e',
    marginBottom: 18,
    alignSelf: 'center',
  },
  refreshButton: {
    backgroundColor: '#222f3e',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222f3e',
    marginBottom: 6,
  },
  cardDetail: {
    fontSize: 15,
    color: '#576574',
    marginBottom: 2,
  },
  cardDetailValue: {
    color: '#222f3e',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#8395a7',
    fontSize: 15,
    alignSelf: 'center',
    marginVertical: 16,
  },
})

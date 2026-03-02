import React, { useState } from 'react'
import { View, TextInput, Text, ActivityIndicator, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { auth } from '../services/api'

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAuth = async (type) => {
    setLoading(true)
    setError('')
    try {
      if (type === 'login') {
        await auth().signInWithEmailAndPassword(email, password)
      } else {
        await auth().createUserWithEmailAndPassword(email, password)
      }
      navigation.replace('Main')
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.inner}>
        <Text style={styles.title}>Fitness Tracker</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {loading ? <ActivityIndicator style={{ marginVertical: 16 }} /> : (
          <>
            <TouchableOpacity style={styles.button} onPress={() => handleAuth('login')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => handleAuth('signup')}>
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    justifyContent: 'center',
  },
  inner: {
    marginHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222f3e',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d8e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f7f8fa',
  },
  button: {
    width: '100%',
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
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#222f3e',
  },
  secondaryButtonText: {
    color: '#222f3e',
  },
  error: {
    color: '#ee5253',
    marginBottom: 8,
    fontSize: 15,
  },
})

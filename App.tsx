import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Placeholder home screen for the skeleton (issue #2).
// Real screens follow the sketches in docs/design/ and arrive in their own issues.
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gofio</Text>
      <Text style={styles.tagline}>Fuel. Train. Track.</Text>
      <Text style={styles.note}>App skeleton: screens coming soon.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#2b2b2b',
  },
  tagline: {
    marginTop: 8,
    fontSize: 18,
    color: '#b07a3a',
  },
  note: {
    marginTop: 32,
    fontSize: 14,
    color: '#8a8a8a',
  },
});

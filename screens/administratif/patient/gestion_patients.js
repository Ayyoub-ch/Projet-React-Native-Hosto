import { View, Text, StyleSheet } from "react-native";

export default function Gestion_Patients() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Patients</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
  },
});

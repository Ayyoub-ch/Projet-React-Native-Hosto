import { View, Text, StyleSheet } from "react-native";

export default function Gestion_Arrivées_Patients() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des arrivées des patients</Text>
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
    textAlign: "center",
  },
});

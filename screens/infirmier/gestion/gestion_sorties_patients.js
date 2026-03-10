import { View, Text, StyleSheet } from "react-native";

export default function Gestion_Sorties_Patients() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des sorties des patients</Text>
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

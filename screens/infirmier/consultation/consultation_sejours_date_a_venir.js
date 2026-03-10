import { View, Text, StyleSheet } from "react-native";

export default function Consultation_Séjours_Date_À_Venir() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultation des séjours à venir</Text>
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

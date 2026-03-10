import { View, Text, StyleSheet } from "react-native";

export default function Infirmier() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infirmier</Text>
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

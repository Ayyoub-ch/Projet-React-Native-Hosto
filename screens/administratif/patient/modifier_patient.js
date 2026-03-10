import { View, Text, StyleSheet } from "react-native";

export default function Modifier_Patient() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un patient</Text>
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

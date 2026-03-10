import { View, Text, StyleSheet } from "react-native";

export default function InfirmierConsultation() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 900;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accueil</Text>

      <View style={[styles.buttonRow, isSmallScreen && styles.buttonColumn]}>
        <Pressable
          style={({ pressed }) => [styles.bigButton, pressed && styles.bigButtonPressed]}
          onPress={() => navigation.navigate("consultation_sejours_date")}
        >
          <Text style={styles.bigButtonText}>Consultation des séjours à une date donnée</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.bigButton, pressed && styles.bigButtonPressed]}
          onPress={() => navigation.navigate("consultation_sejours_date_debut")}
        >
          <Text style={styles.bigButtonText}>Consultation des séjours commençant à une date donnée</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.bigButton, pressed && styles.bigButtonPressed]}
          onPress={() => navigation.navigate("consultation_sejours_date_a_venir")}
        >
          <Text style={styles.bigButtonText}>Consultation des séjours à venir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
    bottom: 90,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  buttonColumn: {
    flexDirection: "column",
    width: "100%",
  },
  bigButton: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: "#000",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  bigButtonPressed: {
    backgroundColor: "#666",
    borderColor: "#666",
  },
  bigButtonText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
});

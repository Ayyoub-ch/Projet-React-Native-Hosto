import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

export default function Detail_Patient({ navigation, route }) {
  const patient = route?.params?.patient || {};

  const localite = patient.localite || "N/A";

  const details = [
    { label: "ID", value: patient.id ?? "N/A" },
    { label: "Nom", value: patient.nom || "N/A" },
    { label: "Prenom", value: patient.prenom || "N/A" },
    { label: "Telephone", value: patient.telephone || "N/A" },
    { label: "Sexe", value: patient.sexe || "N/A" },
    { label: "Note", value: patient.note || "-" },
    { label: "Localite", value: localite },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.actionCard]}>
        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnSecondary, pressed && styles.btnSecondaryPressed]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnTextLight}>Retour</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Detail du patient</Text>
        </View>

        <ScrollView contentContainerStyle={styles.cardBody}>
          <View style={styles.tableWrap}>
            <View style={styles.table}>
              {details.map((item, index) => (
                <View key={item.label} style={[styles.tableRow, index === details.length - 1 && styles.lastRow]}>
                  <Text style={[styles.cell, styles.labelCell]}>{item.label}</Text>
                  <Text style={[styles.cell, styles.valueCell]}>{String(item.value)}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f3f4f6",
  },
  card: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionCard: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  cardHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  cardBody: {
    padding: 16,
    alignItems: "center",
  },
  tableWrap: {
    width: "100%",
    maxWidth: 700,
  },
  table: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  cell: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    color: "#1f2937",
    fontSize: 14,
  },
  labelCell: {
    width: 140,
    fontWeight: "700",
    backgroundColor: "#f9fafb",
    color: "#111827",
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },
  valueCell: {
    flex: 1,
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  btnSecondary: {
    backgroundColor: "#6c757d",
    borderColor: "#6c757d",
  },
  btnSecondaryPressed: {
    backgroundColor: "#5c636a",
    borderColor: "#5c636a",
  },
  btnTextLight: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});

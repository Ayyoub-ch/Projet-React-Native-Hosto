import { useCallback, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const API_BASE_URL = "http://192.168.1.112:3000";

export default function Gestion_Patients({ navigation }) {
  const [patients, setPatients] = useState([]);

  const loadPatients = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/patients`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Impossible de charger les patients");
      }

      setPatients(data.patients || []);
    } catch (err) {
      Alert.alert("Erreur", err?.message || "Erreur de chargement des patients");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPatients();
    }, [loadPatients])
  );

  const removePatient = (id) => {
    Alert.alert("Suppression", "Supprimer definitivement ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
              method: "DELETE",
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
              throw new Error(data.message || "Suppression impossible");
            }

            setPatients((prev) => prev.filter((p) => p.id !== id));
            Alert.alert("Succes", "Patient supprime");
          } catch (err) {
            Alert.alert("Erreur", err?.message || "Erreur lors de la suppression");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.actionCard]}>
        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnSecondary, pressed && styles.btnSecondaryPressed]}
          onPress={() => navigation.navigate("administratif")}
        >
          <Text style={styles.btnTextLight}>Retour</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnPrimary, pressed && styles.btnPrimaryPressed]}
          onPress={() => navigation.navigate("ajouter_patient")}
        >
          <Text style={styles.btnTextLight}>Ajouter un patient</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Liste des patients</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeadRow]}>
              <Text style={[styles.cell, styles.headCell, styles.wId]}>ID</Text>
              <Text style={[styles.cell, styles.headCell, styles.wNom]}>Nom</Text>
              <Text style={[styles.cell, styles.headCell, styles.wPrenom]}>Prenom</Text>
              <Text style={[styles.cell, styles.headCell, styles.wPhone]}>Telephone</Text>
              <Text style={[styles.cell, styles.headCell, styles.wSexe]}>Sexe</Text>
              <Text style={[styles.cell, styles.headCell, styles.wNote]}>Note</Text>
              <Text style={[styles.cell, styles.headCell, styles.wLoc]}>Localite</Text>
              <Text style={[styles.cell, styles.headCell, styles.wActions]}>Actions</Text>
            </View>

            <ScrollView style={styles.tableBodyScroll} nestedScrollEnabled>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <View key={patient.id} style={styles.tableRow}>
                    <Text style={[styles.cell, styles.wId]}>{patient.id}</Text>
                    <Text style={[styles.cell, styles.wNom]}>{patient.nom}</Text>
                    <Text style={[styles.cell, styles.wPrenom]}>{patient.prenom}</Text>
                    <Text style={[styles.cell, styles.wPhone]}>{patient.telephone}</Text>
                    <Text style={[styles.cell, styles.wSexe]}>{patient.sexe}</Text>
                    <Text style={[styles.cell, styles.wNote]}>{patient.note}</Text>
                    <Text style={[styles.cell, styles.wLoc]}>{patient.localite}</Text>

                    <View style={[styles.cell, styles.wActions, styles.actionsCell]}>
                      <Pressable
                        style={({ pressed }) => [styles.btn, styles.btnOutlinePrimary, pressed && styles.btnPrimaryPressed]}
                        onPress={() => navigation.navigate("modifier_patient", { patient })}
                      >
                        <Text style={styles.btnTextPrimary}>Modifier</Text>
                      </Pressable>

                      <Pressable
                        style={({ pressed }) => [styles.btn, styles.btnOutlineDanger, pressed && styles.btnDangerPressed]}
                        onPress={() => removePatient(patient.id)}
                      >
                        <Text style={styles.btnTextDanger}>Supprimer</Text>
                      </Pressable>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyRow}>
                  <Text style={styles.emptyText}>Aucun patient trouve</Text>
                </View>
              )}
            </ScrollView>
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
  table: {
    minWidth: 1080,
  },
  tableBodyScroll: {
    maxHeight: 360,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  tableHeadRow: {
    backgroundColor: "#f9fafb",
    borderBottomWidth: 2,
    borderBottomColor: "#d1d5db",
  },
  cell: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    color: "#1f2937",
    fontSize: 14,
  },
  headCell: {
    fontWeight: "700",
    color: "#111827",
  },
  wId: {
    width: 64,
  },
  wNom: {
    width: 120,
  },
  wPrenom: {
    width: 120,
  },
  wPhone: {
    width: 130,
  },
  wSexe: {
    width: 80,
  },
  wNote: {
    width: 210,
  },
  wLoc: {
    width: 200,
  },
  wActions: {
    width: 230,
  },
  actionsCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  btnPrimary: {
    backgroundColor: "#0d6efd",
    borderColor: "#0d6efd",
  },
  btnPrimaryPressed: {
    backgroundColor: "#0b5ed7",
    borderColor: "#0b5ed7",
  },
  btnSecondary: {
    backgroundColor: "#6c757d",
    borderColor: "#6c757d",
  },
  btnSecondaryPressed: {
    backgroundColor: "#5c636a",
    borderColor: "#5c636a",
  },
  btnOutlinePrimary: {
    borderColor: "#0d6efd",
    backgroundColor: "#ffffff",
  },
  btnOutlineDanger: {
    borderColor: "#dc3545",
    backgroundColor: "#ffffff",
  },
  btnDangerPressed: {
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
  },
  btnTextLight: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  btnTextPrimary: {
    color: "#0d6efd",
    fontSize: 13,
    fontWeight: "600",
  },
  btnTextDanger: {
    color: "#dc3545",
    fontSize: 13,
    fontWeight: "600",
  },
  emptyRow: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 14,
  },
});

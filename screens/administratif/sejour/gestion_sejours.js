import { useCallback, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const API_BASE_URL = "http://192.168.1.203:3000";

function formatDate(isoDate) {
  if (!isoDate) {
    return "N/A";
  }

  const datePart = String(isoDate).split("T")[0];
  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) {
    return String(isoDate);
  }

  return `${day}/${month}/${year}`;
}

export default function Gestion_Séjours({ navigation }) {
  const [sejours, setSejours] = useState([]);

  const loadSejours = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sejours`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Impossible de charger les sejours");
      }

      setSejours(data.sejours || []);
    } catch (err) {
      Alert.alert("Erreur", err?.message || "Erreur de chargement des sejours");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSejours();
    }, [loadSejours])
  );

  const removeSejour = (id) => {
    Alert.alert("Suppression", "Supprimer definitivement ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/sejours/${id}`, {
              method: "DELETE",
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
              throw new Error(data.message || "Suppression impossible");
            }

            setSejours((prev) => prev.filter((s) => s.id !== id));
            Alert.alert("Succes", "Sejour supprime");
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
          onPress={() => navigation.navigate("ajouter_sejour")}
        >
          <Text style={styles.btnTextLight}>Ajouter un sejour</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Liste des sejours</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeadRow]}>
              <Text style={[styles.cell, styles.headCell, styles.wDate]}>Date d'entree</Text>
              <Text style={[styles.cell, styles.headCell, styles.wDate]}>Date sortie</Text>
              <Text style={[styles.cell, styles.headCell, styles.wLibelle]}>Libelle</Text>
              <Text style={[styles.cell, styles.headCell, styles.wStatut]}>Statut du jour</Text>
              <Text style={[styles.cell, styles.headCell, styles.wPatient]}>Patient</Text>
              <Text style={[styles.cell, styles.headCell, styles.wChambre]}>Chambre</Text>
              <Text style={[styles.cell, styles.headCell, styles.wEtage]}>Etage</Text>
              <Text style={[styles.cell, styles.headCell, styles.wActions]}>Actions</Text>
            </View>

            <ScrollView style={styles.tableBodyScroll} nestedScrollEnabled>
              {sejours.length > 0 ? (
                sejours.map((sejour) => (
                  <View key={sejour.id} style={styles.tableRow}>
                    <Text style={[styles.cell, styles.wDate]}>{formatDate(sejour.dateEntree)}</Text>
                    <Text style={[styles.cell, styles.wDate]}>{formatDate(sejour.dateSortie)}</Text>
                    <Text style={[styles.cell, styles.wLibelle]}>{sejour.libelle}</Text>
                    <Text style={[styles.cell, styles.wStatut]}>{sejour.statutDuJour}</Text>
                    <Text style={[styles.cell, styles.wPatient]}>{sejour.patient}</Text>
                    <Text style={[styles.cell, styles.wChambre]}>{sejour.chambre}</Text>
                    <Text style={[styles.cell, styles.wEtage]}>{sejour.etage}</Text>

                    <View style={[styles.cell, styles.wActions, styles.actionsCell]}>
                      <Pressable
                        style={({ pressed }) => [styles.btn, styles.btnOutlinePrimary, pressed && styles.btnPrimaryPressed]}
                        onPress={() => navigation.navigate("modifier_sejour", { sejour })}
                      >
                        <Text style={styles.btnTextPrimary}>Modifier</Text>
                      </Pressable>

                      <Pressable
                        style={({ pressed }) => [styles.btn, styles.btnOutlineDanger, pressed && styles.btnDangerPressed]}
                        onPress={() => removeSejour(sejour.id)}
                      >
                        <Text style={styles.btnTextDanger}>Supprimer</Text>
                      </Pressable>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyRow}>
                  <Text style={styles.emptyText}>Aucun sejour trouve</Text>
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
    minWidth: 1100,
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
  wDate: {
    width: 125,
  },
  wLibelle: {
    width: 210,
  },
  wStatut: {
    width: 140,
  },
  wPatient: {
    width: 170,
  },
  wChambre: {
    width: 110,
  },
  wEtage: {
    width: 80,
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

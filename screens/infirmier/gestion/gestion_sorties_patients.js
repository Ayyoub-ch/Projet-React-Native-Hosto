import { useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const API_BASE_URL = "http://192.168.1.112:3000";

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

function getDatePart(isoDate) {
  return String(isoDate || "").split("T")[0];
}

function isToday(isoDate) {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return getDatePart(isoDate) === `${y}-${m}-${d}`;
}

function isAlreadyValidated(sejour) {
  const statut = String(sejour?.statutDuJour || "").toLowerCase();
  return statut.includes("sortie") || statut.includes("sorti");
}

export default function Gestion_Sorties_Patients({ navigation }) {
  const [sejours, setSejours] = useState([]);
  const [patientsById, setPatientsById] = useState({});
  const [todayOnly, setTodayOnly] = useState(false);
  const [validatedIds, setValidatedIds] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const [sejoursRes, patientsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/sejours`),
        fetch(`${API_BASE_URL}/patients`),
      ]);

      const [sejoursData, patientsData] = await Promise.all([sejoursRes.json(), patientsRes.json()]);

      if (!sejoursRes.ok || !sejoursData.success) {
        throw new Error(sejoursData.message || "Impossible de charger les sejours");
      }

      if (!patientsRes.ok || !patientsData.success) {
        throw new Error(patientsData.message || "Impossible de charger les patients");
      }

      const mapById = (patientsData.patients || []).reduce((acc, patient) => {
        acc[patient.id] = patient;
        return acc;
      }, {});

      setPatientsById(mapById);
      setSejours(sejoursData.sejours || []);
      setValidatedIds([]);
    } catch (err) {
      Alert.alert("Erreur", err?.message || "Erreur lors du chargement");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const rows = useMemo(() => {
    const source = todayOnly ? sejours.filter((sejour) => isToday(sejour.dateSortie)) : sejours;
    return source;
  }, [sejours, todayOnly]);

  const validateSortie = (sejourId) => {
    setValidatedIds((prev) => (prev.includes(sejourId) ? prev : [...prev, sejourId]));
  };

  const openPatientFile = (patientId) => {
    const patient = patientsById[patientId];

    if (!patient) {
      Alert.alert("Information", "Fiche patient indisponible");
      return;
    }

    navigation.navigate("detail_patient", { patient });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.actionCard]}>
        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnSecondary, pressed && styles.btnSecondaryPressed]}
          onPress={() => navigation.navigate("infirmier_gestion")}
        >
          <Text style={styles.btnTextLight}>Retour</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnPrimary, pressed && styles.btnPrimaryPressed]}
          onPress={() => setTodayOnly((prev) => !prev)}
        >
          <Text style={styles.btnTextLight}>
            {todayOnly ? "Afficher toutes les sorties" : "Afficher les sorties du jour"}
          </Text>
        </Pressable>
      </View>

      <View style={[styles.card, styles.tableCard]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Gerer les sorties des patients</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeadRow]}>
              <Text style={[styles.cell, styles.headCell, styles.wSejour]}>Numero sejour</Text>
              <Text style={[styles.cell, styles.headCell, styles.wPatientId]}>Numero patient</Text>
              <Text style={[styles.cell, styles.headCell, styles.wLoc]}>Localisation</Text>
              <Text style={[styles.cell, styles.headCell, styles.wDate]}>Date sortie</Text>
              <Text style={[styles.cell, styles.headCell, styles.wLibelle]}>Libelle</Text>
              <Text style={[styles.cell, styles.headCell, styles.wNom]}>Nom</Text>
              <Text style={[styles.cell, styles.headCell, styles.wPrenom]}>Prenom</Text>
              <Text style={[styles.cell, styles.headCell, styles.wNote]}>Note</Text>
              <Text style={[styles.cell, styles.headCell, styles.wActions]}>Actions</Text>
            </View>

            <ScrollView style={styles.tableBodyScroll} nestedScrollEnabled>
              {rows.length > 0 ? (
                rows.map((sejour) => {
                  const patient = patientsById[sejour.patientId] || {};
                  const validated = validatedIds.includes(sejour.id) || isAlreadyValidated(sejour);

                  return (
                    <View key={sejour.id} style={styles.tableRow}>
                      <Text style={[styles.cell, styles.wSejour]}>{sejour.id}</Text>
                      <Text style={[styles.cell, styles.wPatientId]}>{sejour.patientId || "N/A"}</Text>

                      <Text style={[styles.cell, styles.wLoc]}>
                        {`Chambre: ${sejour.chambreId || "N/A"}\nEtage: ${sejour.etage ?? "N/A"}`}
                      </Text>

                      <Text style={[styles.cell, styles.wDate]}>{formatDate(sejour.dateSortie)}</Text>
                      <Text style={[styles.cell, styles.wLibelle]}>{sejour.libelle || "N/A"}</Text>

                      <Pressable
                        style={({ pressed }) => [styles.cell, styles.wNom, styles.linkCell, pressed && styles.linkCellPressed]}
                        onPress={() => openPatientFile(sejour.patientId)}
                      >
                        <Text style={styles.linkText}>{patient.nom || "N/A"}</Text>
                      </Pressable>

                      <Pressable
                        style={({ pressed }) => [styles.cell, styles.wPrenom, styles.linkCell, pressed && styles.linkCellPressed]}
                        onPress={() => openPatientFile(sejour.patientId)}
                      >
                        <Text style={styles.linkText}>{patient.prenom || "N/A"}</Text>
                      </Pressable>

                      <Text style={[styles.cell, styles.wNote]}>{patient.note || "-"}</Text>

                      <View style={[styles.cell, styles.wActions, styles.actionsCell]}>
                        <Pressable
                          style={({ pressed }) => [styles.btn, styles.btnOutlinePrimary, pressed && styles.btnOutlinePrimaryPressed]}
                          onPress={() => navigation.navigate("detail_sejour", { sejour })}
                        >
                          <Text style={styles.btnTextPrimary}>Voir le sejour</Text>
                        </Pressable>

                        {patient.id ? (
                          <Pressable
                            style={({ pressed }) => [styles.btn, styles.btnLink, pressed && styles.btnLinkPressed]}
                            onPress={() => openPatientFile(patient.id)}
                          >
                            <Text style={styles.btnTextLink}>Fiche patient</Text>
                          </Pressable>
                        ) : null}

                        {validated ? (
                          <Text style={styles.validatedText}>Sortie validee</Text>
                        ) : (
                          <Pressable
                            style={({ pressed }) => [styles.btn, styles.btnSuccess, pressed && styles.btnSuccessPressed]}
                            onPress={() => validateSortie(sejour.id)}
                          >
                            <Text style={styles.btnTextLight}>Valider sortie</Text>
                          </Pressable>
                        )}
                      </View>
                    </View>
                  );
                })
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
  tableCard: {
    flex: 1,
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
    minWidth: 1480,
  },
  tableBodyScroll: {
    maxHeight: 420,
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
  wSejour: {
    width: 110,
  },
  wPatientId: {
    width: 110,
  },
  wLoc: {
    width: 160,
  },
  wDate: {
    width: 110,
  },
  wLibelle: {
    width: 180,
  },
  wNom: {
    width: 130,
  },
  wPrenom: {
    width: 130,
  },
  wNote: {
    width: 220,
  },
  wActions: {
    width: 320,
  },
  actionsCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  linkCell: {
    justifyContent: "center",
  },
  linkCellPressed: {
    backgroundColor: "#eff6ff",
  },
  linkText: {
    color: "#0d6efd",
    fontWeight: "600",
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
  btnSuccess: {
    backgroundColor: "#198754",
    borderColor: "#198754",
  },
  btnSuccessPressed: {
    backgroundColor: "#157347",
    borderColor: "#157347",
  },
  btnOutlinePrimary: {
    borderColor: "#0d6efd",
    backgroundColor: "#ffffff",
  },
  btnOutlinePrimaryPressed: {
    backgroundColor: "#e7f1ff",
  },
  btnLink: {
    borderColor: "transparent",
    backgroundColor: "transparent",
    paddingHorizontal: 6,
  },
  btnLinkPressed: {
    backgroundColor: "#eef2ff",
  },
  btnTextLight: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
  btnTextPrimary: {
    color: "#0d6efd",
    fontSize: 13,
    fontWeight: "600",
  },
  btnTextLink: {
    color: "#0d6efd",
    fontSize: 13,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  validatedText: {
    color: "#198754",
    fontWeight: "700",
    fontSize: 13,
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

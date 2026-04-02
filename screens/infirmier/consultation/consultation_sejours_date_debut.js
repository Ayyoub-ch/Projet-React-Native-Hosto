import { useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const API_BASE_URL = "http://192.168.1.112:3000";

function toIsoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDatePart(isoDate) {
  return String(isoDate || "").split("T")[0];
}

function formatDate(isoDate) {
  const datePart = getDatePart(isoDate);
  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) {
    return "N/A";
  }
  return `${day}/${month}/${year}`;
}

export default function Consultation_Sejours_Date_Debut({ navigation }) {
  const [sejours, setSejours] = useState([]);
  const [patientsById, setPatientsById] = useState({});
  const [selectedDate, setSelectedDate] = useState(toIsoDate(new Date()));

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
    } catch (err) {
      Alert.alert("Erreur", err?.message || "Erreur lors du chargement");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const normalizedSelectedDate = useMemo(() => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
      return null;
    }
    return selectedDate;
  }, [selectedDate]);

  const filteredSejours = useMemo(() => {
    if (!normalizedSelectedDate) {
      return [];
    }

    return sejours
      .filter((sejour) => getDatePart(sejour.dateEntree) === normalizedSelectedDate)
      .sort((a, b) => getDatePart(a.dateEntree).localeCompare(getDatePart(b.dateEntree)));
  }, [sejours, normalizedSelectedDate]);

  const onValidateDate = () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
      Alert.alert("Date invalide", "Utilise le format YYYY-MM-DD");
    }
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
      <View style={[styles.card, styles.tableCard]}>
        <View style={[styles.cardHeader, styles.headerRow]}>
          <Text style={styles.cardTitle}>{`Sejours commencant le ${formatDate(selectedDate)}`}</Text>

          <Pressable
            style={({ pressed }) => [styles.btn, styles.btnSecondary, styles.btnSm, pressed && styles.btnSecondaryPressed]}
            onPress={() => navigation.navigate("infirmier_consultation")}
          >
            <Text style={styles.btnTextLight}>Retour</Text>
          </Pressable>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.formRow}>
            <View style={styles.formBlock}>
              <Text style={styles.formLabel}>Date de commencement</Text>
              <TextInput
                value={selectedDate}
                onChangeText={setSelectedDate}
                placeholder="YYYY-MM-DD"
                style={styles.formControl}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.formActions}>
              <Pressable
                style={({ pressed }) => [styles.btn, styles.btnPrimary, pressed && styles.btnPrimaryPressed]}
                onPress={onValidateDate}
              >
                <Text style={styles.btnTextLight}>Valider</Text>
              </Pressable>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeadRow]}>
                <Text style={[styles.cell, styles.headCell, styles.wSejour]}>Numero sejour</Text>
                <Text style={[styles.cell, styles.headCell, styles.wPatient]}>Patient</Text>
                <Text style={[styles.cell, styles.headCell, styles.wLoc]}>Localisation</Text>
                <Text style={[styles.cell, styles.headCell, styles.wDate]}>Date entree</Text>
                <Text style={[styles.cell, styles.headCell, styles.wDate]}>Date sortie</Text>
                <Text style={[styles.cell, styles.headCell, styles.wLibelle]}>Libelle</Text>
                <Text style={[styles.cell, styles.headCell, styles.wStatut]}>Statut du jour</Text>
                <Text style={[styles.cell, styles.headCell, styles.wActions]}>Actions</Text>
              </View>

              <ScrollView style={styles.tableBodyScroll} nestedScrollEnabled>
                {filteredSejours.length > 0 ? (
                  filteredSejours.map((sejour) => {
                    const patient = patientsById[sejour.patientId] || {};

                    return (
                      <View key={sejour.id} style={styles.tableRow}>
                        <Text style={[styles.cell, styles.wSejour]}>{sejour.id}</Text>

                        <View style={[styles.cell, styles.wPatient]}>
                          <Text style={styles.patientMain}>{patient.nom ? `${patient.nom} ${patient.prenom || ""}` : "Non renseigne"}</Text>
                          <Text style={styles.patientSub}>{patient.id ? `ID ${patient.id}` : "N/A"}</Text>
                        </View>

                        <Text style={[styles.cell, styles.wLoc]}>
                          {`Chambre: ${sejour.chambreId || "N/A"}\nEtage: ${sejour.etage ?? "N/A"}`}
                        </Text>

                        <Text style={[styles.cell, styles.wDate]}>{formatDate(sejour.dateEntree)}</Text>
                        <Text style={[styles.cell, styles.wDate]}>{formatDate(sejour.dateSortie)}</Text>
                        <Text style={[styles.cell, styles.wLibelle]}>{sejour.libelle || "N/A"}</Text>
                        <Text style={[styles.cell, styles.wStatut]}>{sejour.statutDuJour || "N/A"}</Text>

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
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <View style={styles.emptyRow}>
                    <Text style={styles.emptyText}>Aucun sejour commencant a cette date.</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  cardBody: {
    flex: 1,
    padding: 12,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  formBlock: {
    minWidth: 220,
  },
  formLabel: {
    marginBottom: 6,
    fontWeight: "600",
    color: "#111827",
  },
  formControl: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    color: "#111827",
  },
  formActions: {
    flexDirection: "row",
    gap: 8,
  },
  table: {
    minWidth: 1360,
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
  wSejour: {
    width: 110,
  },
  wPatient: {
    width: 220,
  },
  wLoc: {
    width: 160,
  },
  wDate: {
    width: 110,
  },
  wLibelle: {
    width: 190,
  },
  wStatut: {
    width: 150,
  },
  wActions: {
    width: 230,
  },
  patientMain: {
    color: "#1f2937",
    fontSize: 14,
    fontWeight: "600",
  },
  patientSub: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 3,
  },
  actionsCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  btnSm: {
    paddingVertical: 6,
    paddingHorizontal: 10,
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

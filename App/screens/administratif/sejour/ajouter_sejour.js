import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";

const API_BASE_URL = "http://192.168.1.113:3000";

export default function Ajouter_Séjour({ navigation }) {
  const [dateEntree, setDateEntree] = useState("");
  const [dateSortie, setDateSortie] = useState("");
  const [libelle, setLibelle] = useState("");
  const [statutDuJour, setStatutDuJour] = useState("");
  const [patientId, setPatientId] = useState("");
  const [chambreId, setChambreId] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const createSejour = async () => {
    if (!dateEntree.trim() || !dateSortie.trim() || !libelle.trim() || !statutDuJour.trim() || !patientId.trim() || !chambreId.trim()) {
      Alert.alert("Champs manquants", "Tous les champs sont obligatoires");
      return;
    }

    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${API_BASE_URL}/sejours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateEntree: dateEntree.trim(),
          dateSortie: dateSortie.trim(),
          libelle: libelle.trim(),
          statutDuJour: statutDuJour.trim(),
          patientId: patientId.trim(),
          chambreId: chambreId.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Ajout impossible");
      }

      Alert.alert("Succes", "Sejour ajoute", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert("Erreur", err?.message || "Erreur lors de l'ajout");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un séjour</Text>

      <TextInput
        style={styles.input}
        value={dateEntree}
        onChangeText={setDateEntree}
        placeholder="Date entree (YYYY-MM-DD HH:mm:ss)"
      />
      <TextInput
        style={styles.input}
        value={dateSortie}
        onChangeText={setDateSortie}
        placeholder="Date sortie (YYYY-MM-DD HH:mm:ss)"
      />
      <TextInput style={styles.input} value={libelle} onChangeText={setLibelle} placeholder="Libelle" />
      <TextInput style={styles.input} value={statutDuJour} onChangeText={setStatutDuJour} placeholder="Statut du jour" />
      <TextInput
        style={styles.input}
        value={patientId}
        onChangeText={setPatientId}
        placeholder="ID patient"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={chambreId}
        onChangeText={setChambreId}
        placeholder="ID chambre"
        keyboardType="numeric"
      />

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnSecondary, pressed && styles.btnSecondaryPressed]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnText}>Annuler</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnPrimary, pressed && styles.btnPrimaryPressed]}
          onPress={createSejour}
          disabled={isSaving}
        >
          <Text style={styles.btnText}>{isSaving ? "Enregistrement..." : "Ajouter"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  actions: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  btn: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  btnPrimary: {
    backgroundColor: "#0d6efd",
  },
  btnPrimaryPressed: {
    backgroundColor: "#0b5ed7",
  },
  btnSecondary: {
    backgroundColor: "#6c757d",
  },
  btnSecondaryPressed: {
    backgroundColor: "#5c636a",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});

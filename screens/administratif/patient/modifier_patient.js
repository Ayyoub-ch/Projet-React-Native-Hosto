import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";

const API_BASE_URL = "http://192.168.1.112:3000";

export default function Modifier_Patient({ navigation, route }) {
  const patient = route?.params?.patient;
  const [nom, setNom] = useState(patient?.nom || "");
  const [prenom, setPrenom] = useState(patient?.prenom || "");
  const [telephone, setTelephone] = useState(patient?.telephone || "");
  const [sexe, setSexe] = useState(patient?.sexe || "");
  const [note, setNote] = useState(patient?.note || "");
  const [isSaving, setIsSaving] = useState(false);

  const savePatient = async () => {
    if (!patient?.id) {
      Alert.alert("Erreur", "Patient introuvable");
      return;
    }

    if (!nom.trim() || !prenom.trim() || !telephone.trim() || !sexe.trim()) {
      Alert.alert("Champs manquants", "Nom, prenom, telephone et sexe sont obligatoires");
      return;
    }

    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${API_BASE_URL}/patients/${patient.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom.trim(),
          prenom: prenom.trim(),
          telephone: telephone.trim(),
          sexe: sexe.trim(),
          note: note.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Modification impossible");
      }

      Alert.alert("Succes", "Patient modifie", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert("Erreur", err?.message || "Erreur lors de la modification");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un patient</Text>

      <TextInput style={styles.input} value={nom} onChangeText={setNom} placeholder="Nom" />
      <TextInput style={styles.input} value={prenom} onChangeText={setPrenom} placeholder="Prenom" />
      <TextInput
        style={styles.input}
        value={telephone}
        onChangeText={setTelephone}
        placeholder="Telephone"
        keyboardType="phone-pad"
      />
      <TextInput style={styles.input} value={sexe} onChangeText={setSexe} placeholder="Sexe" />
      <TextInput
        style={[styles.input, styles.textArea]}
        value={note}
        onChangeText={setNote}
        placeholder="Note"
        multiline
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
          onPress={savePatient}
          disabled={isSaving}
        >
          <Text style={styles.btnText}>{isSaving ? "Enregistrement..." : "Enregistrer"}</Text>
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
  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
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

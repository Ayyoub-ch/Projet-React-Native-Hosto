import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";

const API_BASE_URL = "http://192.168.1.202:3000";

export default function Ajouter_Patient({ navigation }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [sexe, setSexe] = useState("");
  const [note, setNote] = useState("");
  const [localiteId, setLocaliteId] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const createPatient = async () => {
    if (!nom.trim() || !prenom.trim() || !telephone.trim() || !sexe.trim()) {
      Alert.alert("Champs manquants", "Nom, prenom, telephone et sexe sont obligatoires");
      return;
    }

    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${API_BASE_URL}/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom.trim(),
          prenom: prenom.trim(),
          telephone: telephone.trim(),
          sexe: sexe.trim(),
          note: note.trim(),
          localiteId: localiteId.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Ajout impossible");
      }

      Alert.alert("Succes", "Patient ajoute", [
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
      <Text style={styles.title}>Ajouter un patient</Text>

      <TextInput style={styles.input} value={nom} onChangeText={setNom} placeholder="Nom" />
      <TextInput style={styles.input} value={prenom} onChangeText={setPrenom} placeholder="Prenom" />
      <TextInput
        style={styles.input}
        value={telephone}
        onChangeText={setTelephone}
        placeholder="Telephone"
        keyboardType="phone-pad"
      />
      <TextInput style={styles.input} value={sexe} onChangeText={setSexe} placeholder="Sexe (M/F)" />
      <TextInput
        style={styles.input}
        value={localiteId}
        onChangeText={setLocaliteId}
        placeholder="ID localite (optionnel)"
        keyboardType="numeric"
      />
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
          onPress={createPatient}
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

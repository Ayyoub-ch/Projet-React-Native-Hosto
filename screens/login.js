import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    fetch("http://192.168.1.202:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Alert.alert("Connexion réussie");
          // navigation.navigate("Home"); // si tu as une page Home
        } else {
          Alert.alert("Erreur", data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Erreur serveur");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Mot de passe"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Se connecter" onPress={loginUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
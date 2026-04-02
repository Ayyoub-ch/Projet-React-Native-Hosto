import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async () => {
    if (isLoading) {
      return;
    }

    const cleanedEmail = email.trim();

    if (!cleanedEmail || !password) {
      Alert.alert("Champs manquants", "Merci de saisir l'email et le mot de passe.");
      return;
    }

    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000 );

    try {
      const response = await fetch("http://192.168.1.112:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanedEmail,
          password,
        }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Connexion réussie");

        if (data.role === "ROLE_ADMINISTRATIF") {
          navigation.reset({
            index: 0,
            routes: [{ name: "administratif" }],
          });
          return;
        }

        if (data.role === "ROLE_INFIRMIER") {
          navigation.reset({
            index: 0,
            routes: [{ name: "infirmier" }],
          });
          return;
        }

        Alert.alert("Rôle inconnu", "Ton compte n'a pas de rôle autorisé dans l'application.");
      } else {
        Alert.alert("Erreur", data.message || "Identifiants invalides");
      }
    } catch (err) {
      const errorName = err?.name || "UnknownError";
      const errorMessage = err?.message || "Aucun détail supplémentaire";
      const errorDetails = `${errorName}: ${errorMessage}`;

      if (err.name === "AbortError") {
        Alert.alert("Serveur injoignable", `Impossible de joindre l'API de connexion.\n\nDétail: ${errorDetails}`);
      } else {
        console.log("Erreur login:", err);
        Alert.alert("Erreur serveur", `Vérifie que le backend est lancé et accessible.\n\nDétail: ${errorDetails}`);
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
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

      <Button title={isLoading ? "Connexion..." : "Se connecter"} onPress={loginUser} disabled={isLoading} />
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



//Ancienne version du code de login.js

// import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
// import { useState } from "react";

// export default function Login({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const loginUser = () => {
//     fetch("http://192.168.1.202:3000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           Alert.alert("Connexion réussie");
//           // navigation.navigate("Home"); // si tu as une page Home
//         } else {
//           Alert.alert("Erreur", data.message);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         Alert.alert("Erreur serveur");
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Connexion</Text>

//       <TextInput
//         placeholder="Email"
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//       />

//       <TextInput
//         placeholder="Mot de passe"
//         style={styles.input}
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <Button title="Se connecter" onPress={loginUser} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
// });
# 🚀 Commandes Expo essentielles (Codespaces GitHub)

Ce fichier regroupe toutes les commandes importantes pour faire fonctionner une application **Expo** dans un **Codespace GitHub**.

---
## Quand expo start --tunnel fonctionne pas, utilisez ça:

rm -rf node_modules
npm install
chmod +x node_modules/.bin/expo


## 📦 Installation des dépendances

À exécuter une seule fois après l'ouverture du Codespace :

```bash
npm install
```

---

## 🚀 Lancer l'application Expo

### Mode standard (Metro Bundler)

```bash
npx expo start
```

### Mode Web (recommandé dans Codespaces)

```bash
npx expo start --web
```

Cela ouvrira automatiquement un port que Codespaces proposera en navigation.

### Mode Tunnel (pour utiliser Expo Go sur un téléphone)

```bash
npx expo start --tunnel
```

Utilise un proxy Expo pour rendre le projet accessible depuis ton mobile.

---

## 🧹 Nettoyage

### Effacer le cache Expo (utile si le projet plante)

```bash
npx expo start -c
```

Ou :

```bash
npx expo start --clear
```

---

## 🔍 Vérification

### Vérifier qu'Expo est bien installé localement

```bash
ls node_modules/.bin/expo
```

Tu devrais voir `expo` listé.

---

## 🔄 Réinstallation propre des modules

En cas de bug persistant :

```bash
rm -rf node_modules
npm install
```

---

## ✨ Notes

* Toujours utiliser **npx** dans un Codespace pour éviter les problèmes de permissions.
* Le mode web est le plus simple pour tester rapidement sans téléphone.

---

Si tu veux, je peux ajouter une section "+ astuces" ou un guide complet pour configurer Expo dans un devcontainer !

### React Navigation

## Installation

# Installer React Navigation
npm install @react-navigation/native

# Installer les dépendances
npx expo install react-native-screens react-native-safe-area-context

# Installer StackNavigator
npm install @react-navigation/native-stack


### Si un paquet de node à des problèmes
## Réinstallation propre
Remove-Item -Recurse -Force node_modules (supprime de force le dossier node_modules)
Remove-Item package-lock.json (supprime de force package-lock.json)
npm install (réinstalle tout)
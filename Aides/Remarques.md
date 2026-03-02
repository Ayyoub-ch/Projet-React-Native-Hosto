# 📒 Mini-mémo React Native / Expo : ImageBackground, Image et Text

---

## 1️⃣ Structure de base

```jsx
<View style={styles.container}>
  <ImageBackground source={require('./assets/wallpaper.png')} style={styles.background}>
    <Text style={styles.text}>Bienvenue !</Text>
    <Image source={require('./assets/logo.png')} style={styles.image}/>
  </ImageBackground>
</View>
```

---

## 2️⃣ Styles essentiels

```js
const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  image: { width: 120, height: 120 }
});
```

---

## 3️⃣ Règles importantes

* **Container** : `flex: 1` pour remplir l’écran.
* **ImageBackground** : `flex: 1`, `width: '100%'`, `height: '100%'` pour couvrir l’écran.
* **Contenu (texte, image)** : enfants de ImageBackground pour apparaître dessus.
* **Flexbox** : `justifyContent` + `alignItems` pour centrer facilement.
* **Éviter `absolute` partout`** → utilisé seulement pour position précise.
* **Ordre JSX** = ordre de superposition (premier derrière, dernier devant).
* **resizeMode='cover'`** sur ImageBackground → couvre tout sans déformation.

---

## 4️⃣ Astuces / erreurs fréquentes

* Écran blanc sur mobile → souvent container ou ImageBackground sans flex:1.
* Texte invisible → vérifie `color` et superposition par rapport à ImageBackground.
* Ordre des composants → ImageBackground doit envelopper le contenu.
* Taille d’Image → toujours définir `width` et `height`.
* Responsive → préférer Flexbox plutôt que absolute.

---

## 5️⃣ Exemple pratique

```jsx
<ImageBackground source={require('./assets/wallpaper.png')} style={styles.background} resizeMode='cover'>
  <Text style={styles.text}>Hello World!</Text>
  <Image source={require('./assets/logo.png')} style={styles.image}/>
</ImageBackground>
```

Cette structure fonctionne sur **Web, iOS et Android** et s’adapte aux différentes tailles d’écran.

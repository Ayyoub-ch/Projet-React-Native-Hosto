import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';

//Ecrans

//Pied de Page et Entête de page
import Header from './screens/inc/header';

//Authentification
import Login from './screens/login';

//Administratif
import Administratif from './screens/administratif/administratif';

//Patients
import Gestion_Patients from './screens/administratif/patient/gestion_patients';
import Ajouter_Patient from './screens/administratif/patient/ajouter_patient';
import Modifier_Patient from './screens/administratif/patient/modifier_patient';

//Séjours
import Gestion_Séjours from './screens/administratif/sejour/gestion_sejours';
import Ajouter_Séjour from './screens/administratif/sejour/ajouter_sejour';
import Modifier_Séjour from './screens/administratif/sejour/modifier_sejour'; 

//Infirmier
import Infirmier from './screens/infirmier/infirmier';
import InfirmierGestion from './screens/infirmier/gestion/gestion';
import InfirmierConsultation from './screens/infirmier/consultation/consultation';
import Detail_Patient from './screens/infirmier/gestion/detail_patient';
import Detail_Sejour from './screens/infirmier/gestion/detail_sejour';

//Gestion
import Gestion_Arrivées_Patients from './screens/infirmier/gestion/gestion_arrivées_patients';
import Gestion_Sorties_Patients from './screens/infirmier/gestion/gestion_sorties_patients';

//Consultation
import Consultation_Séjours_Date from './screens/infirmier/consultation/consultation_sejours_date';
import Consultation_Séjours_Date_Début from './screens/infirmier/consultation/consultation_sejours_date_debut';
import Consultation_Séjours_Date_À_Venir from './screens/infirmier/consultation/consultation_sejours_date_a_venir';


const Stack = createNativeStackNavigator();

function ScreenWithFooter({ Component, ...props }) {
  return (
    <View style={styles.pageContainer}>
      <Header navigation={props.navigation} currentRouteName={props.route?.name} />
      <View style={styles.screenContent}>
        <Component {...props} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login"  
      screenOptions={{ headerShown: false, // <-- supprime le header pour tous les écrans
}}>
        
        {/*Écran de connexion*/}
        <Stack.Screen 
          name="login"
          component={Login}
          options={{ title: "Connexion" }}
        />

        {/*Écrans pour le service Administratif*/}
        
        {/*Écran de départ pour le service Administratif*/}
        <Stack.Screen name="administratif" options={{ title: "Administratif" }}>
          {(props) => <ScreenWithFooter Component={Administratif} {...props} />}
        </Stack.Screen>

        {/*Écran de la partie Gestion des Patients*/}
        <Stack.Screen name="gestion_patients" options={{ title: "Gestion des Patients" }}>
          {(props) => <ScreenWithFooter Component={Gestion_Patients} {...props} />}
        </Stack.Screen>

        {/*Écran de la partie Ajouter un patient*/}
        <Stack.Screen name="ajouter_patient" options={{ title: "Ajouter un patient" }}>
          {(props) => <ScreenWithFooter Component={Ajouter_Patient} {...props} />}
        </Stack.Screen>

        {/*Écran de la partie Modifier un patient*/}
        <Stack.Screen name="modifier_patient" options={{ title: "Modifier un patient" }}>
          {(props) => <ScreenWithFooter Component={Modifier_Patient} {...props} />}
        </Stack.Screen>


        {/*Écran de la partie Gestion des Séjours*/}
        <Stack.Screen name="gestion_sejours" options={{ title: "Gestion des Séjours" }}>
          {(props) => <ScreenWithFooter Component={Gestion_Séjours} {...props} />}
        </Stack.Screen>

        {/*Écran de la partie Ajouter un séjour*/}
        <Stack.Screen name="ajouter_sejour" options={{ title: "Ajouter un séjour" }}>
          {(props) => <ScreenWithFooter Component={Ajouter_Séjour} {...props} />}
        </Stack.Screen>
        
        {/*Écran de la partie Modifier un séjour*/}
        <Stack.Screen name="modifier_sejour" options={{ title: "Modifier un séjour" }}>
          {(props) => <ScreenWithFooter Component={Modifier_Séjour} {...props} />}
        </Stack.Screen>

        
        {/*Écrans de la partie Infirmier*/}

        {/*Écran de départ pour le service Administratif*/}
        <Stack.Screen name="infirmier" options={{ title: "Infirmier" }}>
          {(props) => <ScreenWithFooter Component={Infirmier} {...props} />}
        </Stack.Screen>

        <Stack.Screen name="infirmier_gestion" options={{ title: "Gestion des arrivées et sorties des patients" }}>
          {(props) => <ScreenWithFooter Component={InfirmierGestion} {...props} />}
        </Stack.Screen>

        <Stack.Screen name="infirmier_consultation" options={{ title: "Consultation des patients" }}>
          {(props) => <ScreenWithFooter Component={InfirmierConsultation} {...props} />}
        </Stack.Screen>

        {/*Écran pour la partie Gestion des arrivées des patients*/}
        <Stack.Screen name="gestion_arrivées_patients" options={{ title: "Gestion des arrivées des patients" }}>
          {(props) => <ScreenWithFooter Component={Gestion_Arrivées_Patients} {...props} />}
        </Stack.Screen>

        <Stack.Screen name="detail_patient" options={{ title: "Detail du patient" }}>
          {(props) => <ScreenWithFooter Component={Detail_Patient} {...props} />}
        </Stack.Screen>

        <Stack.Screen name="detail_sejour" options={{ title: "Detail du sejour" }}>
          {(props) => <ScreenWithFooter Component={Detail_Sejour} {...props} />}
        </Stack.Screen>

        {/*Écran pour la partie Gestion des sorties des patients*/}
        <Stack.Screen name="gestion_sorties_patients" options={{ title: "Gestion des sorties des patients" }}>
          {(props) => <ScreenWithFooter Component={Gestion_Sorties_Patients} {...props} />}
        </Stack.Screen>

        {/*Écran pour la partie Consultation des séjours à une date donnée*/}
        <Stack.Screen name="consultation_sejours_date" options={{ title: "Consultation des séjours à une date donnée" }}>
          {(props) => <ScreenWithFooter Component={Consultation_Séjours_Date} {...props} />}
        </Stack.Screen>

        {/*Écran pour la partie Consultation des séjours commençant à une date donnée*/}
        <Stack.Screen name="consultation_sejours_date_debut" options={{ title: "Consultation des séjours commençant à une date donnée" }}>
          {(props) => <ScreenWithFooter Component={Consultation_Séjours_Date_Début} {...props} />}
        </Stack.Screen>

        {/*Écran pour la partie Consultation des séjours à venir*/}
        <Stack.Screen name="consultation_sejours_date_a_venir" options={{ title: "Consultation des séjours à venir" }}>
          {(props) => <ScreenWithFooter Component={Consultation_Séjours_Date_À_Venir} {...props} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  screenContent: {
    flex: 1,
  },
});
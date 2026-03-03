import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Ecrans
//Authentification
import Login from './screens/login';

//Administratif
import Administratif from './screens/administratif';

//Patients
import Gestion_Patients from './screens/gestion_patients';
import Ajouter_Patient from './screens/ajouter_patient';
import Modifier_Patient from './screens/modifier_patient';

//Séjours
import Gestion_Séjours from './screens/gestion_sejours';
import Ajouter_Séjour from './screens/ajouter_sejour';
import Modifier_Séjour from './screens/modifier_sejour'; 

//Infirmier
import Infirmier from './screens/infirmier';

//Gestion
import Gestion_Arrivées_Patients from './screens/gestion_arrivées_patients';
import Gestion_Sorties_Patients from './screens/gestion_sorties_patients';

//Consultation
import Consultation_Séjours_Date from './screens/consultation_sejours_date';
import Consultation_Séjours_Date_Début from './screens/consultation_sejours_date_debut';
import Consultation_Séjours_Date_À_Venir from './screens/consultation_sejours_date_a_venir';

const Stack = createStackNavigator();

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
        <Stack.Screen 
          name="administratif"
          component={Administratif}
          options={{ title: "Administratif" }}
        />

        {/*Écran de la partie Gestion des Patients*/}
        <Stack.Screen 
          name="gestion_patients"
          component={Gestion_Patients}
          options={{ title: "Gestion des Patients" }}
        />

        {/*Écran de la partie Ajouter un patient*/}
        <Stack.Screen 
          name="ajouter_patient"
          component={Ajouter_Patient}
          options={{ title: "Ajouter un patient" }}
        />

        {/*Écran de la partie Modifier un patient*/}
        <Stack.Screen 
          name="modifier_patient"
          component={Modifier_Patient}
          options={{ title: "Modifier un patient" }}
        />


        {/*Écran de la partie Gestion des Séjours*/}
        <Stack.Screen 
          name="gestion_sejours"
          component={Gestion_Séjours}
          options={{ title: "Gestion des Séjours" }}
        />

        {/*Écran de la partie Ajouter un séjour*/}
        <Stack.Screen 
          name="ajouter_sejour"
          component={Ajouter_Séjour}
          options={{ title: "Ajouter un séjour" }}
        />
        
        {/*Écran de la partie Modifier un séjour*/}
        <Stack.Screen 
          name="modifier_sejour"
          component={Modifier_Séjour}
          options={{ title: "Modifier un séjour" }}
        />

        
        {/*Écrans de la partie Infirmier*/}

        {/*Écran de départ pour le service Administratif*/}
        <Stack.Screen 
          name="infirmier"
          component={Infirmier}
          options={{ title: "Infirmier" }}
        />

        {/*Écran pour la partie Gestion des arrivées des patients*/}
        <Stack.Screen 
          name="gestion_arrivées_patients"
          component={Gestion_Arrivées_Patients}
          options={{ title: "Gestion des arrivées des patients" }}
        />

        {/*Écran pour la partie Gestion des sorties des patients*/}
        <Stack.Screen 
          name="gestion_sorties_patients"
          component={Gestion_Sorties_Patients}
          options={{ title: "Gestion des sorties des patients" }}
        />

        {/*Écran pour la partie Consultation des séjours à une date donnée*/}
        <Stack.Screen 
          name="consultation_sejours_date"
          component={Consultation_Séjours_Date}
          options={{ title: "Consultation des séjours à une date donnée" }}
        />

        {/*Écran pour la partie Consultation des séjours commençant à une date donnée*/}
        <Stack.Screen 
          name="consultation_sejours_date_debut"
          component={Consultation_Séjours_Date_Début}
          options={{ title: "Consultation des séjours commençant à une date donnée" }}
        />

        {/*Écran pour la partie Consultation des séjours à venir*/}
        <Stack.Screen 
          name="consultation_sejours_date_a_venir"
          component={Consultation_Séjours_Date_À_Venir}
          options={{ title: "Consultation des séjours à venir" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
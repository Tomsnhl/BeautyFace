import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Arapey_400Regular } from '@expo-google-fonts/arapey';
import { AuthProvider } from './src/services/AuthContext';


// Importez vos écrans ici
import AccueilScreen from './src/screens/AccueilScreen';
import RdvScreen from './src/screens/RdvScreen';
import ServiceScreen from './src/screens/ServiceScreen';
import ProfilScreen from './src/screens/ProfilScreen';

const Tab = createBottomTabNavigator();

// Prévenez le splash screen de se cacher automatiquement
SplashScreen.preventAutoHideAsync().catch(() => {
  /* le catching des erreurs de SplashScreen.preventAutoHideAsync est facultatif */
});

export default function App() {
  let [fontsLoaded] = useFonts({
    Arapey_400Regular,
  });

  useEffect(() => {
    // Cachez le splash screen une fois que les polices sont chargées
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Ne rien rendre tant que les polices ne sont pas chargées
  }

  // Définir la police par défaut pour tous les éléments Text de l'application
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: 'Arapey_400Regular' };

  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, // Cacher l'en-tête
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Accueil') {
                iconName = focused ? 'ios-home' : 'ios-home-outline';
              } else if (route.name === 'Soin') {
                iconName = focused ? 'ios-heart' : 'ios-heart-outline';
              } else if (route.name === 'Rendez-vous') {
                iconName = 'ios-calendar';
              } else if (route.name === 'Profil') {
                iconName = 'ios-person';
              }

              // Vous pouvez retourner n'importe quel composant que vous voulez ici
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: 'black',
              // borderTopLeftRadius: 15,
              // borderTopRightRadius: 15,
            },
          })}
        >
          <Tab.Screen name="Accueil" component={AccueilScreen} />
          <Tab.Screen name="Soin" component={ServiceScreen} />
          <Tab.Screen name="Rendez-vous" component={RdvScreen} />
          <Tab.Screen name="Profil" component={ProfilScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}



const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Stretch the image to cover the entire screen
    justifyContent: 'center',
  },
});

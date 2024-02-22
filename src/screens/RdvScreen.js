import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ImageBackground, FlatList } from 'react-native';
import api from '../../api'; // Importez votre instance API
import { loginUser, registerUser } from './../services/AuthService'; // Assurez-vous d'importer les fonctions de votre service d'authentification
import { useAuth } from '../services/AuthContext';


const RdvScreen = () => {
    const [userAppointments, setUserAppointments] = useState([]);
    const { user, login, logout } = useAuth(); // Utilisez useAuth ici
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        if (user) {
            const userId = user.id; // Assurez-vous que cela correspond à l'ID de l'utilisateur connecté
            const fetchAppointments = async () => {
                try {
                    const response = await api.get(`/api/appointments?filters[user][id][$eq]=${userId}`);
                    if (response && response.data && response.data.data) {
                        setUserAppointments(response.data.data);
                    } else {
                        // Gérer le cas où la réponse n'est pas ce que vous attendiez
                        console.error("Réponse de l'API non valide :", response);
                    }
                } catch (error) {
                    console.error('Erreur lors de la récupération des rendez-vous:', error);
                }
            };


            fetchAppointments();
        }
    }, [user]);


    const handleLogin = async () => {
        try {
            const userData = await loginUser(email, password);
            login(userData.user); // Utilisez la fonction login de useAuth
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
        }
    };

    const handleRegister = async () => {
        try {
            const userData = await registerUser(username, email, password);
            login(userData.user); // Utilisez la fonction login de useAuth
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
        }
    };

    const renderLoginForm = () => (
        <>
            {isRegistering && (
                <TextInput
                    style={styles.input}
                    placeholder="Nom d'utilisateur"
                    placeholderTextColor="white"
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
            )}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="white"
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="white"
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={isRegistering ? handleRegister : handleLogin}
            >
                <Text style={styles.buttonText}>
                    {isRegistering ? "Inscription" : "Connexion"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setIsRegistering(!isRegistering)}
            >
                <Text style={styles.buttonText}>
                    {isRegistering ? "Connexion" : "Inscription"}
                </Text>
            </TouchableOpacity>
        </>
    );

    const renderAppointmentItem = ({ item }) => (
        <View style={styles.appointmentContainer}>
            <Text style={styles.appointmentText}>Date: {new Date(item.attributes.dateRendezVous).toLocaleDateString()}</Text>
            {/* Ajoutez d'autres détails du rendez-vous ici */}
        </View>
    );

    return (
        <ImageBackground source={require('../../assets/fond-beautyface.jpg')} style={styles.imageBackground}>
            {user ? (
                <FlatList
                    data={userAppointments}
                    renderItem={renderAppointmentItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text style={styles.noAppointmentsText}>Aucun rendez-vous trouvé.</Text>}
                />
            ) : (
                renderLoginForm()
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appointmentContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        width: Dimensions.get('window').width * 0.8,
        marginBottom: 10,
    },
    appointmentText: {
        fontSize: 18,
        color: 'white',
    },
    noAppointmentsText: {
        marginTop: 100,
        fontSize: 18,
        color: 'white',
    },
    input: {
        color: 'white',
        width: '80%',
        height: 40,
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 20,
        width: Dimensions.get('window').width * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    // Ajoutez d'autres styles si nécessaires
});

export default RdvScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { loginUser, registerUser } from './../services/AuthService';
import { useAuth } from '../services/AuthContext'; // Importez useAuth

const CustomButton = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const ProfilScreen = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, login, logout } = useAuth(); // Utilisez useAuth ici

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


    const renderUserProfile = () => (
        <View>
            <Text>Bienvenue, {user.username} !</Text>
            <CustomButton title="Déconnexion" onPress={() => setUser(null)} />
        </View>
    );

    return (
        <ImageBackground source={require('../../assets/fond-beautyface.jpg')} style={styles.imageBackground}>
            <View style={styles.container}>
                {user ? renderUserProfile() : renderLoginForm()}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        color: 'white',
        width: Dimensions.get('window').width * 0.8,
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
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfilScreen;

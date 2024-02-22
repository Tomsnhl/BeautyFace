import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); // Ajout d'un état pour le token JWT

    // Mise à jour de la fonction login pour inclure le token
    const login = ({ user: userData, token: userToken }) => {
        setUser(userData);
        setToken(userToken);
        // Stocker le token dans AsyncStorage si nécessaire
    };

    // Mise à jour de la fonction logout pour effacer également le token
    const logout = () => {
        setUser(null);
        setToken(null); // Effacement du token JWT
        // Supprimez également les données de l'utilisateur et le token de AsyncStorage ici si nécessaire
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

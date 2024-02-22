import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.146:1337', // Utilisez l'adresse IP de votre ordinateur
});

export default api;

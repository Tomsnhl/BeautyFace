import api from '../../api';

const loginUser = async (identifier, password) => {
    try {
        const response = await api.post('api/auth/local', {
            identifier,
            password
        });
        return {
            user: response.data.user,
            token: response.data.jwt, // Capture du JWT
        };
    } catch (error) {
        console.error('Erreur de connexion:', error);
        throw error;
    }
};


const registerUser = async (username, email, password) => {
    try {
        const response = await api.post('api/auth/local/register', {
            username,
            email,
            password
        });

        return {
            user: response.data.user,
            token: response.data.jwt, // Capture du JWT
        };
    } catch (error) {
        console.error('Erreur d\'inscription:', error.response ? error.response : error);
        throw error;
    }
};


export { registerUser, loginUser };

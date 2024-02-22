import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../api';
import { useAuth } from '../services/AuthContext'; // Assurez-vous que le chemin d'importation est correct

const Popup = ({ isVisible, onClose, selectedService }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const { user, token } = useAuth(); // Récupérez le token du contexte d'authentification


    const handleTimeSelect = () => {
        setShowTimePicker(!showTimePicker);
    };

    const onDayPress = (day) => {
        const newDate = new Date(day.dateString);
        newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
        setSelectedDate(newDate);
    };

    const handleTimeConfirm = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            let updatedDate = new Date(selectedDate);
            updatedDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
            setSelectedDate(updatedDate);
        }
    };

    const handleContinue = async () => {
        const formattedDate = selectedDate.toISOString();

        try {
            const response = await api.post('/api/appointments', {
                data: {
                    // Assurez-vous que ces champs correspondent à votre modèle Strapi
                    users_permissions_user: user.id, // Changez 'userId' en 'users_permissions_user' si c'est le nom de champ dans Strapi
                    service: selectedService.id,    // Changez 'serviceId' en 'service' si c'est le nom de champ dans Strapi
                    dateRendezVous: formattedDate
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Utilisation du token JWT
                }
            });

            // Gérer la réussite
            console.log("Rendez-vous créé avec succès:", response.data);
            onClose();
        } catch (error) {
            console.error('Erreur lors de la création du rendez-vous:', error.response ? error.response.data : error);
            // Gérer l'erreur
        }
    };

    return (
        <Modal visible={isVisible} transparent={true} onRequestClose={onClose}>
            <View style={styles.popupContainer}>
                {selectedService && (
                    <Text style={styles.serviceTitle}>{selectedService.titre}</Text>
                )}

                <Calendar
                    onDayPress={onDayPress}
                    markedDates={{
                        [selectedDate.toISOString().split('T')[0]]: { selected: true, selectedColor: 'blue' }
                    }}
                />
                <TouchableOpacity onPress={handleTimeSelect} style={styles.timeButton}>
                    <Text style={styles.timeButtonText}>Choisir l'Heure</Text>
                </TouchableOpacity>

                {showTimePicker && (
                    <DateTimePicker
                        value={selectedTime}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleTimeConfirm}
                    />
                )}

                <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
                    <Text>Continuer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text>Fermer</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    continueButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5,
    },
    timeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5,
    },
    timeButtonText: {
        color: 'white',
    },
    serviceTitle: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    closeButton: {
        color: 'white',
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
});

export default Popup;

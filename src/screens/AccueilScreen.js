import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Modal } from 'react-native';
import Collapsible from 'react-native-collapsible';
import CilDetails from '../components/CilDetails';
import SoinDetails from '../components/SoinDetails';
import BijouxDentaireDetails from '../components/BijouxDentaireDetails';
import SourcilsDetails from '../components/SourcilsDetails';
import { useFonts, Arapey_400Regular } from '@expo-google-fonts/arapey';
import Popup from '../components/PopUp'; // Assurez-vous d'importer votre composant Popup
import { useAuth } from '../services/AuthContext'; // Assurez-vous d'importer votre contexte d'authentification



const screenWidth = Dimensions.get('window').width;
const imageBackground = require('../../assets/fond-beautyface.jpg');
const logo = require('../../assets/logo-blanc.png');

const AccueilScreen = () => {
    const [fontsLoaded] = useFonts({ Arapey_400Regular });
    const [collapsed, setCollapsed] = useState({
        cil: true,
        soinVisage: true,
        sourcil: true,
        strass: true,
    });
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { user } = useAuth(); // Utilisez le hook pour obtenir l'utilisateur connecté


    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://192.168.1.146:1337/api/services');
                const data = await response.json();
                setServices(data.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des services:', error);
            }
        };

        fetchServices();
    }, []);

    const toggleAccordion = (section) => {
        setCollapsed((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
            ...(section !== 'cil' && { cil: true }),
            ...(section !== 'soinVisage' && { soinVisage: true }),
            ...(section !== 'sourcil' && { sourcil: true }),
            ...(section !== 'strass' && { strass: true }),
        }));
    };

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setIsPopupVisible(true);
    };

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelect = (day) => {
        console.log("Jour sélectionné :", day);
        setSelectedDate(day.dateString); // Mettre à jour l'état avec la date sélectionnée
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    if (!fontsLoaded) {
        return null;
    }

    const sections = [
        {
            name: 'cil',
            title: 'EXTENSIONS DE CILS',
            component: <CilDetails services={services} onServiceSelect={handleServiceSelect} />
        },
        {
            name: 'soinVisage',
            title: 'SOINS DU VISAGE',
            component: <SoinDetails /> // Assurez-vous que SoinDetails est correctement implémenté
        },

        {
            name: 'sourcil',
            title: 'SOURCIL',
            component: <SourcilsDetails /> // Assurez-vous que SoinDetails est correctement implémenté
        },

        {
            name: 'strass',
            title: 'BIJOUX DENTAIRE',
            component: <BijouxDentaireDetails /> // Assurez-vous que SoinDetails est correctement implémenté
        },

        // ... autres sections
    ];


    return (
        <ImageBackground source={imageBackground} resizeMode="cover" style={styles.imageBackground}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.welcomeTitleLarge}>BIENVENUE</Text>
                <Text style={styles.welcomeTitleSmall}>mes beautés</Text>
            </View>
            <View style={styles.container}>
                {sections.map((section) => (
                    <View key={section.name}>
                        <TouchableOpacity onPress={() => toggleAccordion(section.name)} style={styles.section}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsed[section.name]}>
                            <View style={styles.collapsibleContent}>
                                {section.name === 'cil' && <CilDetails services={services} onServiceSelect={handleServiceSelect} />}
                            </View>
                        </Collapsible>
                    </View>
                ))}
            </View>
            {isPopupVisible && (
                <Popup
                    isVisible={isPopupVisible}
                    onClose={closePopup}
                    selectedService={selectedService}
                    user={user} // Passez l'utilisateur connecté
                />
            )}
        </ImageBackground>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 60,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Arapey_400Regular',
    },
    section: {
        width: screenWidth - 80,
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20,
        marginVertical: 10,
        padding: 5,
    },
    collapsibleContent: {
        paddingBottom: 15,
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    logo: {
        width: 170,
        height: 100,
        marginBottom: 40,
    },
    welcomeTitleLarge: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Arapey_400Regular',
    },
    welcomeTitleSmall: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginTop: -10,
        fontFamily: 'Arapey_400Regular',
    },
});

export default AccueilScreen;

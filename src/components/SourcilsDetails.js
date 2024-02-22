import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const SourcilsDetails = () => {
    const soins = [
        { titre: 'Épilation restructuration' },
        { titre: 'Épilation restructuration + Teinture' },
    ];

    const renderSoin = (titre) => (
        <TouchableOpacity
            style={styles.SourcilsStyle}
            onPress={() => console.log("Soin sélectionné:", titre)}
        >
            <Text style={styles.SourcilsTitre}>{titre}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {soins.map((soin, index) => (
                renderSoin(soin.titre)
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    SourcilsStyle: {
        justifyContent: 'center', // Centrer le contenu
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        width: screenWidth * 0.6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    SourcilsTitre: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default SourcilsDetails;

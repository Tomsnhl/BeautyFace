import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const BijouxDentaireDetails = () => {
    const soins = [
        {
            titre: '1 strass',
        },
        {
            titre: 'Butterfly',
        },
        {
            titre: 'Coeur',
        },
        {
            titre: 'Étoile',
        },
        {
            titre: 'Goutte',
        }

    ];

    const renderSoin = (titre, prix) => (
        <TouchableOpacity
            style={styles.bijouxStyle}
            onPress={() => console.log("Soin sélectionné:", titre)}
        >
            <Text style={styles.bijouxTitre}>{titre}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {soins.map((soin, index) => (
                renderSoin(soin.titre, soin.prix)
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    bijouxStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        width: screenWidth * 0.4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    bijouxTitre: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default BijouxDentaireDetails;

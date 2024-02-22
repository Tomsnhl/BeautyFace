import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const CilDetails = ({ onServiceSelect }) => {
    const cils = [
        { id: 8, titre: "Cil à cil" },
        { id: 9, titre: "Cil à cil: Remplissage" },
        { id: 10, titre: "Mixte / Russe" },
        { id: 11, titre: "Mixte / Russe: Remplissage" },
        { id: 12, titre: "YY/W" },
        { id: 13, titre: "YY/W: Remplissage" },
        { id: 14, titre: "Dépose" },
    ];

    const renderOnglet = (cil) => (
        <TouchableOpacity
            key={cil.id}
            style={styles.ongletStyle}
            onPress={() => onServiceSelect(cil)}
        >
            <Text style={styles.ongletTitre}>{cil.titre}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {cils.map(cil => renderOnglet(cil))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    ongletStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        width: screenWidth * 0.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    ongletTitre: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default CilDetails;

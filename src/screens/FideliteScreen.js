import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FideliteScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Fidélité</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default FideliteScreen;

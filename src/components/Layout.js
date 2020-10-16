import { Text, StyleSheet, View, StatusBar } from 'react-native';
import React from 'react';

import ChiperLogo from '../img/chiper-logo.svg';

const Layout = ({ children }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content'/>
            <View style={styles.header}>
                <ChiperLogo style={styles.logo} />
                <Text style={styles.logoTittle}>LIVE</Text>
            </View>
                
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 3,
        marginLeft: 5,
    },
    logoTittle: {
        color: 'red',
        marginLeft: 5,
        fontSize: 24,
        fontFamily: 'monospace',
        fontWeight: 'bold'
    },
    logo: {
        marginLeft: 10
    },
})

export default Layout;
import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import ChiperLogo from '../img/chiper-logo.svg';

const VideoImg = ({ navigation, videoUrl, name, autor, }) => {
    const onPress = () => {
        navigation.navigate('Video', { videoUrl: videoUrl, name: name });
    }

    return (
        <TouchableHighlight onPress={onPress} underlayColor='white'>
            <View style={styles.container}>
                <View style={styles.imageWrapper}>
                    <ChiperLogo style={styles.image} height={200} width={"100%"}/>
                </View>
                <View style={styles.liveIcon}>
                    <Text style={styles.text}>LIVE</Text>
                </View>

                <View>
                    <Text>{autor}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    imageWrapper: {
        backgroundColor: "#cdcdcd",
        borderRadius: 10,
        height: 0,
        overflow: "hidden",
        paddingTop: "56.25%",
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        width: "100%",
        zIndex: 1
    },
    liveIcon: {
        position: "absolute",
        zIndex: 2,
        backgroundColor: "red",
        borderRadius: 3,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5
    },
    text: {
        color: "white",
        fontWeight: '600'
    },
    image: {
        position: "absolute",
    }
})

export default VideoImg;
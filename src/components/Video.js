import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, View, Dimensions, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';

import ChiperLogo from '../img/chiper-logo.svg';

const { height } = Dimensions.get("window");

const VideoStream = ({ route, navigation }) => {

    const [videoFinish, setVideoFinish] = useState(false);
    const [videoLoading, setVideoLoading] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        StatusBar.setHidden(true);

        fetch('https://chiper-server.herokuapp.com/liveEvents/data', {method: 'POST', body: JSON.stringify({ liveEventName: route.params.name })})
            .then(() => {
                setVideoUrl(true);
            })
            .catch(() => {
                setVideoUrl(false);
                setVideoFinish(true);
            })

        const unsubscribe = navigation.addListener('transitionStart', (e) => {
            StatusBar.setHidden(false);
        });

       return unsubscribe;
    }, [navigation])

    let playerRef = null;

    const onBuffer = buffer => {
        console.log("onBuffer: ", buffer);
    }

    const onError = error => {
        setVideoError(true);
        setVideoLoading(false);
        console.log("onBuffer: ", error);
    };

    const onEnd = () => {
        setVideoFinish(true);
    }

    const onLoadStart = () => {
        setVideoLoading(true);
    }

    const onLoad = () => {
        setVideoLoading(false);
    }

    return (
        <View>
            {
                videoUrl &&
                    <Video source={{ uri: `https://chiperlive-brso.streaming.media.azure.net/${route.params.videoUrl}` }}
                        ref={ref => {
                            playerRef = ref
                        }}
                        onBuffer={onBuffer}
                        onEnd={onEnd}
                        onLoadStart={onLoadStart}
                        onError={onError}
                        onLoad={onLoad}
                        resizeMode={'cover'}
                        style={[styles.backgroundVideo, videoFinish && {opacity: 0.5}]}
                    />
            }
          
            <View style={styles.header}>
                <ChiperLogo style={styles.logo} />
                <Text style={styles.logoTittle}>LIVE</Text>
            </View>

            {
                videoFinish &&
                    <View style={styles.container}>
                        <Text style={styles.text}>El live ya termino</Text>
                    </View>
                        
            }

            {
                videoLoading &&
                    <View style={styles.container}>
                        <ActivityIndicator size={46} color='red' />
                    </View> 
            }

            {
                videoError && 
                    <View style={styles.container}>
                        <Text style={styles.text}>Error al reproducir el live</Text>
                    </View>
            }
        </View>
    )   
}

var styles = StyleSheet.create({
    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0,
    },
    logo: {
        marginLeft: 10
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height / 2
    },
    text: {
        color: 'red',
        fontSize: 25,
        marginBottom: 15
    },
});

export default VideoStream;
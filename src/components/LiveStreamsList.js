import React, { useEffect, useState } from 'react';
import { Text, FlatList, RefreshControl, ActivityIndicator, StyleSheet, View, Button } from 'react-native';
import Layout from './Layout';

import VideoImg from './VideoImg';

const LiveStreamsList = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const useDataApi = () => {
      setLoading(true);

      fetch('https://chiper-server.herokuapp.com/liveEvents/data')
        .then(response => response.json())
        .then(data => {
          setData(data.body);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        })
    }

    useEffect(() => {
      useDataApi();      
    }, [])

    const handleRefresh = () => {
      useDataApi();
    }

    return (
      <Layout openNav={navigation}>
        {
          loading
            ? <View style={styles.container}>
                <ActivityIndicator size={46} color='red' />
              </View> 
            : error
            ? <View style={styles.container}>
                <Text style={styles.text}>Error de red</Text>
                <Button
                  onPress={handleRefresh}
                  title='INTENTALO DE NUEVO'
                  color='red'
                />
              </View>
              : data.length == 0
                ? <View style={styles.container}>
                    <Text style={styles.text}>Por el momento no hay lives</Text>
                    <Button
                      onPress={handleRefresh}
                      title='INTENTALO DE NUEVO'
                      color='red'
                    />
                  </View>
                : <FlatList
                    data={data}
                    renderItem={({ item }) => (
                      <VideoImg navigation={navigation} videoUrl={item.url} name={item.id} />
                    )}
                    keyExtractor={item => item.id}
                    refreshControl={
                      <RefreshControl 
                        refreshing={loading}
                        onRefresh={handleRefresh}
                        colors={['red']}
                      />
                    }
                  />
        }
      </Layout>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'red',
    fontSize: 25,
    marginBottom: 15
  },
})

export default LiveStreamsList;
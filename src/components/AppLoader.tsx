import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const AppLoader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AppLoader;

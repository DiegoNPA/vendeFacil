import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function HeaderSignIn() {


  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>VendeFacil</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 85,
    backgroundColor: 'coral',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  }
});
import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';

const HeaderComponent = () => {

const logOut=()=>{
  
  const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

  db.transaction(tx => {
      console.log("hhhh1")
      tx.executeSql(' DELETE FROM users') 
      
  });

}

  return (

    <View style={styles.headerContainer}>
      <Image source={require('./Images/logo.png')} style={styles.image} />
      <View style={styles.text_view}>
        <Text style={styles.text_1}>Secure-</Text>
        <Text style={styles.text_2}>U</Text>
      </View>
      <Image source={require('./Images/profile.jpg')} style={styles.profile} onProgress={logOut} />
      {/* <Button onPress={logOut} title='Logout'/> */}
    </View>

  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#484848',
    height:100,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  text_view: {
    flexDirection: 'row',
  },
  text_1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  text_2:{
    fontSize: 28,
    fontWeight: 'bold',
    color:'#3B9AB2'
  },
  profile:{
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 75,
  },
});

export default HeaderComponent;

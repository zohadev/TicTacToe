import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, Vibration } from 'react-native';
import DrawerContent from './src/drawer/DrawerContent';
import AboutScreen from './src/screens/AboutScreen';
import GameScreen from "./src/screens/GameScreen";


function HomeScreen({navigation}) {
  return <GameScreen {...{navigation}} />;
}

function NotificationsScreen({navigation}) {
  return <AboutScreen {...{navigation}} />;
}

const Drawer = createDrawerNavigator();

export default function App() {
  const [initRender, setInitRender] = useState(true);

  useEffect(() => {
    setInitRender(false);
  }, [initRender]);

  useEffect(() => {
    const backAction = () => {
      Vibration.vibrate(50);
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,

          style: 'cancel',
        },

        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={[styles.drawer, {width: initRender ? null : '70%'}]}
        initialRouteName="Home"
        drawerContent={DrawerContent}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
</>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#000',
  },
});
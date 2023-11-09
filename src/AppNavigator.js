import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../src/screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import {Provider} from 'react-redux';
import store from './store/store';
import WelcomeScreen from './screens/WelcomeScreen';
import AllUsersData from './screens/AllUsersData';
import UserCreation from './screens/CreateNewUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdateUserData from './screens/UpdateUserData';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [userExist, setUserExist] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        setLoading(false);

        if (userData) {
          setUserExist(true);
        }
      } catch (error) {
        console.error('Error checking user data:', error);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={userExist ? 'WelcomeScreen' : 'Login'}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AllUsersData"
            component={AllUsersData}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateNewUser"
            component={UserCreation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UpdateUserData"
            component={UpdateUserData}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AppNavigator;

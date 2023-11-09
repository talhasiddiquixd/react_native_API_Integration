import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {login} from '../actions/authActions';
import {fetchUserDataByEmail} from '../actions/userActions';
import Snackbar from 'react-native-snackbar';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logoPosition, setLogoPosition] = useState(40);

  const dispatch = useDispatch();

  useEffect(() => {
    loadLogoPosition();
    setTimeout(() => {
      setLogoPosition(140);
      saveLogoPosition();
    }, 1000);
  }, []);

  const loadLogoPosition = async () => {
    try {
      const storedLogoPosition = await AsyncStorage.getItem('logoPosition');
      setLogoPosition(
        storedLogoPosition ? parseFloat(storedLogoPosition) : 140,
      );
    } catch (error) {
      console.error('Error loading logo position:', error);
    }
  };

  const saveLogoPosition = async () => {
    try {
      await AsyncStorage.setItem('logoPosition', logoPosition.toString());
    } catch (error) {
      console.error('Error saving logo position:', error);
    }
  };

  const handleLogin = async () => {
    dispatch(login(email, password)).then(async response => {
      if (response && response.success) {
        dispatch(fetchUserDataByEmail(email)).then(async userResponse => {
          if (userResponse && userResponse.success) {
            await AsyncStorage.setItem('user', JSON.stringify(userResponse.userData));
            navigation.replace('WelcomeScreen');
            Snackbar.show({
              text: 'Login Successful',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: '#5490F9',
            });
          } else {
            Snackbar.show({
              text: userResponse.errorMessage || 'Failed to fetch user data',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: 'red',
            });
          }
        });
      } else {
        Snackbar.show({
          text: response.errorMessage || 'Login failed',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        style={{
          width: logoPosition,
          height: 120,
          marginBottom: 50,
          alignSelf: 'center',
        }}
        source={require('../../assets/logo.png')}
        resizeMode={'contain'}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.registerText}>Don't have an Account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 60,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  loginButton: {
    backgroundColor: '#5490F9',
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 60,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 15,
    color: 'white',
  },
  registerText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 30,
  },
});

export default LoginScreen;

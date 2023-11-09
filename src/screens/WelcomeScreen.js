import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {fetchAllUserData} from '../actions/userActions';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({navigation}) => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    id: '',
    avatar: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('user');
        console.log('Atored', storedUserData);
        if (storedUserData) {
          setUser(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    retrieveUserData();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              style={styles.avatar}
              source={user.avatar
                ? {uri: user.avatar}
                : require('../../assets/user.png')}
            />
            <Text style={styles.welcomeText}>
              {`Welcome, ${user.first_name} ${user.last_name}!`}
            </Text>
            <Text>{`Email: ${user.email}`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('UpdateUserData')}>
              <Text style={styles.buttonText}>Edit User Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                dispatch(fetchAllUserData()).then(async userResponse => {
                  if (userResponse && userResponse.success) {
                    navigation.navigate('AllUsersData', {
                      userData: userResponse.userData,
                    });
                  } else {
                    Snackbar.show({
                      text:
                        userResponse.errorMessage ||
                        'Failed to fetch users data',
                      duration: Snackbar.LENGTH_SHORT,
                      backgroundColor: 'red',
                    });
                  }
                });
              }}>
              <Text style={styles.buttonText}>Fetch All Users</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('CreateNewUser')}>
              <Text style={styles.buttonText}>Create New User</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    elevation: 10,
    margin: 20,
    height: Dimensions.get('window').height,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#5490F9',
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 60,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default WelcomeScreen;

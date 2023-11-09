import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import {useDispatch} from 'react-redux';
import {createUser} from '../actions/userCreateActions';
import Snackbar from 'react-native-snackbar';

const UserCreation = () => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const dispatch = useDispatch();

  const handleCreateUser = () => {
    dispatch(createUser({name, job})).then(async response => {
      if (response && response.success) {
        Snackbar.show({
          text: 'User created successfully with ID: ' + response.id,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#5490F9',
        });
      } else {
        Snackbar.show({
          text: response.errorMessage || 'Failed to Create User',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.appBarText}>Create User</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Image source={require('../../assets/online-support.png')} style={styles.icon} />
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Job"
          value={job}
          onChangeText={text => setJob(text)}
        />
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateUser}>
          <Text style={styles.buttonText}>Create User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    backgroundColor: '#5490F9',
    padding: 16,
    alignItems: 'center',
  },
  appBarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    marginBottom: 20,
  },
  circle: {
    width: 150,
    height: 150,
    backgroundColor: '#5490F9',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 80,
    width: 80,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    width: '100%',
  },
  createButton: {
    backgroundColor: '#5490F9',
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 60,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default UserCreation;

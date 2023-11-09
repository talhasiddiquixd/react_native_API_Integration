import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateUser} from '../actions/userUpdateActions';
import Snackbar from 'react-native-snackbar';

const UserDataUpdate = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const dispatch = useDispatch();

  const handleUpdateUser = async () => {
    dispatch(updateUser(id, {name: name, job: job})).then(async response => {
      console.log(response);
      if (response && response.success) {
        Snackbar.show({
          text: 'User Updated successfully with ID: ' + response.id,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#5490F9',
        });
      } else {
        Snackbar.show({
          text: response.errorMessage || 'Failed to Update User',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.appBarText}>Update User</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, {backgroundColor: '#5490F9'}]}>
            <Image
              source={require('../../assets/online-support.png')}
              style={{height: 80, width: 80}}
              resizeMode="contain"
            />
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="ID"
          value={id}
          onChangeText={text => setId(text)}
        />
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
          style={styles.updateButton}
          onPress={handleUpdateUser}>
          <Text style={styles.buttonText}>Update User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
  body: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
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
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  updateButton: {
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

export default UserDataUpdate;

import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';

const AllUsersData = ({route}) => {
  const users = route.params.userData;
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.appBarText}>Users List</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <UserCard user={item} />}
      />
    </View>
  );
};

const UserCard = ({user}) => {
  return (
    <View style={styles.card}>
      <Image style={styles.avatar} source={{uri: user.avatar}} />
      <View style={styles.textContainer}>
        <Text
          style={
            styles.userName
          }>{`${user.first_name} ${user.last_name}`}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
    margin: 10,
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
});

export default AllUsersData;

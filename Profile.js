import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';

const ProfileScreen = ({ route }) => {
  const userData = route.params.userData;

  const name = userData.name;
  const kills = userData.kills;
  const deaths = userData.deaths;
  const caughtGolds = userData.caughtGolds;
  const ratio = (kills / deaths).toFixed(2);
  const gearScore = userData.gearScore;
  const earnedCrystals = userData.earnedCrystals;

  const hunterHull = userData.hullsPlayed.find((hull) => hull.name === 'Hunter');
  const hoursPlayedWithHunter = hunterHull ? hunterHull.timePlayed / 3600000 : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.blackBox}>
        <Image
          source={{
            uri:
              'https://media.discordapp.net/attachments/604484924946251778/670310899344474122/unknown.png',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>Player {name}</Text>

        <View style={styles.infoBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailsText}>Gear Score:</Text>
            <Text style={styles.detailValue}>{gearScore}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailsText}>Kills:</Text>
            <Text style={styles.detailValue}>{kills}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailsText}>Deaths:</Text>
            <Text style={styles.detailValue}>{deaths}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailsText}>K/D:</Text>
            <Text style={styles.detailValue}>{ratio}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailsText}>Caught Golds:</Text>
            <Text style={styles.detailValue}>{caughtGolds}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailsText}>Earned Crystals:</Text>
            <Text style={styles.detailValue}>{earnedCrystals}</Text>
          </View>
          {/* <View style={styles.detailRow}>
            <Text style={styles.detailsText}>Hours Played with Hunter:</Text>
            <Text style={styles.detailValue}>{hoursPlayedWithHunter.toFixed(2)}</Text>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blackBox: {
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 25,
    borderRadius: 10,
    width: 350,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  username: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoBox: {
    marginTop: 30,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 33,
  },
  detailsText: {
    fontSize: 16,
    color: 'white',
    marginRight: 10,
  },
  detailValue: {
    fontSize: 16,
    color: 'white',
  },
});

export default ProfileScreen;

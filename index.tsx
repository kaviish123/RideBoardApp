import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Linking, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { rides } from '../../ridesData.js';

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [onlyCouple, setOnlyCouple] = useState(false);

  useFocusEffect(
    useCallback(() => {
      filterData(search, onlyCouple);
    }, [search, onlyCouple])
  );

  const filterData = (text: string, couple: boolean) => {
    let filtered = [...rides];

    if (text) {
      filtered = filtered.filter(
        (item) =>
          item.from.toLowerCase().includes(text.toLowerCase()) ||
          item.to.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (couple) {
      filtered = filtered.filter(
        (item) => item.type.toLowerCase() === 'couple'
      );
    }

    setData(filtered);
  };

  const makeCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
      
      <Text style={styles.title}>🚘 Available Rides</Text>

      {/* Search */}
      <TextInput
        placeholder="Search location..."
        style={styles.search}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          filterData(text, onlyCouple);
        }}
      />

      {/* Filter */}
      <View style={styles.filterRow}>
        <Text>Only Couple Rides</Text>
        <Switch
          value={onlyCouple}
          onValueChange={(value) => {
            setOnlyCouple(value);
            filterData(search, value);
          }}
        />
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No rides found
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.route}>{item.from} → {item.to}</Text>

            <View style={styles.row}>
              <Text>🪑 Seats: {item.seats}</Text>
              <Text>🚗 {item.type}</Text>
            </View>

            <Text style={{ marginTop: 5 }}>📞 {item.contact}</Text>

            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => makeCall(item.contact)}
            >
              <Text style={styles.callText}>Call Driver</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  search: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    elevation: 6,
  },
  route: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  callBtn: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  callText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
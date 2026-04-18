import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addRide } from '../../ridesData.js';

export default function PostScreen() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [seats, setSeats] = useState('');
  const [type, setType] = useState('');
  const [contact, setContact] = useState('');
  const [document, setDocument] = useState(null);

  const handlePost = () => {
    if (!type) {
      alert("Please select ride type");
      return;
    }

    const newRide = {
      from,
      to,
      seats,
      type,
      contact,
      document,
    };

    addRide(newRide);

    alert("🚗 Ride Posted Successfully!");

    setFrom('');
    setTo('');
    setSeats('');
    setType('');
    setContact('');
    setDocument(null);
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.assets && result.assets.length > 0) {
      setDocument(result.assets[0].name);
    }
  };

  return (
    <LinearGradient colors={['#ff9a9e', '#fad0c4']} style={styles.container}>

      <Text style={styles.title}>✨ Post a Ride</Text>

      <View style={styles.card}>

        <TextInput
          placeholder="From Location"
          style={styles.input}
          value={from}
          onChangeText={setFrom}
        />

        <TextInput
          placeholder="To Location"
          style={styles.input}
          value={to}
          onChangeText={setTo}
        />

        <TextInput
          placeholder="Seats Available"
          style={styles.input}
          keyboardType="numeric"
          value={seats}
          onChangeText={setSeats}
        />

        {/* 🔽 Dropdown */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Picker.Item label="Select Ride Type" value="" />
            <Picker.Item label="Solo" value="solo" />
            <Picker.Item label="Couple" value="couple" />
          </Picker>
        </View>

        <TextInput
          placeholder="Contact Number"
          style={styles.input}
          value={contact}
          onChangeText={setContact}
        />

        {/* 📄 Upload Document */}
        <TouchableOpacity style={styles.uploadBtn} onPress={pickDocument}>
          <Text style={styles.uploadText}>
            📄 {document ? document : "Upload Verification Document"}
          </Text>
        </TouchableOpacity>

        {/* 🚀 Button */}
        <TouchableOpacity style={styles.button} onPress={handlePost}>
          <Text style={styles.buttonText}>🚀 Post Ride</Text>
        </TouchableOpacity>

      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
    borderRadius: 20,
    elevation: 8,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
  },
  uploadBtn: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  uploadText: {
    color: "#333",
  },
  button: {
    backgroundColor: "#ff6f61",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
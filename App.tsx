import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState('');
  const [classification, setClassification] = useState('');

  const calculateBMI = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    if (isNaN(weightValue) || isNaN(heightValue) || heightValue === 0) {
      setResult('Por favor, digite valores válidos para peso e altura.');
      setClassification('');
      return;
    }

    const bmi = weightValue / (heightValue * heightValue);
    setResult(`Seu IMC é ${bmi.toFixed(2)}`);

    if (bmi < 18.5) {
      setClassification('Abaixo do peso');
    } else if (bmi >= 18.5 && bmi < 25) {
      setClassification('Peso normal');
    } else if (bmi >= 25 && bmi < 30) {
      setClassification('Sobrepeso');
    } else {
      setClassification('Obesidade');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>

      <View style={styles.inputContainer}>
        <Text>Peso (kg):</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          placeholder="Digite o peso"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Altura (m):</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
          placeholder="Digite a altura"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonLabel}>Calcular</Text>
      </TouchableOpacity>

      <Text style={styles.result}>{result}</Text>

      {classification !== '' && (
        <View style={styles.table}>
          <Text style={styles.tableHeader}>Classificação do IMC</Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>IMC {'<'} 18.5</Text>
            <Text style={styles.tableCell}>Abaixo do peso</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>18.5 {'<= '} IMC {'<'} 25</Text>
            <Text style={styles.tableCell}>Peso normal</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>25 {'<= '} IMC {'<'} 30</Text>
            <Text style={styles.tableCell}>Sobrepeso</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>IMC {'>= '} 30</Text>
            <Text style={styles.tableCell}>Obesidade</Text>
          </View>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
    color: '#f00',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  input: {
    width: 100,
    height: 40,
    marginHorizontal: 8,
    borderWidth: 1,
    padding: 8,
    borderRadius: 16,
  },
  button: {
    width: 180,
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#f00',
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  result: {
    fontSize: 16,
    margin: 12,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 16,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f00',
    color: '#fff',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
}
);

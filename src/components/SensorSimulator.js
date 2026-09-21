import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';

export default function SensorSimulator({
  isSimulationActive,
  onSimulateValue,
  onResetSimulation,
}) {
  if (!isSimulationActive) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.simBadge}>MODO SIMULAÇÃO (SENSOR FÍSICO INDISPONÍVEL OU NAVEGADOR)</Text>
      </View>
      <Text style={styles.simHelp}>
        Toque nos botões para simular a inclinação do aparelho:
      </Text>
      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.simBtn}
          onPress={() => onSimulateValue({ x: 0, y: 0, z: 1 })}
        >
          <Text style={styles.simBtnText}>0° Perfeito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.simBtn}
          onPress={() => onSimulateValue({ x: 0.08, y: 0.02, z: 0.99 })}
        >
          <Text style={styles.simBtnText}>+0.4° Nivelado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.simBtn}
          onPress={() => onSimulateValue({ x: 0.25, y: -0.1, z: 0.95 })}
        >
          <Text style={styles.simBtnText}>+2.5° Inclinado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.simBtn}
          onPress={() => onSimulateValue({ x: -0.6, y: 0.3, z: 0.74 })}
        >
          <Text style={styles.simBtnText}>-6.0° Desnível</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 184, 0, 0.08)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 184, 0, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  simBadge: {
    color: theme.colors.levelOff,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  simHelp: {
    color: theme.colors.textMuted,
    fontSize: 11,
    marginBottom: 6,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
  },
  simBtn: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  simBtnText: {
    color: theme.colors.textPrimary,
    fontSize: 10,
    fontWeight: '700',
  },
});

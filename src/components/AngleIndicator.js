import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { getAlignmentStatus } from '../utils/sensorMath';

export default function AngleIndicator({
  roll,
  pitch,
  primaryAngle,
  mode,
  tolerance = 0.5,
}) {
  const status = getAlignmentStatus(primaryAngle, tolerance);

  // Determina as cores dinâmicas baseadas no alinhamento
  let statusColor = theme.colors.levelOff;
  let statusGlow = theme.colors.levelOffGlow;
  let statusLabel = 'DESALINHADO';
  let instruction = '';

  if (status === 'LEVEL') {
    statusColor = theme.colors.levelSuccess;
    statusGlow = theme.colors.levelSuccessGlow;
    statusLabel = 'NIVELADO PERFEITO';
    instruction = 'Alinhamento exato dentro da tolerância';
  } else if (status === 'NEAR') {
    statusColor = theme.colors.levelNear;
    statusGlow = theme.colors.levelNearGlow;
    statusLabel = 'QUASE NIVELADO';
    instruction = primaryAngle > 0 ? 'Incline levemente para a esquerda' : 'Incline levemente para a direita';
  } else {
    statusColor = theme.colors.levelOff;
    statusGlow = theme.colors.levelOffGlow;
    statusLabel = 'DESALINHADO';
    if (mode === 'HORIZONTAL') {
      instruction = primaryAngle > 0 ? 'Abaixe o lado direito / levante o esquerdo' : 'Abaixe o lado esquerdo / levante o direito';
    } else if (mode === 'VERTICAL') {
      instruction = primaryAngle > 0 ? 'Ajuste inclinação para trás' : 'Ajuste inclinação para frente';
    } else {
      instruction = 'Ajuste os eixos até centralizar a bolha no alvo';
    }
  }

  const formattedAngle = Math.abs(primaryAngle).toFixed(1);
  const sign = primaryAngle > 0 ? '+' : primaryAngle < 0 ? '-' : '';

  return (
    <View style={styles.container}>
      {/* Badge de Status */}
      <View
        style={[
          styles.badge,
          { borderColor: statusColor, backgroundColor: statusGlow },
        ]}
      >
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={[styles.badgeText, { color: statusColor }]}>
          {statusLabel} (±{tolerance}°)
        </Text>
      </View>

      {/* Visor Numérico Principal */}
      <View style={styles.primaryDisplay}>
        <Text style={[styles.angleValue, { color: statusColor }]}>
          {sign}{formattedAngle}
          <Text style={styles.degreeUnit}>°</Text>
        </Text>
        <Text style={styles.instructionText}>{instruction}</Text>
      </View>

      {/* Medições Secundárias dos Eixos */}
      <View style={styles.secondaryGrid}>
        <View style={styles.secondaryBox}>
          <Text style={styles.secLabel}>HORIZONTAL (ROLL / X)</Text>
          <Text style={[styles.secValue, Math.abs(roll) <= tolerance && styles.secValueLevel]}>
            {roll > 0 ? `+${roll.toFixed(1)}°` : `${roll.toFixed(1)}°`}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.secondaryBox}>
          <Text style={styles.secLabel}>VERTICAL (PITCH / Y)</Text>
          <Text style={[styles.secValue, Math.abs(pitch) <= tolerance && styles.secValueLevel]}>
            {pitch > 0 ? `+${pitch.toFixed(1)}°` : `${pitch.toFixed(1)}°`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 8,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  primaryDisplay: {
    alignItems: 'center',
    marginBottom: 10,
  },
  angleValue: {
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  degreeUnit: {
    fontSize: 28,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  instructionText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: -2,
    textAlign: 'center',
  },
  secondaryGrid: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.surfaceBorder,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  secondaryBox: {
    alignItems: 'center',
    flex: 1,
  },
  secLabel: {
    color: theme.colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  secValue: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  secValueLevel: {
    color: theme.colors.levelSuccess,
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: theme.colors.surfaceBorder,
  },
});

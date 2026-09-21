import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default function ControlBar({
  isCalibrated,
  isHeld,
  tolerance,
  isHapticEnabled,
  onCalibrate,
  onResetCalibration,
  onToggleHold,
  onToggleTolerance,
  onToggleHaptic,
}) {
  return (
    <View style={styles.container}>
      {/* Botão de Tara / Calibração */}
      <TouchableOpacity
        style={[styles.button, isCalibrated && styles.buttonActive]}
        onPress={isCalibrated ? onResetCalibration : onCalibrate}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonIcon}>{isCalibrated ? '↺' : '🎯'}</Text>
        <Text style={[styles.buttonLabel, isCalibrated && styles.buttonLabelActive]}>
          {isCalibrated ? 'Resetar Tara' : 'Zerar / Calibrar'}
        </Text>
      </TouchableOpacity>

      {/* Botão de Hold / Congelar */}
      <TouchableOpacity
        style={[styles.button, isHeld && styles.buttonHoldActive]}
        onPress={onToggleHold}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonIcon}>{isHeld ? '▶' : '⏸'}</Text>
        <Text style={[styles.buttonLabel, isHeld && styles.buttonLabelHoldActive]}>
          {isHeld ? 'Destravar' : 'Travar'}
        </Text>
      </TouchableOpacity>

      {/* Botão de Precisão */}
      <TouchableOpacity
        style={styles.buttonSmall}
        onPress={onToggleTolerance}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonSmallIcon}>⚖</Text>
        <Text style={styles.buttonSmallLabel}>±{tolerance}°</Text>
      </TouchableOpacity>

      {/* Botão de Vibração */}
      <TouchableOpacity
        style={[styles.buttonSmall, isHapticEnabled && styles.buttonHapticActive]}
        onPress={onToggleHaptic}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonSmallIcon}>{isHapticEnabled ? '📳' : '📴'}</Text>
        <Text style={styles.buttonSmallLabel}>Vibração</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceBorder,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 6,
  },
  buttonActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    borderColor: theme.colors.levelNear,
  },
  buttonHoldActive: {
    backgroundColor: 'rgba(255, 184, 0, 0.18)',
    borderColor: theme.colors.levelOff,
  },
  buttonIcon: {
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  buttonLabel: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  buttonLabelActive: {
    color: theme.colors.levelNear,
  },
  buttonLabelHoldActive: {
    color: theme.colors.levelOff,
  },
  buttonSmall: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  buttonHapticActive: {
    borderColor: 'rgba(0, 255, 163, 0.3)',
  },
  buttonSmallIcon: {
    fontSize: 14,
  },
  buttonSmallLabel: {
    color: theme.colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
});

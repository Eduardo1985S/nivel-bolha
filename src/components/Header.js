import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default function Header({ isSensorActive, isCalibrated, isHeld }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.brandBadge}>
          <View style={[styles.ledIndicator, isSensorActive && styles.ledActive]} />
          <Text style={styles.brandText}>PRECISION INSTRUMENT</Text>
        </View>
        {isCalibrated && (
          <View style={styles.tareBadge}>
            <Text style={styles.tareBadgeText}>TARA ATIVA</Text>
          </View>
        )}
        {isHeld && (
          <View style={styles.holdBadge}>
            <Text style={styles.holdBadgeText}>CONGELADO</Text>
          </View>
        )}
      </View>

      <Text style={styles.mainTitle}>NÍVEL DE BOLHA</Text>
      <Text style={styles.subtitle}>Alinhamento Vertical e Horizontal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceBorder,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ledIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#64748B',
  },
  ledActive: {
    backgroundColor: theme.colors.levelSuccess,
    shadowColor: theme.colors.levelSuccess,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  brandText: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  tareBadge: {
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
  },
  tareBadgeText: {
    color: theme.colors.levelNear,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  holdBadge: {
    backgroundColor: 'rgba(255, 184, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
  },
  holdBadgeText: {
    color: theme.colors.levelOff,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  mainTitle: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 1,
  },
});

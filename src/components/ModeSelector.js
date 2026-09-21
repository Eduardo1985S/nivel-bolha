import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../styles/theme';

export const MODES = [
  { id: 'AUTO', label: 'Automático', icon: '⚡' },
  { id: 'SURFACE', label: 'Superfície 2D', icon: '🎯' },
  { id: 'HORIZONTAL', label: 'Horizontal', icon: '↔' },
  { id: 'VERTICAL', label: 'Vertical (Prumo)', icon: '↕' },
  { id: 'DUAL', label: 'Duplo', icon: '✛' },
];

export default function ModeSelector({ activeMode, onSelectMode }) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {MODES.map((mode) => {
          const isSelected = activeMode === mode.id;
          return (
            <TouchableOpacity
              key={mode.id}
              style={[styles.tab, isSelected && styles.tabSelected]}
              onPress={() => onSelectMode(mode.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabIcon, isSelected && styles.tabIconSelected]}>
                {mode.icon}
              </Text>
              <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
                {mode.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    backgroundColor: 'rgba(11, 15, 25, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceBorder,
  },
  container: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    gap: 6,
  },
  tabSelected: {
    backgroundColor: 'rgba(0, 229, 255, 0.12)',
    borderColor: theme.colors.accent,
  },
  tabIcon: {
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  tabIconSelected: {
    color: theme.colors.accent,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  tabTextSelected: {
    color: theme.colors.textPrimary,
    fontWeight: '700',
  },
});

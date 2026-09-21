import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { getLinearBubbleOffset, getAlignmentStatus } from '../utils/sensorMath';

export default function TubeLevel({
  angle,
  orientation = 'horizontal', // 'horizontal' | 'vertical'
  title = 'NÍVEL HORIZONTAL',
  tolerance = 0.5,
  length = 290,
  thickness = 64,
}) {
  const isHorizontal = orientation === 'horizontal';
  const bubbleLength = 54;
  const bubbleThickness = thickness - 16;
  const maxTravel = (length - bubbleLength) / 2 - 10;

  // Deslocamento da bolha baseado no ângulo (-10° a +10° escala máxima)
  const offset = getLinearBubbleOffset(angle, maxTravel, 8);
  const status = getAlignmentStatus(angle, tolerance);
  const isLevel = status === 'LEVEL';

  const activeColor = isLevel
    ? theme.colors.levelSuccess
    : status === 'NEAR'
    ? theme.colors.levelNear
    : theme.colors.bubbleBody;

  const containerWidth = isHorizontal ? length : thickness;
  const containerHeight = isHorizontal ? thickness : length;

  return (
    <View style={styles.wrapper}>
      {/* Título e Valor do Tubo */}
      <View style={styles.labelRow}>
        <Text style={styles.tubeTitle}>{title}</Text>
        <Text
          style={[
            styles.angleBadge,
            { color: isLevel ? theme.colors.levelSuccess : theme.colors.textPrimary },
          ]}
        >
          {angle > 0 ? `+${angle.toFixed(1)}°` : `${angle.toFixed(1)}°`}
        </Text>
      </View>

      {/* Caixa do Tubo de Nível */}
      <View
        style={[
          styles.tubeHousing,
          {
            width: containerWidth,
            height: containerHeight,
            borderRadius: thickness / 2,
          },
        ]}
      >
        {/* Fluido / Vidro */}
        <View style={[styles.glassVial, { borderRadius: thickness / 2 }]}>
          {/* Brilho cilíndrico do vidro */}
          <View
            style={[
              isHorizontal ? styles.glassHighlightH : styles.glassHighlightV,
            ]}
          />
        </View>

        {/* Marcações de Escala (Ticks) */}
        {isHorizontal ? (
          <View style={styles.ticksContainerH}>
            <View style={styles.tickMajor} />
            <View style={styles.tickMinor} />
            <View style={styles.tickMinor} />
            <View style={styles.tickMajor} />
          </View>
        ) : (
          <View style={styles.ticksContainerV}>
            <View style={[styles.tickMajor, styles.tickV]} />
            <View style={[styles.tickMinor, styles.tickV]} />
            <View style={[styles.tickMinor, styles.tickV]} />
            <View style={[styles.tickMajor, styles.tickV]} />
          </View>
        )}

        {/* Linhas de Alvo Central (Par de linhas de tolerância) */}
        <View
          style={[
            isHorizontal ? styles.targetZoneH : styles.targetZoneV,
            {
              width: isHorizontal ? bubbleLength + 6 : bubbleThickness + 4,
              height: isHorizontal ? bubbleThickness + 4 : bubbleLength + 6,
              borderColor: isLevel ? theme.colors.levelSuccess : 'rgba(255, 255, 255, 0.4)',
              backgroundColor: isLevel ? 'rgba(0, 255, 163, 0.12)' : 'transparent',
            },
          ]}
        >
          {/* Linha central zero */}
          <View
            style={[
              isHorizontal ? styles.centerZeroH : styles.centerZeroV,
              { backgroundColor: isLevel ? theme.colors.levelSuccess : 'rgba(255, 255, 255, 0.25)' },
            ]}
          />
        </View>

        {/* Bolha Flutuante */}
        <View
          style={[
            styles.bubble,
            {
              width: isHorizontal ? bubbleLength : bubbleThickness,
              height: isHorizontal ? bubbleThickness : bubbleLength,
              borderRadius: bubbleThickness / 2,
              borderColor: activeColor,
              shadowColor: activeColor,
              transform: [
                isHorizontal
                  ? { translateX: offset }
                  : { translateY: -offset }, // Inverte para subir quando inclinado
              ],
            },
          ]}
        >
          {/* Brilho especular da bolha */}
          <View style={styles.bubbleGloss} />
          <View style={[styles.bubbleCoreDot, { backgroundColor: activeColor }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 290,
    marginBottom: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  tubeTitle: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  angleBadge: {
    fontSize: 13,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  tubeHousing: {
    backgroundColor: '#0A121E',
    borderWidth: 3,
    borderColor: '#1F293D',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  glassVial: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0F243A',
  },
  glassHighlightH: {
    position: 'absolute',
    top: 4,
    left: 20,
    right: 20,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 4,
  },
  glassHighlightV: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 4,
    width: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 4,
  },
  ticksContainerH: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  ticksContainerV: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '80%',
  },
  tickMajor: {
    width: 2,
    height: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  tickMinor: {
    width: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  tickV: {
    width: 14,
    height: 2,
  },
  targetZoneH: {
    position: 'absolute',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetZoneV: {
    position: 'absolute',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerZeroH: {
    width: 1,
    height: '60%',
  },
  centerZeroV: {
    height: 1,
    width: '60%',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 240, 255, 0.2)',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  bubbleGloss: {
    position: 'absolute',
    top: 3,
    left: '20%',
    right: '20%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 3,
  },
  bubbleCoreDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.8,
  },
});

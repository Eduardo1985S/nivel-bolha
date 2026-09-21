import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { getBullseyeBubbleCoords, getAlignmentStatus } from '../utils/sensorMath';

export default function BullseyeLevel({
  roll,
  pitch,
  surfaceAngle,
  tolerance = 0.5,
  size = 260,
}) {
  const radius = size / 2;
  const bubbleSize = 52;
  const maxTravelRadius = radius - bubbleSize / 2 - 8;

  // Calcula o deslocamento da bolha
  const coords = getBullseyeBubbleCoords(roll, pitch, maxTravelRadius, 12);
  const status = getAlignmentStatus(surfaceAngle, tolerance);
  const isLevel = status === 'LEVEL';

  // Cores dinâmicas da bolha e do centro
  const activeColor = isLevel
    ? theme.colors.levelSuccess
    : status === 'NEAR'
    ? theme.colors.levelNear
    : theme.colors.bubbleBody;

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: radius }]}>
      {/* Fundo do Líquido com Reflexo de Vidro */}
      <View style={[styles.vialBackground, { borderRadius: radius }]}>
        <View style={styles.glassRefraction} />
      </View>

      {/* Linhas de Mira Cruzada */}
      <View style={[styles.crosshairH, { width: size }]} />
      <View style={[styles.crosshairV, { height: size }]} />

      {/* Círculo Externo Graduado (10°) */}
      <View
        style={[
          styles.targetRing,
          {
            width: size * 0.76,
            height: size * 0.76,
            borderRadius: (size * 0.76) / 2,
            borderColor: 'rgba(255, 255, 255, 0.12)',
          },
        ]}
      />

      {/* Círculo Intermediário Graduado (5°) */}
      <View
        style={[
          styles.targetRing,
          {
            width: size * 0.5,
            height: size * 0.5,
            borderRadius: (size * 0.5) / 2,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          },
        ]}
      />

      {/* Alvo Central (Tolerância / 0.5°) */}
      <View
        style={[
          styles.centerTarget,
          {
            width: bubbleSize + 6,
            height: bubbleSize + 6,
            borderRadius: (bubbleSize + 6) / 2,
            borderColor: isLevel ? theme.colors.levelSuccess : 'rgba(255, 255, 255, 0.35)',
            backgroundColor: isLevel ? 'rgba(0, 255, 163, 0.15)' : 'transparent',
            shadowColor: isLevel ? theme.colors.levelSuccess : 'transparent',
            shadowOpacity: isLevel ? 0.9 : 0,
            shadowRadius: 10,
          },
        ]}
      >
        <View
          style={[
            styles.centerPin,
            { backgroundColor: isLevel ? theme.colors.levelSuccess : 'rgba(255, 255, 255, 0.4)' },
          ]}
        />
      </View>

      {/* Rótulos dos graus nos eixos */}
      <Text style={[styles.axisLabel, styles.labelTop]}>N</Text>
      <Text style={[styles.axisLabel, styles.labelBottom]}>S</Text>
      <Text style={[styles.axisLabel, styles.labelLeft]}>W</Text>
      <Text style={[styles.axisLabel, styles.labelRight]}>E</Text>

      {/* A Bolha Flutuante */}
      <View
        style={[
          styles.bubble,
          {
            width: bubbleSize,
            height: bubbleSize,
            borderRadius: bubbleSize / 2,
            transform: [
              { translateX: coords.x },
              { translateY: coords.y },
            ],
            borderColor: activeColor,
            shadowColor: activeColor,
          },
        ]}
      >
        {/* Ponto focal e brilho interno da bolha */}
        <View style={styles.bubbleReflection} />
        <View style={[styles.bubbleCore, { backgroundColor: activeColor }]} />
      </View>

      {/* Aro Metálico Externo */}
      <View style={[styles.outerBezel, { width: size, height: size, borderRadius: radius }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F1A2A',
    overflow: 'hidden',
    position: 'relative',
  },
  vialBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0C1C2F',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  glassRefraction: {
    position: 'absolute',
    top: 4,
    left: '15%',
    right: '15%',
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  crosshairH: {
    position: 'absolute',
    height: 1,
    backgroundColor: theme.colors.crosshair,
  },
  crosshairV: {
    position: 'absolute',
    width: 1,
    backgroundColor: theme.colors.crosshair,
  },
  targetRing: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  centerTarget: {
    position: 'absolute',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPin: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  axisLabel: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.3)',
  },
  labelTop: { top: 8 },
  labelBottom: { bottom: 8 },
  labelLeft: { left: 8 },
  labelRight: { right: 8 },
  bubble: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 240, 255, 0.18)',
    borderWidth: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  bubbleReflection: {
    position: 'absolute',
    top: 6,
    left: 8,
    width: 12,
    height: 7,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    transform: [{ rotate: '-25deg' }],
  },
  bubbleCore: {
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.9,
  },
  outerBezel: {
    position: 'absolute',
    borderWidth: 6,
    borderColor: '#1E293B',
    pointerEvents: 'none',
  },
});

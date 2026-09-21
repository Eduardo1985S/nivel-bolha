import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Accelerometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';

import { theme } from './src/styles/theme';
import {
  applyLowPassFilter,
  applyCalibration,
  calculateAngles,
  getAlignmentStatus,
} from './src/utils/sensorMath';

import Header from './src/components/Header';
import ModeSelector from './src/components/ModeSelector';
import AngleIndicator from './src/components/AngleIndicator';
import BullseyeLevel from './src/components/BullseyeLevel';
import TubeLevel from './src/components/TubeLevel';
import ControlBar from './src/components/ControlBar';
import SensorSimulator from './src/components/SensorSimulator';

export default function App() {
  // Dados brutos e filtrados do sensor
  const [sensorData, setSensorData] = useState({ x: 0, y: 0, z: 1 });
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [isSimulationActive, setIsSimulationActive] = useState(false);

  // Estados de controle e calibração
  const [activeMode, setActiveMode] = useState('AUTO');
  const [tolerance, setTolerance] = useState(0.5); // ±0.5° padrão profissional
  const [calibration, setCalibration] = useState(null);
  const [isHeld, setIsHeld] = useState(false);
  const [heldData, setHeldData] = useState(null);
  const [isHapticEnabled, setIsHapticEnabled] = useState(true);

  // Referências para filtro passa-baixa e debounce háptico
  const prevDataRef = useRef({ x: 0, y: 0, z: 1 });
  const lastLevelStateRef = useRef(false);

  // Iniciação e subscrição ao acelerômetro
  useEffect(() => {
    let subscription = null;

    const setupSensor = async () => {
      try {
        const available = await Accelerometer.isAvailableAsync();
        if (!available) {
          setIsSimulationActive(true);
          return;
        }

        // 20ms = 50 updates por segundo (alta fluidez 60fps)
        Accelerometer.setUpdateInterval(20);

        subscription = Accelerometer.addListener((data) => {
          setIsSensorActive(true);
          setIsSimulationActive(false);

          // Aplica o filtro passa-baixa para remover ruídos e vibrações manuais
          const smoothed = applyLowPassFilter(data, prevDataRef.current, 0.2);
          prevDataRef.current = smoothed;

          setSensorData(smoothed);
        });
      } catch (err) {
        console.warn('Sensor de acelerômetro indisponível:', err);
        setIsSimulationActive(true);
      }
    };

    setupSensor();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  // Dados a serem considerados (reais ou congelados)
  const effectiveRawData = isHeld && heldData ? heldData : sensorData;

  // Aplicação da calibração de tara
  const calibratedData = applyCalibration(effectiveRawData, calibration);

  // Cálculo dos ângulos matemáticos
  const angles = calculateAngles(calibratedData);

  // Determina qual modo exibir se estiver no modo AUTO
  const resolvedMode =
    activeMode === 'AUTO'
      ? angles.isFlat
        ? 'SURFACE'
        : angles.isVertical
        ? 'VERTICAL'
        : 'HORIZONTAL'
      : activeMode;

  // Define o ângulo principal de referência para o painel digital
  let primaryAngle = angles.surfaceAngle;
  if (resolvedMode === 'HORIZONTAL') {
    primaryAngle = angles.roll;
  } else if (resolvedMode === 'VERTICAL') {
    primaryAngle = angles.verticalPlumbAngle;
  } else if (resolvedMode === 'SURFACE') {
    primaryAngle = angles.surfaceAngle;
  } else {
    // DUAL
    primaryAngle = Math.max(Math.abs(angles.roll), Math.abs(angles.pitch));
  }

  // Verifica se está perfeitamente nivelado
  const alignmentStatus = getAlignmentStatus(primaryAngle, tolerance);
  const isCurrentlyLevel = alignmentStatus === 'LEVEL';

  // Gatilho háptico quando atinge 0.0° (borda de subida para não vibrar sem parar)
  useEffect(() => {
    if (isCurrentlyLevel && !lastLevelStateRef.current && isHapticEnabled) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      }
    }
    lastLevelStateRef.current = isCurrentlyLevel;
  }, [isCurrentlyLevel, isHapticEnabled]);

  // Ações de calibração e tara
  const handleCalibrate = () => {
    // Salva o offset atual como ponto zero
    setCalibration({
      x: sensorData.x,
      y: sensorData.y,
      z: sensorData.z - 1, // mantém a gravidade de 1G no eixo Z se deitado
    });
    if (Platform.OS !== 'web' && isHapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
  };

  const handleResetCalibration = () => {
    setCalibration(null);
    if (Platform.OS !== 'web' && isHapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  };

  // Congelar leitura
  const handleToggleHold = () => {
    if (isHeld) {
      setIsHeld(false);
      setHeldData(null);
    } else {
      setIsHeld(true);
      setHeldData(sensorData);
    }
    if (Platform.OS !== 'web' && isHapticEnabled) {
      Haptics.selectionAsync().catch(() => {});
    }
  };

  // Alternar tolerância
  const handleToggleTolerance = () => {
    setTolerance((prev) => (prev === 0.5 ? 1.0 : prev === 1.0 ? 0.2 : 0.5));
  };

  // Alternar vibração
  const handleToggleHaptic = () => {
    setIsHapticEnabled((prev) => !prev);
  };

  // Simulação manual
  const handleSimulateValue = (value) => {
    setSensorData(value);
    prevDataRef.current = value;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Cabeçalho */}
      <Header
        isSensorActive={isSensorActive}
        isCalibrated={Boolean(calibration)}
        isHeld={isHeld}
      />

      {/* Seletor de Modos */}
      <ModeSelector activeMode={activeMode} onSelectMode={setActiveMode} />

      {/* Conteúdo Principal Rolável */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Painel Numérico Digital */}
        <AngleIndicator
          roll={angles.roll}
          pitch={angles.pitch}
          primaryAngle={primaryAngle}
          mode={resolvedMode}
          tolerance={tolerance}
        />

        {/* Exibição Visual dos Níveis */}
        <View style={styles.levelVisualWrapper}>
          {/* MODO SUPERFÍCIE 2D (CIRCULAR) */}
          {resolvedMode === 'SURFACE' && (
            <View style={styles.centerBox}>
              <Text style={styles.sectionTitle}>NÍVEL DE SUPERFÍCIE PLANA (2D)</Text>
              <BullseyeLevel
                roll={angles.roll}
                pitch={angles.pitch}
                surfaceAngle={angles.surfaceAngle}
                tolerance={tolerance}
                size={270}
              />
            </View>
          )}

          {/* MODO TUBULAR HORIZONTAL */}
          {resolvedMode === 'HORIZONTAL' && (
            <View style={styles.centerBox}>
              <Text style={styles.sectionTitle}>NÍVEL TUBULAR HORIZONTAL (ROLL)</Text>
              <TubeLevel
                angle={angles.roll}
                orientation="horizontal"
                title="ALINHAMENTO HORIZONTAL"
                tolerance={tolerance}
                length={300}
                thickness={66}
              />
            </View>
          )}

          {/* MODO TUBULAR VERTICAL (PRUMO) */}
          {resolvedMode === 'VERTICAL' && (
            <View style={styles.centerBox}>
              <Text style={styles.sectionTitle}>NÍVEL DE PRUMO VERTICAL (PITCH)</Text>
              <TubeLevel
                angle={angles.verticalPlumbAngle}
                orientation="vertical"
                title="ALINHAMENTO VERTICAL"
                tolerance={tolerance}
                length={280}
                thickness={66}
              />
            </View>
          )}

          {/* MODO DUPLO (HORIZONTAL + VERTICAL) */}
          {resolvedMode === 'DUAL' && (
            <View style={styles.dualContainer}>
              <Text style={styles.sectionTitle}>NÍVEIS TUBULARES COMBINADOS</Text>
              <TubeLevel
                angle={angles.roll}
                orientation="horizontal"
                title="HORIZONTAL (EIXO X)"
                tolerance={tolerance}
                length={290}
                thickness={58}
              />
              <TubeLevel
                angle={angles.verticalPlumbAngle}
                orientation="horizontal"
                title="VERTICAL / PRUMO (EIXO Y)"
                tolerance={tolerance}
                length={290}
                thickness={58}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Simulador se sensor estiver indisponível no navegador */}
      <SensorSimulator
        isSimulationActive={isSimulationActive}
        onSimulateValue={handleSimulateValue}
      />

      {/* Barra de Controles Fixa Inferior */}
      <ControlBar
        isCalibrated={Boolean(calibration)}
        isHeld={isHeld}
        tolerance={tolerance}
        isHapticEnabled={isHapticEnabled}
        onCalibrate={handleCalibrate}
        onResetCalibration={handleResetCalibration}
        onToggleHold={handleToggleHold}
        onToggleTolerance={handleToggleTolerance}
        onToggleHaptic={handleToggleHaptic}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? 32 : 0,
  },
  contentContainer: {
    paddingBottom: 24,
    alignItems: 'center',
  },
  levelVisualWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dualContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
});

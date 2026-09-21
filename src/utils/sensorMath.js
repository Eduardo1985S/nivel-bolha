/**
 * Funções matemáticas para processamento do Acelerômetro e cálculo de Nível de Bolha
 */

const RAD_TO_DEG = 180 / Math.PI;

/**
 * Filtro Passa-Baixa (Exponential Moving Average) para suavizar microtremores
 * @param {Object} current Leitura atual {x, y, z}
 * @param {Object} previous Leitura anterior {x, y, z}
 * @param {number} alpha Fator de suavização (0.1 a 0.3)
 */
export function applyLowPassFilter(current, previous, alpha = 0.22) {
  if (!previous) return current;
  return {
    x: previous.x * (1 - alpha) + current.x * alpha,
    y: previous.y * (1 - alpha) + current.y * alpha,
    z: previous.z * (1 - alpha) + current.z * alpha,
  };
}

/**
 * Aplica calibração de tara nos dados do sensor
 */
export function applyCalibration(raw, calibration) {
  if (!calibration) return raw;
  return {
    x: raw.x - (calibration.x || 0),
    y: raw.y - (calibration.y || 0),
    z: raw.z - (calibration.z || 0),
  };
}

/**
 * Calcula os ângulos de inclinação em graus
 * @param {Object} data {x, y, z} em G
 * @returns {Object} { roll, pitch, totalAngle, isFlat }
 */
export function calculateAngles(data) {
  const { x, y, z } = data;

  // Norma da aceleração
  const norm = Math.sqrt(x * x + y * y + z * z) || 1;
  const nx = x / norm;
  const ny = y / norm;
  const nz = z / norm;

  // Roll (Eixo X - inclinação esquerda/direita)
  const rollRad = Math.atan2(nx, Math.sqrt(ny * ny + nz * nz));
  const roll = rollRad * RAD_TO_DEG;

  // Pitch (Eixo Y - inclinação frente/trás)
  const pitchRad = Math.atan2(ny, Math.sqrt(nx * nx + nz * nz));
  const pitch = pitchRad * RAD_TO_DEG;

  // Ângulo total de desvio de uma superfície horizontal plana (quando celular está deitado)
  const clampedNz = Math.max(-1, Math.min(1, Math.abs(nz)));
  const surfaceAngle = Math.acos(clampedNz) * RAD_TO_DEG;

  // Ângulo tubular vertical (quando o celular está em pé na vertical - modo prumo)
  // 0 graus quando y = -1 (topo para cima perfeitamente vertical)
  const verticalPlumbAngle = Math.atan2(nx, Math.abs(ny)) * RAD_TO_DEG;

  // Ângulo tubular horizontal (quando o celular está apoiado de lado)
  const horizontalLevelAngle = Math.atan2(ny, Math.abs(nx)) * RAD_TO_DEG;

  // Identifica se o celular está deitado numa superfície (Z predominante)
  const isFlat = Math.abs(nz) > 0.75;
  // Identifica se está em pé (Y predominante)
  const isVertical = Math.abs(ny) > 0.75;
  // Identifica se está deitado de lado (X predominante)
  const isHorizontalSide = Math.abs(nx) > 0.75;

  return {
    roll: Number(roll.toFixed(1)),
    pitch: Number(pitch.toFixed(1)),
    surfaceAngle: Number(surfaceAngle.toFixed(1)),
    verticalPlumbAngle: Number(verticalPlumbAngle.toFixed(1)),
    horizontalLevelAngle: Number(horizontalLevelAngle.toFixed(1)),
    isFlat,
    isVertical,
    isHorizontalSide,
  };
}

/**
 * Avalia o status do nível baseado na tolerância
 * @param {number} angle Ângulo de desvio em graus
 * @param {number} tolerance Tolerância padrão (ex: 0.5 graus)
 * @returns {'LEVEL' | 'NEAR' | 'OFF'}
 */
export function getAlignmentStatus(angle, tolerance = 0.5) {
  const abs = Math.abs(angle);
  if (abs <= tolerance) return 'LEVEL';
  if (abs <= tolerance * 2.5) return 'NEAR';
  return 'OFF';
}

/**
 * Converte inclinação em coordenadas (x, y) de deslocamento da bolha para o nível circular 2D
 * @param {number} roll Ângulo Roll
 * @param {number} pitch Ângulo Pitch
 * @param {number} maxRadius Raio máximo que o centro da bolha pode percorrer
 * @param {number} maxAngleRange Ângulo correspondente à borda do nível (padrão 15°)
 */
export function getBullseyeBubbleCoords(roll, pitch, maxRadius, maxAngleRange = 15) {
  // O movimento da bolha flutua na direção oposta à gravidade:
  // Se inclinamos para a direita (roll positivo), a bolha vai para a direita
  // Se inclinamos para cima (pitch positivo), a bolha sobe (-y na tela)
  const normX = Math.max(-1, Math.min(1, roll / maxAngleRange));
  const normY = Math.max(-1, Math.min(1, -pitch / maxAngleRange));

  // Distância radial
  const dist = Math.sqrt(normX * normX + normY * normY);
  const clampedDist = Math.min(1, dist);
  const angle = Math.atan2(normY, normX);

  return {
    x: Math.cos(angle) * clampedDist * maxRadius,
    y: Math.sin(angle) * clampedDist * maxRadius,
  };
}

/**
 * Converte ângulo 1D em deslocamento linear da bolha num tubo
 * @param {number} angle Ângulo em graus
 * @param {number} maxTravel Metade do comprimento útil do tubo
 * @param {number} maxAngle Ângulo máximo na escala (padrão 10°)
 */
export function getLinearBubbleOffset(angle, maxTravel, maxAngle = 10) {
  const norm = Math.max(-1, Math.min(1, angle / maxAngle));
  return norm * maxTravel;
}

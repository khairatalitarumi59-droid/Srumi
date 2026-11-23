import {
  ClimateStressMode,
  GRID_SIZE,
  ZONE_DEFINITIONS,
  ZoneType,
} from '../data/sdg11Data';

export interface SimulationMetrics {
  population: number;
  pm25: number; // µg/m³ (WHO guideline <= 15)
  greenSpacePerCapita: number; // m²/kapita (WHO guideline >= 9)
  floodResilience: number; // 0 - 100%
  solarShare: number; // 0 - 100%
  todCoverage: number; // % of housing near transit
  livabilityIndex: number; // 0 - 100
  statusLabel: 'OPTIMAL' | 'CUKUP' | 'KRITIS';
  counts: Record<ZoneType, number>;
  todHousingIndices: number[];
  unbufferedRoadIndices: number[];
  diagnosis: string;
}

export interface MissionDefinition {
  id: string;
  title: string;
  targetBadge: string;
  description: string;
  criteria: {
    label: string;
    check: (metrics: SimulationMetrics, grid: ZoneType[]) => boolean;
  }[];
}

export const MISSIONS: MissionDefinition[] = [
  {
    id: 'mission-flood',
    title: 'Misi 1: Kota Tangguh Bebas Banjir',
    targetBadge: 'Target 11.5 & 11.7',
    description:
      'Rancang kota dengan populasi minimal 550 jiwa yang mampu menahan curah hujan tinggi tanpa tergenang.',
    criteria: [
      {
        label: 'Populasi minimal 550 jiwa',
        check: (m) => m.population >= 550,
      },
      {
        label: 'Ketahanan Banjir mencapai ≥ 80%',
        check: (m) => m.floodResilience >= 80,
      },
      {
        label: 'Minimal terdapat 5 petak Taman Spons & RTH',
        check: (m) => m.counts.park >= 5,
      },
    ],
  },
  {
    id: 'mission-tod',
    title: 'Misi 2: Udara Bersih & Kawasan TOD',
    targetBadge: 'Target 11.2 & 11.6',
    description:
      'Hubungkan hunian hijau dengan halte transit dan pengolah sampah agar kualitas udara memenuhi ambang aman WHO.',
    criteria: [
      {
        label: 'Kadar polusi PM2.5 di bawah 15 µg/m³',
        check: (m) => m.pm25 <= 15,
      },
      {
        label: 'Cakupan TOD (hunian dekat halte) ≥ 70%',
        check: (m) => m.todCoverage >= 70,
      },
      {
        label: 'Minimal 2 fasilitas Bank Sampah & Energi',
        check: (m) => m.counts.waste >= 2,
      },
    ],
  },
  {
    id: 'mission-2030',
    title: 'Misi 3: Kota Inklusif Ideal 2030',
    targetBadge: 'Target 11.1, 11.4 & 11.7',
    description:
      'Capai keseimbangan hunian layak, ruang hijau standar WHO, pelestarian budaya, dan energi terbarukan.',
    criteria: [
      {
        label: 'Indeks Kelayakan Huni ≥ 85 poin',
        check: (m) => m.livabilityIndex >= 85,
      },
      {
        label: 'Ruang Hijau ≥ 9.0 m² per kapita',
        check: (m) => m.greenSpacePerCapita >= 9.0,
      },
      {
        label: 'Minimal 1 Cagar Budaya & Populasi ≥ 700 jiwa',
        check: (m) => m.counts.heritage >= 1 && m.population >= 700,
      },
    ],
  },
];

function getNeighbors(index: number): number[] {
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;
  const neighbors: number[] = [];
  if (row > 0) neighbors.push(index - GRID_SIZE);
  if (row < GRID_SIZE - 1) neighbors.push(index + GRID_SIZE);
  if (col > 0) neighbors.push(index - 1);
  if (col < GRID_SIZE - 1) neighbors.push(index + 1);
  return neighbors;
}

export function evaluateCity(
  grid: ZoneType[],
  transitRatio: number,
  solarSubsidy: number,
  drainageBudget: number,
  stressMode: ClimateStressMode
): SimulationMetrics {
  const counts: Record<ZoneType, number> = {
    empty: 0,
    green_housing: 0,
    transit: 0,
    park: 0,
    waste: 0,
    heritage: 0,
    dense_road: 0,
  };

  let population = 0;
  let baseEmission = 22; // baseline ambient urban background
  let totalGreenAreaM2 = 0;
  let floodScoreSum = 22; // baseline soil capacity

  const todHousingIndices: number[] = [];
  const unbufferedRoadIndices: number[] = [];

  grid.forEach((zone, idx) => {
    counts[zone] += 1;
    const def = ZONE_DEFINITIONS[zone];
    population += def.populationDelta;
    baseEmission += def.emissionDelta;
    totalGreenAreaM2 += def.greenAreaM2;
    floodScoreSum += def.floodScore;
  });

  // Spatial synergy 1: Transit-Oriented Development (housing next to transit)
  let housingTotal = 0;
  let todHousingCount = 0;

  grid.forEach((zone, idx) => {
    const neighbors = getNeighbors(idx);
    if (zone === 'green_housing') {
      housingTotal += 1;
      const hasTransitNeighbor = neighbors.some((n) => grid[n] === 'transit');
      if (hasTransitNeighbor) {
        todHousingCount += 1;
        todHousingIndices.push(idx);
      }
    }
    if (zone === 'dense_road') {
      const hasParkNeighbor = neighbors.some((n) => grid[n] === 'park');
      if (!hasParkNeighbor) {
        unbufferedRoadIndices.push(idx);
      }
    }
  });

  const todCoverage =
    housingTotal > 0 ? Math.round((todHousingCount / housingTotal) * 100) : 0;

  // Policy slider effects
  const transitEmissionReduction = (transitRatio / 100) * (6 + counts.transit * 1.4);
  const solarEmissionReduction =
    (solarSubsidy / 100) * (3 + counts.green_housing * 0.9);
  const todBonusReduction = (todCoverage / 100) * 4.5;

  let pm25 =
    baseEmission -
    transitEmissionReduction -
    solarEmissionReduction -
    todBonusReduction;

  // Climate stress impacts
  if (stressMode === 'heatwave') {
    pm25 += 4.5 + unbufferedRoadIndices.length * 0.6;
  }

  pm25 = Math.max(5.5, Math.min(68, Number(pm25.toFixed(1))));

  // Green space per capita (m²/person)
  const effectivePop = Math.max(population, 120);
  const greenSpacePerCapita = Number((totalGreenAreaM2 / effectivePop).toFixed(1));

  // Flood resilience (0-100%)
  let floodResilience =
    floodScoreSum * 0.85 + drainageBudget * 0.42 - counts.dense_road * 1.2;
  if (stressMode === 'monsoon') {
    floodResilience -= 14;
  }
  floodResilience = Math.round(Math.max(8, Math.min(100, floodResilience)));

  // Solar share
  const solarShare = Math.round(
    Math.min(
      100,
      solarSubsidy * 0.65 +
        (counts.green_housing > 0 ? Math.min(35, counts.green_housing * 4.5) : 0)
    )
  );

  // Composite Livability Index (0-100)
  const airScore = Math.max(0, Math.min(28, ((42 - pm25) / 34) * 28));
  const greenScore = Math.max(0, Math.min(22, (greenSpacePerCapita / 11) * 22));
  const floodComponent = (floodResilience / 100) * 22;
  const mobilityComponent = (todCoverage / 100) * 14 + (transitRatio / 100) * 6;
  const communityBonus =
    (counts.heritage >= 1 ? 4 : 0) +
    (counts.waste >= 1 ? 4 : 0) -
    (population < 250 ? 12 : 0);

  const livabilityIndex = Math.round(
    Math.max(
      12,
      Math.min(
        100,
        airScore + greenScore + floodComponent + mobilityComponent + communityBonus
      )
    )
  );

  let statusLabel: 'OPTIMAL' | 'CUKUP' | 'KRITIS' = 'CUKUP';
  if (livabilityIndex >= 78 && pm25 <= 18 && floodResilience >= 70) {
    statusLabel = 'OPTIMAL';
  } else if (livabilityIndex < 52 || pm25 > 30 || floodResilience < 45) {
    statusLabel = 'KRITIS';
  }

  // Contextual urban planner insight
  let diagnosis =
    'Tata kota sudah cukup seimbang. Perhatikan kedekatan antara hunian dan simpul transit untuk memaksimalkan efisiensi energi.';
  if (stressMode === 'monsoon' && floodResilience < 65) {
    diagnosis =
      'Peringatan Uji Hujan Ekstrem: limpasan air melebihi kapasitas drainase. Tambahkan Taman Spons & RTH atau kurangi permukaan aspal padat.';
  } else if (stressMode === 'heatwave' && unbufferedRoadIndices.length >= 3) {
    diagnosis =
      'Efek Pulau Panas terdeteksi pada blok aspal tanpa kanopi pohon. Tempatkan Taman Spons bersebelahan dengan kawasan padat untuk menurunkan suhu lokal.';
  } else if (population < 250) {
    diagnosis =
      'Kapasitas hunian masih terlalu rendah. Tambahkan Hunian Hijau untuk menampung warga secara layak sesuai Target 11.1.';
  } else if (pm25 > 22) {
    diagnosis =
      'Konsentrasi PM2.5 masih di atas ambang aman. Tingkatkan rasio transportasi publik, tambahkan Halte LRT, dan aktifkan Bank Sampah.';
  } else if (greenSpacePerCapita < 9) {
    diagnosis =
      'Rasio Ruang Terbuka Hijau masih di bawah standar WHO (9 m²/kapita). Tambahkan Taman Spons agar kota lebih sejuk dan inklusif.';
  } else if (todCoverage < 60 && counts.green_housing >= 3) {
    diagnosis =
      'Sebagian Hunian Hijau belum bersebelahan dengan Halte Transit. Terapkan prinsip TOD dengan menempelkan halte tepat di sebelah blok hunian.';
  } else if (counts.heritage === 0) {
    diagnosis =
      'Kota berkelanjutan juga menjaga identitas lokal. Tambahkan minimal 1 Cagar Budaya & Komunitas untuk memenuhi Target 11.4.';
  } else if (statusLabel === 'OPTIMAL') {
    diagnosis =
      'Tata kota Anda memenuhi prinsip SDG 11: hunian terhubung transit bersih, ruang hijau memadai, dan tangguh menghadapi hujan ekstrem.';
  }

  return {
    population,
    pm25,
    greenSpacePerCapita,
    floodResilience,
    solarShare,
    todCoverage,
    livabilityIndex,
    statusLabel,
    counts,
    todHousingIndices,
    unbufferedRoadIndices,
    diagnosis,
  };
}

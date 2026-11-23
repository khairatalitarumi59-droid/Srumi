import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  CloudRain,
  Eraser,
  Landmark,
  Pause,
  Play,
  Recycle,
  RotateCcw,
  Sun,
  ThermometerSun,
  TrainFront,
  Trees,
  TrafficCone,
} from 'lucide-react';
import {
  CITY_PRESETS,
  ClimateStressMode,
  TOOL_ORDER,
  ZONE_DEFINITIONS,
  ZoneType,
} from '../data/sdg11Data';
import { evaluateCity, MISSIONS } from '../utils/simulationEngine';
import { CityGridCanvas } from './CityGridCanvas';

interface SimulatorSectionProps {
  selectedTool: ZoneType;
  onSelectTool: (tool: ZoneType) => void;
}

function getZoneIcon(zone: ZoneType) {
  switch (zone) {
    case 'green_housing':
      return <Building2 className="w-4 h-4 shrink-0" />;
    case 'transit':
      return <TrainFront className="w-4 h-4 shrink-0" />;
    case 'park':
      return <Trees className="w-4 h-4 shrink-0" />;
    case 'waste':
      return <Recycle className="w-4 h-4 shrink-0" />;
    case 'heritage':
      return <Landmark className="w-4 h-4 shrink-0" />;
    case 'dense_road':
      return <TrafficCone className="w-4 h-4 shrink-0" />;
    case 'empty':
    default:
      return <Eraser className="w-4 h-4 shrink-0" />;
  }
}

export const SimulatorSection: React.FC<SimulatorSectionProps> = ({
  selectedTool,
  onSelectTool,
}) => {
  const initialPreset = CITY_PRESETS[0];
  const [activePresetId, setActivePresetId] = useState<string>(initialPreset.id);
  const [grid, setGrid] = useState<ZoneType[]>([...initialPreset.grid]);
  const [transitRatio, setTransitRatio] = useState<number>(initialPreset.transitRatio);
  const [solarSubsidy, setSolarSubsidy] = useState<number>(initialPreset.solarSubsidy);
  const [drainageBudget, setDrainageBudget] = useState<number>(initialPreset.drainageBudget);
  const [stressMode, setStressMode] = useState<ClimateStressMode>('normal');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedParcel, setSelectedParcel] = useState<number | null>(null);
  const [hoveredParcel, setHoveredParcel] = useState<number | null>(null);
  const [activeMissionId, setActiveMissionId] = useState<string>(MISSIONS[0].id);

  const metrics = useMemo(
    () => evaluateCity(grid, transitRatio, solarSubsidy, drainageBudget, stressMode),
    [grid, transitRatio, solarSubsidy, drainageBudget, stressMode]
  );

  const activeMission =
    MISSIONS.find((m) => m.id === activeMissionId) ?? MISSIONS[0];

  const missionResults = activeMission.criteria.map((c) => ({
    label: c.label,
    passed: c.check(metrics, grid),
  }));
  const isMissionComplete = missionResults.every((r) => r.passed);

  const handleLoadPreset = (presetId: string) => {
    const preset = CITY_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePresetId(preset.id);
    setGrid([...preset.grid]);
    setTransitRatio(preset.transitRatio);
    setSolarSubsidy(preset.solarSubsidy);
    setDrainageBudget(preset.drainageBudget);
    setStressMode('normal');
    setSelectedParcel(null);
  };

  const handleReset = () => {
    handleLoadPreset(activePresetId);
  };

  const handleParcelClick = (index: number) => {
    setSelectedParcel(index);
    setGrid((prev) => {
      const next = [...prev];
      // Toggle off to empty if clicking same zone, otherwise paint selectedTool
      next[index] = prev[index] === selectedTool ? 'empty' : selectedTool;
      return next;
    });
  };

  const inspectIndex = hoveredParcel ?? selectedParcel;
  const inspectedZone =
    inspectIndex !== null ? ZONE_DEFINITIONS[grid[inspectIndex]] : ZONE_DEFINITIONS[selectedTool];

  return (
    <section id="simulator" className="py-12 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Preset Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-amber-700 mb-1.5">
              01. Laboratorium Tata Kota Interaktif
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Rancang Kota SDG 11 dan Uji Ketahanannya
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              Pilih alat zona di bawah ini lalu klik petak pada peta untuk membangun permukiman hijau, simpul transit, dan taman spons.
            </p>
          </div>

          {/* Segmented Preset Controls */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-xl self-start lg:self-auto">
            {CITY_PRESETS.map((preset) => {
              const active = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleLoadPreset(preset.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Zone Sandbox Layout: 65% Stage Left, 35% Control & Metrics Deck Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT / TOP STAGE (7/12 ~ 58-65%) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Building Palette Toolbar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs font-semibold text-slate-900">
                  Alat Zonasi Kota
                </span>
                <span className="text-xs text-slate-500">
                  {ZONE_DEFINITIONS[selectedTool].sdgTarget}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-2">
                {TOOL_ORDER.map((toolId) => {
                  const def = ZONE_DEFINITIONS[toolId];
                  const isActive = selectedTool === toolId;
                  return (
                    <button
                      key={toolId}
                      type="button"
                      onClick={() => onSelectTool(toolId)}
                      className={`flex items-center justify-center sm:flex-col gap-1.5 px-2.5 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer min-h-[44px] ${
                        isActive
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      {getZoneIcon(toolId)}
                      <span className="whitespace-nowrap truncate max-w-full">
                        {def.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Zone Explainer Strip */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="text-slate-700">
                  <span className="font-semibold text-slate-900">{inspectedZone.label}</span>
                  <span className="mx-1.5 text-slate-400" aria-hidden="true">·</span>
                  <span>{inspectedZone.description}</span>
                </div>
                <span className="font-mono tabular-nums text-slate-500 whitespace-nowrap shrink-0">
                  RTH: +{inspectedZone.greenAreaM2} m²
                </span>
              </div>
            </div>

            {/* Interactive 6x6 Grid */}
            <CityGridCanvas
              grid={grid}
              selectedTool={selectedTool}
              selectedParcel={selectedParcel}
              stressMode={stressMode}
              isPlaying={isPlaying}
              metrics={metrics}
              onParcelClick={handleParcelClick}
              onParcelHover={setHoveredParcel}
            />

            {/* Simulation Playback & Climate Stress Toolbar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Jeda Transit' : 'Putar Transit'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-500 mr-1">Uji Ketahanan Iklim:</span>
                <button
                  type="button"
                  onClick={() => setStressMode('normal')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                    stressMode === 'normal'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Normal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStressMode('monsoon')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                    stressMode === 'monsoon'
                      ? 'bg-sky-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>Hujan Ekstrem</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStressMode('heatwave')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                    stressMode === 'heatwave'
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ThermometerSun className="w-3.5 h-3.5" />
                  <span>Gelombang Panas</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT CONTROL & CONCEPT DECK (5/12 ~ 35-42%) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Live SDG 11 Metrics Panel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <p className="text-xs text-slate-500">Indeks Kelayakan Huni SDG 11</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-display text-3xl font-bold font-mono tabular-nums text-slate-900">
                      {metrics.livabilityIndex}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">/ 100 poin</span>
                  </div>
                </div>

                {/* Dual-coded status indicator (icon + explicit text) */}
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    metrics.statusLabel === 'OPTIMAL'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : metrics.statusLabel === 'CUKUP'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}
                >
                  {metrics.statusLabel === 'OPTIMAL' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>Status: {metrics.statusLabel}</span>
                </div>
              </div>

              {/* 4 Core Tabular Metrics */}
              <div className="grid grid-cols-2 gap-3 py-4 border-b border-slate-100">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500">Kualitas Udara (PM2.5)</div>
                  <div className="mt-1 flex items-baseline justify-between gap-2">
                    <span className="text-lg font-bold font-mono tabular-nums text-slate-900">
                      {metrics.pm25}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">µg/m³</span>
                  </div>
                  <div
                    className={`mt-1 text-[11px] font-medium ${
                      metrics.pm25 <= 15 ? 'text-emerald-700' : metrics.pm25 <= 24 ? 'text-amber-700' : 'text-rose-700'
                    }`}
                  >
                    {metrics.pm25 <= 15 ? 'Aman (Standar WHO)' : metrics.pm25 <= 24 ? 'Sedang' : 'Tinggi Polusi'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500">Ruang Terbuka Hijau</div>
                  <div className="mt-1 flex items-baseline justify-between gap-2">
                    <span className="text-lg font-bold font-mono tabular-nums text-slate-900">
                      {metrics.greenSpacePerCapita}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">m²/jiwa</span>
                  </div>
                  <div
                    className={`mt-1 text-[11px] font-medium ${
                      metrics.greenSpacePerCapita >= 9 ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    {metrics.greenSpacePerCapita >= 9 ? 'Penuhi WHO (≥9)' : 'Kurang dari 9 m²'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500">Ketahanan Banjir</div>
                  <div className="mt-1 flex items-baseline justify-between gap-2">
                    <span className="text-lg font-bold font-mono tabular-nums text-slate-900">
                      {metrics.floodResilience}%
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Daya Serap</span>
                  </div>
                  <div
                    className={`mt-1 text-[11px] font-medium ${
                      metrics.floodResilience >= 75 ? 'text-emerald-700' : metrics.floodResilience >= 50 ? 'text-amber-700' : 'text-rose-700'
                    }`}
                  >
                    {metrics.floodResilience >= 75 ? 'Tangguh Hujan' : metrics.floodResilience >= 50 ? 'Waspada Genangan' : 'Rawan Banjir'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500">Kapasitas Penduduk</div>
                  <div className="mt-1 flex items-baseline justify-between gap-2">
                    <span className="text-lg font-bold font-mono tabular-nums text-slate-900">
                      {metrics.population}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">jiwa</span>
                  </div>
                  <div className="mt-1 text-[11px] font-medium text-slate-600">
                    Energi Surya: {metrics.solarShare}%
                  </div>
                </div>
              </div>

              {/* Contextual Urban Diagnosis */}
              <div className="pt-4">
                <div className="text-xs font-semibold text-slate-900 mb-1">
                  Analisis Perencana Kota
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {metrics.diagnosis}
                </p>
              </div>
            </div>

            {/* Policy Parameter Sliders */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4">
              <div className="text-xs font-semibold text-slate-900">
                Tuas Kebijakan Pemerintah Kota
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label htmlFor="slider-transit" className="font-medium text-slate-700">
                    Rasio Transportasi Publik
                  </label>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    {transitRatio}%
                  </span>
                </div>
                <input
                  id="slider-transit"
                  type="range"
                  min={10}
                  max={95}
                  step={5}
                  value={transitRatio}
                  onChange={(e) => setTransitRatio(Number(e.target.value))}
                  className="w-full urban-slider"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>10% (Dominan Pribadi)</span>
                  <span>95% (Transit Terpadu)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label htmlFor="slider-solar" className="font-medium text-slate-700">
                    Subsidi Panel Surya Atap
                  </label>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    {solarSubsidy}%
                  </span>
                </div>
                <input
                  id="slider-solar"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={solarSubsidy}
                  onChange={(e) => setSolarSubsidy(Number(e.target.value))}
                  className="w-full urban-slider"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>0%</span>
                  <span>100% Energi Bersih</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label htmlFor="slider-drainage" className="font-medium text-slate-700">
                    Anggaran Drainase & Biopori
                  </label>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    {drainageBudget}%
                  </span>
                </div>
                <input
                  id="slider-drainage"
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={drainageBudget}
                  onChange={(e) => setDrainageBudget(Number(e.target.value))}
                  className="w-full urban-slider"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>10% (Minim)</span>
                  <span>100% (Kota Spons)</span>
                </div>
              </div>
            </div>

            {/* Guided Student Mission Checklist */}
            <div id="missions" className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-slate-900">
                  Tantangan Siswa Kelas 11
                </span>
                <span className="text-xs font-medium text-amber-700">
                  {activeMission.targetBadge}
                </span>
              </div>

              {/* Mission Selector Tabs */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg mb-4">
                {MISSIONS.map((m, idx) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveMissionId(m.id)}
                    className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeMissionId === m.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Misi {idx + 1}
                  </button>
                ))}
              </div>

              <h3 className="text-sm font-bold text-slate-900">{activeMission.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {activeMission.description}
              </p>

              <ul className="mt-3 space-y-2">
                {missionResults.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start gap-2 text-xs"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        item.passed ? 'text-emerald-600' : 'text-slate-300'
                      }`}
                    />
                    <span className={item.passed ? 'text-slate-900 font-medium' : 'text-slate-600'}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>

              {isMissionComplete && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                  Misi Tercapai. Kota rancangan Anda memenuhi seluruh kriteria keberlanjutan pada skenario ini.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

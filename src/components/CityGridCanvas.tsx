import React from 'react';
import {
  ClimateStressMode,
  GRID_SIZE,
  ZONE_DEFINITIONS,
  ZoneType,
} from '../data/sdg11Data';
import { SimulationMetrics } from '../utils/simulationEngine';

interface CityGridCanvasProps {
  grid: ZoneType[];
  selectedTool: ZoneType;
  selectedParcel: number | null;
  stressMode: ClimateStressMode;
  isPlaying: boolean;
  metrics: SimulationMetrics;
  onParcelClick: (index: number) => void;
  onParcelHover: (index: number | null) => void;
}

const COL_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

function ParcelArtwork({
  zone,
  isTodLinked,
  isHeatExposed,
  stressMode,
}: {
  zone: ZoneType;
  isTodLinked: boolean;
  isHeatExposed: boolean;
  stressMode: ClimateStressMode;
}) {
  switch (zone) {
    case 'green_housing':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          {/* Courtyard permeable base */}
          <rect x="8" y="14" width="64" height="56" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
          {/* Twin vertical residential blocks */}
          <rect x="14" y="24" width="24" height="38" rx="3" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" />
          <rect x="42" y="18" width="24" height="44" rx="3" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.5" />
          {/* Rooftop solar array */}
          <path d="M44 18 L64 18 L62 12 L46 12 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
          <line x1="50" y1="12" x2="50" y2="18" stroke="#BAE6FD" strokeWidth="0.8" />
          <line x1="57" y1="12" x2="57" y2="18" stroke="#BAE6FD" strokeWidth="0.8" />
          {/* Sky garden & windows */}
          <rect x="18" y="30" width="6" height="6" rx="1" fill="#FDE68A" />
          <rect x="28" y="30" width="6" height="6" rx="1" fill="#FDE68A" />
          <rect x="18" y="41" width="6" height="6" rx="1" fill="#FDE68A" />
          <rect x="28" y="41" width="6" height="6" rx="1" fill="#FDE68A" />
          <rect x="46" y="25" width="6" height="6" rx="1" fill="#FDE68A" />
          <rect x="56" y="25" width="6" height="6" rx="1" fill="#FDE68A" />
          <rect x="46" y="36" width="16" height="4" rx="2" fill="#10B981" />
          <rect x="46" y="45" width="6" height="6" rx="1" fill="#FDE68A" />
          <rect x="56" y="45" width="6" height="6" rx="1" fill="#FDE68A" />
          {/* Street tree */}
          <circle cx="15" cy="63" r="5" fill="#059669" />
          {isTodLinked && (
            <g transform="translate(56, 56)">
              <rect x="0" y="0" width="16" height="14" rx="3" fill="#0284C7" />
              <path d="M4 7 H12 M9 4 L12 7 L9 10" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
        </svg>
      );

    case 'transit':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <rect x="8" y="14" width="64" height="56" rx="6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
          {/* Elevated transit track */}
          <line x1="8" y1="36" x2="72" y2="36" stroke="#0369A1" strokeWidth="3" />
          <line x1="8" y1="42" x2="72" y2="42" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Station canopy */}
          <rect x="20" y="20" width="40" height="12" rx="4" fill="#0F172A" />
          <rect x="24" y="23" width="32" height="5" rx="2" fill="#38BDF8" />
          {/* Electric train car */}
          <rect x="25" y="31" width="30" height="14" rx="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.8" />
          <rect x="29" y="34" width="7" height="5" rx="1" fill="#0EA5E9" />
          <rect x="38" y="34" width="7" height="5" rx="1" fill="#0EA5E9" />
          <rect x="47" y="34" width="5" height="5" rx="1" fill="#0EA5E9" />
          {/* Dedicated green bike path below */}
          <rect x="12" y="53" width="56" height="9" rx="3" fill="#10B981" opacity="0.25" />
          <line x1="14" y1="57.5" x2="66" y2="57.5" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      );

    case 'park':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <rect x="8" y="14" width="64" height="56" rx="6" fill="#D1FAE5" stroke="#059669" strokeWidth="1.5" />
          {/* Sponge retention pond */}
          <path
            d="M24 44 C24 36, 54 34, 58 45 C61 54, 46 62, 33 60 C23 58, 24 51, 24 44 Z"
            fill={stressMode === 'monsoon' ? '#0284C7' : '#38BDF8'}
            opacity="0.85"
          />
          {stressMode === 'monsoon' && (
            <ellipse cx="41" cy="48" rx="10" ry="5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />
          )}
          {/* Tropical tree canopies */}
          <circle cx="22" cy="28" r="9" fill="#059669" />
          <circle cx="34" cy="24" r="7" fill="#10B981" />
          <circle cx="58" cy="27" r="8" fill="#047857" />
          <circle cx="19" cy="57" r="7" fill="#10B981" />
          <circle cx="60" cy="57" r="6" fill="#059669" />
          {/* Boardwalk path */}
          <path d="M12 40 Q40 32 68 40" fill="none" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'waste':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <rect x="8" y="14" width="64" height="56" rx="6" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5" />
          {/* Circular facility building */}
          <rect x="18" y="28" width="44" height="32" rx="4" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.5" />
          <rect x="22" y="21" width="16" height="7" rx="2" fill="#0D9488" />
          {/* Circular arrows symbol */}
          <circle cx="40" cy="44" r="10" fill="#F0FDFA" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="16 6" />
          <path d="M36 44 L39 47 L45 41" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Compost bins */}
          <rect x="46" y="22" width="12" height="6" rx="1.5" fill="#14B8A6" />
        </svg>
      );

    case 'heritage':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <rect x="8" y="14" width="64" height="56" rx="6" fill="#FFEDD5" stroke="#C2410C" strokeWidth="1.5" />
          {/* Plaza pavers */}
          <circle cx="40" cy="52" r="14" fill="#FED7AA" stroke="#EA580C" strokeWidth="1" />
          {/* Indonesian Joglo / Pendopo roof */}
          <path d="M16 40 L40 20 L64 40 Z" fill="#C2410C" stroke="#7C2D12" strokeWidth="1.5" />
          <path d="M26 28 L40 16 L54 28 Z" fill="#9A3412" />
          {/* Timber pillars */}
          <line x1="25" y1="40" x2="25" y2="54" stroke="#7C2D12" strokeWidth="2.5" />
          <line x1="35" y1="40" x2="35" y2="54" stroke="#7C2D12" strokeWidth="2.5" />
          <line x1="45" y1="40" x2="45" y2="54" stroke="#7C2D12" strokeWidth="2.5" />
          <line x1="55" y1="40" x2="55" y2="54" stroke="#7C2D12" strokeWidth="2.5" />
          <rect x="20" y="54" width="40" height="5" rx="1.5" fill="#9A3412" />
        </svg>
      );

    case 'dense_road':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <rect
            x="8"
            y="14"
            width="64"
            height="56"
            rx="6"
            fill={isHeatExposed && stressMode === 'heatwave' ? '#FEE2E2' : '#F1F5F9'}
            stroke={stressMode === 'monsoon' ? '#0284C7' : '#DC2626'}
            strokeWidth="1.5"
          />
          {/* Asphalt road cross */}
          <rect x="10" y="34" width="60" height="16" fill="#334155" />
          <line x1="14" y1="42" x2="66" y2="42" stroke="#F8FAFC" strokeWidth="1.5" strokeDasharray="6 4" />
          {/* Dense concrete blocks */}
          <rect x="14" y="18" width="20" height="13" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
          <rect x="42" y="18" width="24" height="13" rx="2" fill="#64748B" stroke="#334155" strokeWidth="1" />
          <rect x="16" y="53" width="22" height="13" rx="2" fill="#64748B" stroke="#334155" strokeWidth="1" />
          <rect x="44" y="53" width="20" height="13" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
          {/* Cars */}
          <rect x="20" y="36" width="9" height="4" rx="1" fill="#EF4444" />
          <rect x="48" y="44" width="9" height="4" rx="1" fill="#F59E0B" />
          {stressMode === 'monsoon' && (
            <path d="M16 46 Q28 42 40 46 T64 46" fill="none" stroke="#38BDF8" strokeWidth="2" opacity="0.85" />
          )}
        </svg>
      );

    case 'empty':
    default:
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <rect
            x="10"
            y="16"
            width="60"
            height="52"
            rx="6"
            fill="#F8FAFC"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <line x1="40" y1="34" x2="40" y2="50" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="32" y1="42" x2="48" y2="42" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

export const CityGridCanvas: React.FC<CityGridCanvasProps> = ({
  grid,
  selectedTool,
  selectedParcel,
  stressMode,
  isPlaying,
  metrics,
  onParcelClick,
  onParcelHover,
}) => {
  // Compute transit connections between adjacent transit stations for visual rail lines
  const transitLinks: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] !== 'transit') continue;
    const row = Math.floor(i / GRID_SIZE);
    const col = i % GRID_SIZE;
    // Check right neighbor
    if (col < GRID_SIZE - 1 && grid[i + 1] === 'transit') {
      transitLinks.push({
        x1: col * 100 + 50,
        y1: row * 100 + 50,
        x2: (col + 1) * 100 + 50,
        y2: row * 100 + 50,
      });
    }
    // Check bottom neighbor
    if (row < GRID_SIZE - 1 && grid[i + GRID_SIZE] === 'transit') {
      transitLinks.push({
        x1: col * 100 + 50,
        y1: row * 100 + 50,
        x2: col * 100 + 50,
        y2: (row + 1) * 100 + 50,
      });
    }
  }

  return (
    <div className="relative bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
      {/* Coordinate Header Row */}
      <div className="flex items-center justify-between mb-3 gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-medium text-slate-900">Peta Blok Tata Kota (6 × 6)</span>
          <span aria-hidden="true">·</span>
          <span>Klik petak untuk memasang {ZONE_DEFINITIONS[selectedTool].label}</span>
        </div>
        <div className="text-xs font-mono tabular-nums text-slate-500 whitespace-nowrap shrink-0">
          {stressMode === 'normal' && 'Kondisi: Normal'}
          {stressMode === 'monsoon' && 'Uji: Hujan Ekstrem'}
          {stressMode === 'heatwave' && 'Uji: Gelombang Panas'}
        </div>
      </div>

      {/* Grid Wrapper with Coordinate Axes */}
      <div className="relative">
        {/* Column Letters */}
        <div className="grid grid-cols-6 gap-2 pl-6 mb-1.5">
          {COL_LABELS.map((col) => (
            <div
              key={col}
              className="text-center text-[11px] font-mono font-medium text-slate-400"
            >
              {col}
            </div>
          ))}
        </div>

        <div className="flex">
          {/* Row Numbers */}
          <div className="grid grid-rows-6 gap-2 pr-2 w-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="flex items-center justify-center text-[11px] font-mono font-medium text-slate-400"
              >
                {num}
              </div>
            ))}
          </div>

          {/* 6x6 Interactive Parcel Matrix */}
          <div className="relative flex-1">
            {/* SVG Overlay for Connected Transit Corridors */}
            {transitLinks.length > 0 && (
              <svg
                viewBox="0 0 600 600"
                className="pointer-events-none absolute inset-0 w-full h-full z-10"
                aria-hidden="true"
              >
                {transitLinks.map((link, idx) => (
                  <g key={idx}>
                    <line
                      x1={link.x1}
                      y1={link.y1}
                      x2={link.x2}
                      y2={link.y2}
                      stroke="#0284C7"
                      strokeWidth="4"
                      strokeLinecap="round"
                      opacity="0.45"
                    />
                    {isPlaying && (
                      <circle r="4.5" fill="#0284C7">
                        <animateMotion
                          dur="2.4s"
                          repeatCount="indefinite"
                          path={`M ${link.x1} ${link.y1} L ${link.x2} ${link.y2} L ${link.x1} ${link.y1}`}
                        />
                      </circle>
                    )}
                  </g>
                ))}
              </svg>
            )}

            <div className="grid grid-cols-6 gap-2">
              {grid.map((zone, idx) => {
                const row = Math.floor(idx / GRID_SIZE) + 1;
                const col = COL_LABELS[idx % GRID_SIZE];
                const coord = `${col}${row}`;
                const def = ZONE_DEFINITIONS[zone];
                const isSelected = selectedParcel === idx;
                const isTodLinked = metrics.todHousingIndices.includes(idx);
                const isHeatExposed = metrics.unbufferedRoadIndices.includes(idx);

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onParcelClick(idx)}
                    onMouseEnter={() => onParcelHover(idx)}
                    onMouseLeave={() => onParcelHover(null)}
                    aria-label={`Petak ${coord}: ${def.label}`}
                    className={`group relative aspect-square rounded-xl border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 overflow-hidden bg-white ${
                      isSelected
                        ? 'border-slate-900 ring-2 ring-slate-900/15'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <ParcelArtwork
                      zone={zone}
                      isTodLinked={isTodLinked}
                      isHeatExposed={isHeatExposed}
                      stressMode={stressMode}
                    />
                    {/* Parcel Coordinate Corner Label */}
                    <span className="absolute top-1 left-1.5 text-[10px] font-mono font-medium text-slate-500 bg-white/85 px-1 rounded">
                      {coord}
                    </span>
                    {/* Subtle Hover Overlay */}
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-slate-900/80 text-white text-[10px] font-medium py-0.5 px-1 text-center opacity-0 group-hover:opacity-100 transition-opacity truncate">
                      {def.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Concise Visual Legend */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-600 inline-block" />
            <span>Koneksi Transit Aktif</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block" />
            <span>Serapan Banjir Spons</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-600 inline-block" />
            <span>Hunian Terjangkau & Surya</span>
          </span>
        </div>
        <span className="font-mono tabular-nums text-slate-500">
          TOD Terhubung: {metrics.todCoverage}%
        </span>
      </div>
    </div>
  );
};

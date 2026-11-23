import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SDG11_TARGETS, ZONE_DEFINITIONS, ZoneType } from '../data/sdg11Data';

interface TargetsMatrixSectionProps {
  onApplyZoneToSimulator: (zone: ZoneType) => void;
}

type CategoryFilter = 'all' | 'permukiman' | 'lingkungan' | 'kebijakan';

export const TargetsMatrixSection: React.FC<TargetsMatrixSectionProps> = ({
  onApplyZoneToSimulator,
}) => {
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const filteredTargets =
    filter === 'all'
      ? SDG11_TARGETS
      : SDG11_TARGETS.filter((t) => t.category === filter);

  return (
    <section id="targets" className="py-16 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-amber-700 mb-1.5">
              02. Kerangka Resmi Perserikatan Bangsa-Bangsa
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              10 Target SDG 11 dan Relevansinya di Indonesia
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              Telusuri setiap target resmi Pembangunan Berkelanjutan Nomor 11 lalu uji langsung dampaknya di simulator tata kota.
            </p>
          </div>

          {/* Interactive Filter Bar */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl self-start lg:self-auto">
            {[
              { id: 'all', label: 'Semua (10)' },
              { id: 'permukiman', label: 'Permukiman & Mobilitas' },
              { id: 'lingkungan', label: 'Lingkungan & Bencana' },
              { id: 'kebijakan', label: 'Budaya & Kebijakan' },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as CategoryFilter)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Architectural Target Grid (Zero Pill Sandwiches) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTargets.map((target) => {
            const zoneDef = ZONE_DEFINITIONS[target.linkedZone];
            return (
              <article
                key={target.code}
                className="flex flex-col justify-between p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-mono font-semibold text-amber-700">
                      Target {target.code}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{target.categoryLabel}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-900 leading-snug">
                    {target.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {target.summary}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-200/80">
                    <div className="text-xs font-semibold text-slate-800 mb-1">
                      Konteks Perkotaan Indonesia
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {target.indonesiaContext}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 flex items-center justify-between gap-4 border-t border-slate-200/80">
                  <span className="text-xs text-slate-500">
                    Alat terkait: <strong className="text-slate-800 font-medium">{zoneDef.label}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => onApplyZoneToSimulator(target.linkedZone)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-amber-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1"
                  >
                    <span>Uji di Simulator</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

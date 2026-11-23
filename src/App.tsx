import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { ZoneType } from './data/sdg11Data';
import { SimulatorSection } from './components/SimulatorSection';
import { TargetsMatrixSection } from './components/TargetsMatrixSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { StudentInnovationCanvas } from './components/StudentInnovationCanvas';

export default function App() {
  const [selectedTool, setSelectedTool] = useState<ZoneType>('green_housing');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleApplyZoneFromTarget = (zone: ZoneType) => {
    setSelectedTool(zone);
    scrollToSection('simulator');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            UrbanLab 11
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <a
              href="#simulator"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Simulator
            </a>
            <a
              href="#targets"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Target SDG 11
            </a>
            <a
              href="#case-studies"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Studi Kasus
            </a>
            <a
              href="#student-canvas"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Kanvas Inovasi
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('simulator')}
              className="px-4 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Mulai Simulasi
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Focused Editorial Hero + 4-Column SDG 11 Context Strip */}
        <section className="bg-white py-12 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-amber-700 mb-3">
                Tujuan Pembangunan Berkelanjutan 11 · Kota dan Permukiman yang Berkelanjutan
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12] text-balance">
                Laboratorium Inovasi Tata Kota untuk Pelajar SMA
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Uji dampak hunian hijau, koridor transportasi publik, dan taman resapan banjir secara langsung. Pelajari 10 target resmi PBB dan rancang proyek inovasi sekolahmu.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection('simulator')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Buka Simulator Kota</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('student-canvas')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Susun Proposal Siswa</span>
                </button>
              </div>
            </div>

            {/* 4-Column Quantitative Reference Strip */}
            <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="font-display text-2xl font-bold font-mono tabular-nums text-slate-900">
                  56%
                </div>
                <div className="text-xs font-medium text-slate-800 mt-1">
                  Populasi Tinggal di Perkotaan
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Diperkirakan mencapai 68% pada tahun 2050 menurut data PBB.
                </p>
              </div>

              <div>
                <div className="font-display text-2xl font-bold font-mono tabular-nums text-slate-900">
                  9,0 m²
                </div>
                <div className="text-xs font-medium text-slate-800 mt-1">
                  Standar Ruang Hijau per Kapita
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Batas minimal WHO untuk menjaga kesejukan dan kesehatan warga.
                </p>
              </div>

              <div>
                <div className="font-display text-2xl font-bold font-mono tabular-nums text-slate-900">
                  ≤ 15 µg/m³
                </div>
                <div className="text-xs font-medium text-slate-800 mt-1">
                  Ambang Udara Bersih PM2.5
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pedoman kualitas udara tahunan untuk menurunkan risiko pernapasan.
                </p>
              </div>

              <div>
                <div className="font-display text-2xl font-bold font-mono tabular-nums text-slate-900">
                  10 Target
                </div>
                <div className="text-xs font-medium text-slate-800 mt-1">
                  Agenda Kota Inklusif 2030
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mencakup hunian layak, transportasi publik, budaya, dan ketahanan bencana.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Two-Zone Urban Sandbox */}
        <SimulatorSection
          selectedTool={selectedTool}
          onSelectTool={setSelectedTool}
        />

        {/* 10 UN SDG 11 Targets Explorer */}
        <TargetsMatrixSection onApplyZoneToSimulator={handleApplyZoneFromTarget} />

        {/* Architectural Case Studies */}
        <CaseStudiesSection />

        {/* Student Innovation Proposal Builder */}
        <StudentInnovationCanvas />
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-900">UrbanLab 11</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Media Edukasi Interaktif SDG 11 untuk Pelajar Indonesia</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#simulator" className="hover:text-slate-900 transition-colors">
              Simulator
            </a>
            <a href="#targets" className="hover:text-slate-900 transition-colors">
              Target SDG 11
            </a>
            <a href="#case-studies" className="hover:text-slate-900 transition-colors">
              Studi Kasus
            </a>
            <a href="#student-canvas" className="hover:text-slate-900 transition-colors">
              Kanvas Inovasi
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

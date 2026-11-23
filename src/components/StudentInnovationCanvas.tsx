import React, { useState } from 'react';
import { Check, CheckSquare, Copy, Download, Square } from 'lucide-react';
import { STUDENT_PROJECT_TEMPLATES } from '../data/sdg11Data';

export const StudentInnovationCanvas: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    STUDENT_PROJECT_TEMPLATES[0].id
  );
  const currentTemplate =
    STUDENT_PROJECT_TEMPLATES.find((t) => t.id === selectedTemplateId) ??
    STUDENT_PROJECT_TEMPLATES[0];

  const [projectTitle, setProjectTitle] = useState<string>(currentTemplate.title);
  const [schoolName, setSchoolName] = useState<string>('SMA Negeri 1 / Kelas XI');
  const [location, setLocation] = useState<string>(currentTemplate.defaultLocation);
  const [durationWeeks, setDurationWeeks] = useState<number>(
    currentTemplate.defaultDurationWeeks
  );
  const [budget, setBudget] = useState<string>(currentTemplate.defaultBudget);
  const [metricTarget, setMetricTarget] = useState<string>(
    currentTemplate.defaultMetricTarget
  );
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([
    true,
    false,
    false,
    false,
  ]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectTemplate = (templateId: string) => {
    const tpl = STUDENT_PROJECT_TEMPLATES.find((t) => t.id === templateId);
    if (!tpl) return;
    setSelectedTemplateId(tpl.id);
    setProjectTitle(tpl.title);
    setLocation(tpl.defaultLocation);
    setDurationWeeks(tpl.defaultDurationWeeks);
    setBudget(tpl.defaultBudget);
    setMetricTarget(tpl.defaultMetricTarget);
    setCheckedSteps([true, false, false, false]);
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const buildProposalText = () => {
    const stepLines = currentTemplate.steps
      .map((s, i) => `${i + 1}. [${checkedSteps[i] ? 'Selesai' : 'Rencana'}] ${s}`)
      .join('\n');

    return `RANCANGAN INOVASI PELAJAR SDG 11 (KOTA & PERMUKIMAN BERKELANJUTAN)
====================================================================
Judul Proyek      : ${projectTitle}
Fokus Target      : ${currentTemplate.targetCode} (${currentTemplate.category})
Tim & Sekolah     : ${schoolName}
Lokasi Uji Coba   : ${location}
Durasi Pelaksanaan: ${durationWeeks} Minggu
Estimasi Anggaran : ${budget}

Latar Belakang Masalah:
${currentTemplate.problemStatement}

Target Dampak Terukur:
${metricTarget}

Tahapan Pelaksanaan:
${stepLines}
`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildProposalText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored if sandbox blocks clipboard
    }
  };

  const handleDownload = () => {
    const content = buildProposalText();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proposal-sdg11-${selectedTemplateId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="student-canvas" className="py-16 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-medium text-amber-700 mb-1.5">
            04. Kanvas Inovasi Siswa Kelas 11 (P5 / KIR)
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Susun Rencana Proyek SDG 11 di Sekolahmu
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Ubah konsep simulasi menjadi aksi nyata di lingkungan sekolah atau kelurahan. Pilih templat, sesuaikan parameter lokal, lalu unduh ringkasan proposalnya.
          </p>
        </div>

        {/* Template Selector Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {STUDENT_PROJECT_TEMPLATES.map((tpl) => {
            const active = tpl.id === selectedTemplateId;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tpl.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-900 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className={`text-xs font-mono ${
                    active ? 'text-amber-300' : 'text-amber-700'
                  }`}
                >
                  {tpl.targetCode}
                </div>
                <div className="mt-1 text-sm font-bold leading-snug">
                  {tpl.title}
                </div>
                <div
                  className={`mt-1.5 text-xs ${
                    active ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {tpl.category}
                </div>
              </button>
            );
          })}
        </div>

        {/* Two-Column Canvas Form + Live Proposal Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Editor */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Parameter Proyek Lokal
            </h3>

            <div>
              <label
                htmlFor="proj-title"
                className="block text-xs font-medium text-slate-700 mb-1"
              >
                Judul Inovasi
              </label>
              <input
                id="proj-title"
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="proj-school"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Tim / Kelas / Sekolah
                </label>
                <input
                  id="proj-school"
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="proj-location"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Lokasi Penerapan
                </label>
                <input
                  id="proj-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label htmlFor="proj-duration" className="font-medium text-slate-700">
                    Durasi Program
                  </label>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    {durationWeeks} Minggu
                  </span>
                </div>
                <input
                  id="proj-duration"
                  type="range"
                  min={2}
                  max={24}
                  step={1}
                  value={durationWeeks}
                  onChange={(e) => setDurationWeeks(Number(e.target.value))}
                  className="w-full urban-slider"
                />
              </div>

              <div>
                <label
                  htmlFor="proj-budget"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Estimasi Biaya Swadaya
                </label>
                <input
                  id="proj-budget"
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="proj-metric"
                className="block text-xs font-medium text-slate-700 mb-1"
              >
                Indikator Keberhasilan Terukur
              </label>
              <input
                id="proj-metric"
                type="text"
                value={metricTarget}
                onChange={(e) => setMetricTarget(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-900"
              />
            </div>

            {/* Interactive Milestone Checklist */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-900 mb-2">
                Tahapan Pelaksanaan (Tandai Progres)
              </div>
              <div className="space-y-2">
                {currentTemplate.steps.map((step, idx) => {
                  const checked = checkedSteps[idx] ?? false;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleStep(idx)}
                      className="w-full flex items-start gap-2.5 text-left p-2.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-xs leading-relaxed ${
                          checked ? 'text-slate-900 font-medium' : 'text-slate-600'
                        }`}
                      >
                        {step}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Proposal Sheet */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs text-slate-500">
                    Pratinjau Ringkasan Proposal
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                    {projectTitle || 'Judul Proyek Inovasi'}
                  </h3>
                </div>
                <span className="text-xs font-mono font-semibold text-amber-700 whitespace-nowrap shrink-0">
                  {currentTemplate.targetCode}
                </span>
              </div>

              <div className="py-4 space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Inisiator</span>
                    <span className="font-medium text-slate-900">{schoolName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Lokasi & Durasi</span>
                    <span className="font-medium text-slate-900">
                      {location} · {durationWeeks} minggu
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-900 mb-1">
                    Masalah yang Diselesaikan
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentTemplate.problemStatement}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-900 mb-1">
                    Target Dampak Terukur
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-800 font-medium">
                    {metricTarget}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-900 mb-1">
                    Estimasi Anggaran
                  </div>
                  <p className="text-xs text-slate-600">{budget}</p>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-900 mb-1.5">
                    Status Rencana Kerja ({checkedSteps.filter(Boolean).length}/{currentTemplate.steps.length} tahap ditandai)
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600">
                    {currentTemplate.steps.map((step, i) => (
                      <li
                        key={i}
                        className={checkedSteps[i] ? 'text-slate-900 font-medium' : ''}
                      >
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Rencana (.txt)</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin ke Papan Klip' : 'Salin Ringkasan'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

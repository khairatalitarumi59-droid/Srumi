import React, { useState } from 'react';
import { Building } from 'lucide-react';
import { CASE_STUDIES } from '../data/sdg11Data';

function ResilientEditorialImage({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-500 p-6 text-center">
        <Building className="w-8 h-8 mb-2 text-slate-400" />
        <span className="text-xs font-medium text-slate-700">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className="w-full h-full object-cover"
    />
  );
}

export const CaseStudiesSection: React.FC = () => {
  return (
    <section id="case-studies" className="py-16 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-medium text-amber-700 mb-1.5">
            03. Inspirasi Arsitektur & Tata Kota Nyata
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Studi Kasus Inovasi Kota Berkelanjutan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Bagaimana prinsip desain tropis, transportasi listrik, dan taman resapan diterapkan secara nyata untuk menyelesaikan persoalan kota di Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <article
              key={study.id}
              className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden"
            >
              <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden border-b border-slate-200">
                <ResilientEditorialImage
                  src={study.imagePath}
                  alt={study.imageAlt}
                  title={study.title}
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span>{study.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.target}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-900 leading-snug">
                    {study.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {study.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
                  <div>
                    <div className="text-xs font-semibold text-emerald-800">
                      Dampak Terukur
                    </div>
                    <p className="text-xs text-slate-700 mt-0.5">
                      {study.measurableImpact}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">
                      Inspirasi Aksi Pelajar
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {study.studentTakeaway}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

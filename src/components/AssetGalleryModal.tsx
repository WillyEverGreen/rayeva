import React, { useState } from 'react';
import {
  GinkgoLeaf,
  FernLeaf,
  EucalyptusSprig,
  OliveBranch,
  CircularitySeal,
  BotanicalCornerFlourish,
  BotanicalHorizontalDivider,
  OrganicWaveDivider,
} from './svg';
import {
  AmbientSporeCanvas,
  OrganicWaveCanvas,
  CircularityNetworkCanvas,
} from './canvas';
import { Sparkles, X, Copy, Check, Eye } from 'lucide-react';

export default function AssetGalleryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCode = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <>
      {/* Floating Launcher Pill (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#187E91] hover:bg-[#244835] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer text-xs font-bold border border-white/30 backdrop-blur-md"
        >
          <Sparkles size={14} className="animate-spin-slow" />
          <span>Vector & Canvas Assets</span>
        </button>
      </div>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#FAF8F3] w-full max-w-5xl rounded-[32px] shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-white border-b border-stone-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#187E91] bg-teal-50 px-3 py-1 rounded-full">
                  Rayeva Design System
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  SVG & Canvas Asset Library
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Ready-to-use vector illustrations, dynamic canvas shaders, and organic eco flourishes.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Gallery Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-12">

              {/* SECTION 1: BOTANICAL LEAF VECTORS */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-slate-900">
                    1. Botanical & Leaf Vectors
                  </h4>
                  <span className="text-xs text-stone-500">React components in <code>src/components/svg/</code></span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Ginkgo */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 flex flex-col items-center justify-between shadow-2xs">
                    <GinkgoLeaf size={64} />
                    <span className="font-bold text-xs text-stone-800 mt-3">GinkgoLeaf</span>
                    <button
                      type="button"
                      onClick={() => copyCode('ginkgo', '<GinkgoLeaf size={48} color="#244835" />')}
                      className="mt-3 w-full py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[11px] font-semibold text-stone-700 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'ginkgo' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      <span>{copiedKey === 'ginkgo' ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  {/* Fern */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 flex flex-col items-center justify-between shadow-2xs">
                    <FernLeaf size={64} />
                    <span className="font-bold text-xs text-stone-800 mt-3">FernLeaf</span>
                    <button
                      type="button"
                      onClick={() => copyCode('fern', '<FernLeaf size={54} color="#244835" />')}
                      className="mt-3 w-full py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[11px] font-semibold text-stone-700 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'fern' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      <span>{copiedKey === 'fern' ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  {/* Eucalyptus */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 flex flex-col items-center justify-between shadow-2xs">
                    <EucalyptusSprig size={64} />
                    <span className="font-bold text-xs text-stone-800 mt-3">EucalyptusSprig</span>
                    <button
                      type="button"
                      onClick={() => copyCode('euc', '<EucalyptusSprig size={50} color="#244835" />')}
                      className="mt-3 w-full py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[11px] font-semibold text-stone-700 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'euc' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      <span>{copiedKey === 'euc' ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  {/* Olive */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 flex flex-col items-center justify-between shadow-2xs">
                    <OliveBranch size={64} />
                    <span className="font-bold text-xs text-stone-800 mt-3">OliveBranch</span>
                    <button
                      type="button"
                      onClick={() => copyCode('olive', '<OliveBranch size={50} color="#244835" />')}
                      className="mt-3 w-full py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[11px] font-semibold text-stone-700 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'olive' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      <span>{copiedKey === 'olive' ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 2: INTERACTIVE CIRCULARITY SEAL & CORNER FLOURISHES */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4">
                  2. Circularity Seal & Botanical Corner Flourishes
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Circularity Seal */}
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 flex items-center justify-between gap-6 shadow-2xs">
                    <CircularitySeal size={120} />
                    <div className="flex-1">
                      <h5 className="font-bold text-sm text-slate-900">CircularitySeal</h5>
                      <p className="text-xs text-stone-600 mt-1">
                        Rotates continuously with curved SVG textPath and central core badge.
                      </p>
                      <button
                        type="button"
                        onClick={() => copyCode('seal', '<CircularitySeal size={130} spinning={true} />')}
                        className="mt-3 px-4 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedKey === 'seal' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copiedKey === 'seal' ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Corner Flourish */}
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 flex items-center justify-between gap-6 shadow-2xs">
                    <BotanicalCornerFlourish size={100} />
                    <div className="flex-1">
                      <h5 className="font-bold text-sm text-slate-900">BotanicalCornerFlourish</h5>
                      <p className="text-xs text-stone-600 mt-1">
                        Framing flourish with customizable position: <code>top-left</code>, <code>top-right</code>, etc.
                      </p>
                      <button
                        type="button"
                        onClick={() => copyCode('corner', '<BotanicalCornerFlourish size={120} position="top-right" />')}
                        className="mt-3 px-4 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedKey === 'corner' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copiedKey === 'corner' ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Horizontal Divider */}
                <div className="mt-4 bg-white p-4 rounded-2xl border border-stone-200">
                  <div className="text-xs font-bold text-stone-500 mb-2">BotanicalHorizontalDivider</div>
                  <BotanicalHorizontalDivider />
                </div>
              </div>

              {/* SECTION 3: INTERACTIVE HTML5 CANVAS SHADERS */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4">
                  3. Dynamic HTML5 Canvas Components
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Spore Canvas Preview */}
                  <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                    <div className="relative h-44 bg-[#1E3D2D] overflow-hidden">
                      <AmbientSporeCanvas particleCount={30} />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-xs font-semibold text-white/90 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
                          Hover mouse to interact with spores
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-sm text-slate-900">AmbientSporeCanvas</h5>
                        <p className="text-xs text-stone-500">Drifting pollen spores & mouse repulsion</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyCode('spore', '<AmbientSporeCanvas particleCount={40} />')}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'spore' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copiedKey === 'spore' ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Organic Wave Canvas Preview */}
                  <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                    <div className="relative h-44 bg-[#FAF8F3] overflow-hidden flex items-end">
                      <OrganicWaveCanvas height={150} />
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-sm text-slate-900">OrganicWaveCanvas</h5>
                        <p className="text-xs text-stone-500">Real-time GPU sinusoidal fluid waves</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyCode('wave', '<OrganicWaveCanvas height={140} />')}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'wave' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copiedKey === 'wave' ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION 4: STANDALONE SVG FILES IN /public/svg/ */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  4. Standalone SVG Assets (in <code>/public/svg/</code>)
                </h4>
                <p className="text-xs text-stone-600 mb-4">
                  Direct image paths you can use with standard <code>&lt;img src="/svg/..." /&gt;</code> or CSS background URLs.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    { name: 'leaf-ginkgo.svg', path: '/svg/leaf-ginkgo.svg' },
                    { name: 'leaf-fern.svg', path: '/svg/leaf-fern.svg' },
                    { name: 'leaf-eucalyptus.svg', path: '/svg/leaf-eucalyptus.svg' },
                    { name: 'leaf-monstera.svg', path: '/svg/leaf-monstera.svg' },
                    { name: 'leaf-olive.svg', path: '/svg/leaf-olive.svg' },
                    { name: 'circularity-loop.svg', path: '/svg/circularity-loop.svg' },
                    { name: 'trust-seal-round.svg', path: '/svg/trust-seal-round.svg' },
                    { name: 'organic-wave-1.svg', path: '/svg/organic-wave-1.svg' },
                    { name: 'organic-wave-2.svg', path: '/svg/organic-wave-2.svg' },
                    { name: 'botanical-branch-corner.svg', path: '/svg/botanical-branch-corner.svg' },
                    { name: 'topographic-contour.svg', path: '/svg/topographic-contour.svg' },
                  ].map((asset) => (
                    <div
                      key={asset.name}
                      className="p-3 bg-white rounded-xl border border-stone-200 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-center h-14 bg-stone-50 rounded-lg mb-2 p-1">
                        <img src={asset.path} alt={asset.name} className="h-full object-contain" />
                      </div>
                      <span className="font-mono text-[10px] text-stone-700 truncate" title={asset.name}>
                        {asset.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyCode(asset.name, `<img src="${asset.path}" alt="${asset.name}" />`)}
                        className="mt-2 w-full py-1 rounded bg-stone-100 hover:bg-stone-200 text-[10px] font-medium text-stone-700 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {copiedKey === asset.name ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                        <span>{copiedKey === asset.name ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

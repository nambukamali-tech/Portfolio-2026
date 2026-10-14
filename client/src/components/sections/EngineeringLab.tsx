import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Code2,
  Sparkles,
  Clock,
  Server,
  Workflow
} from 'lucide-react';
import { architectureLayers, apiEndpoints, type ArchitectureLayer, type ApiEndpoint } from '../../data/engineeringLabData';

export const EngineeringLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'api'>('architecture');

  // Architecture State
  const [selectedLayer, setSelectedLayer] = useState<ArchitectureLayer>(architectureLayers[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number | null>(null);

  // API Playground State
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(apiEndpoints[1]); // Default to FFM Attendance
  const [requestBody, setRequestBody] = useState<string>(apiEndpoints[1].defaultPayload || '');
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [apiResponse, setApiResponse] = useState<ReturnType<ApiEndpoint['execute']> | null>(() => apiEndpoints[1].execute(apiEndpoints[1].defaultPayload));
  const [copiedResponse, setCopiedResponse] = useState(false);

  // Run Architecture Simulation
  const handleStartSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(1);
    setSelectedLayer(architectureLayers[0]);

    const runStep = (step: number) => {
      if (step > architectureLayers.length) {
        setIsSimulating(false);
        setSimulationStep(null);
        return;
      }
      setSimulationStep(step);
      setSelectedLayer(architectureLayers[step - 1]);
      setTimeout(() => runStep(step + 1), 1400);
    };

    setTimeout(() => runStep(2), 1400);
  };

  // Switch API Endpoint
  const handleSelectEndpoint = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    const payload = endpoint.defaultPayload || '';
    setRequestBody(payload);
    setIsLoadingApi(true);
    setTimeout(() => {
      setApiResponse(endpoint.execute(payload));
      setIsLoadingApi(false);
    }, 250);
  };

  // Execute API Request
  const handleExecuteApi = () => {
    setIsLoadingApi(true);
    setTimeout(() => {
      setApiResponse(selectedEndpoint.execute(requestBody));
      setIsLoadingApi(false);
    }, 350);
  };

  // Copy API JSON Response
  const handleCopyResponse = async () => {
    if (!apiResponse) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(apiResponse.data, null, 2));
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section id="architecture" className="py-24 relative overflow-hidden bg-[#05070D]">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E172B] border border-blue-500/30 text-xs font-semibold text-cyan-300 shadow-lg shadow-blue-900/20">
            <Workflow className="w-3.5 h-3.5 text-cyan-400" />
            <span>Enterprise Engineering Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Architecture & <span className="text-gradient">API Playground</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Witness how production requests flow through decoupled <strong className="text-slate-200">Clean Architecture & MediatR CQRS</strong>, or test live simulated ASP.NET Core endpoints right in your browser.
          </p>

          {/* Interactive Navigation Tabs */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#0A1020] border border-[#1E293B] shadow-xl">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'architecture'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-[#0E172B]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Clean Architecture Flow</span>
              </button>

              <button
                onClick={() => setActiveTab('api')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'api'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-[#0E172B]'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Live API Playground</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Clean Architecture & CQRS Pipeline */}
        {activeTab === 'architecture' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Top Pipeline Bar & Controls */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0A1020]/90 border border-[#1E293B] backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Request Journey Pipeline (FFM Punch-In Flow)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click any layer to inspect C# implementation or simulate a live request pulse
                  </p>
                </div>

                <button
                  onClick={handleStartSimulation}
                  disabled={isSimulating}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isSimulating
                      ? 'bg-blue-600/30 text-cyan-300 cursor-not-allowed border border-blue-500/40'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? `Flowing Layer ${simulationStep}/5...` : 'Simulate Request Flow'}</span>
                </button>
              </div>

              {/* Step Flow Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {architectureLayers.map((layer) => {
                  const isSelected = selectedLayer.id === layer.id;
                  const isSimActive = simulationStep === layer.number;

                  return (
                    <button
                      key={layer.id}
                      onClick={() => {
                        setSelectedLayer(layer);
                        setSimulationStep(null);
                        setIsSimulating(false);
                      }}
                      className={`relative p-3.5 rounded-2xl text-left transition-all duration-300 border ${
                        isSimActive
                          ? 'bg-blue-600/30 border-cyan-400 shadow-xl shadow-cyan-500/30 ring-2 ring-cyan-400'
                          : isSelected
                          ? 'bg-[#0E172B] border-blue-500/60 shadow-lg shadow-blue-900/30'
                          : 'bg-[#05070D]/80 border-[#1E293B] hover:border-slate-700 hover:bg-[#0E172B]/50'
                      }`}
                    >
                      {/* Step Number Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                          isSimActive || isSelected
                            ? 'bg-cyan-500 text-[#05070D]'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {layer.number}
                        </span>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                          {layer.category}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-white line-clamp-1">
                        {layer.name}
                      </p>
                      <p className="text-[11px] text-cyan-300 font-mono mt-0.5 line-clamp-1">
                        {layer.badge}
                      </p>

                      {/* Animated Pulse indicator when simulation is on */}
                      {isSimActive && (
                        <motion.div
                          layoutId="pulseActive"
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Deep-Dive Layer Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Responsibilities & Explanation */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-3xl bg-[#0A1020]/90 border border-blue-500/30 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                      Layer {selectedLayer.number} of 5
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {selectedLayer.csharpFile}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white">
                      {selectedLayer.name}
                    </h4>
                    <p className="text-xs font-semibold text-cyan-300 mt-0.5">
                      {selectedLayer.badge}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedLayer.description}
                  </p>

                  <div className="pt-3 border-t border-[#1E293B] space-y-2.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Key Architectural Invariants</span>
                    </p>
                    <ul className="space-y-2">
                      {selectedLayer.keyResponsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: C# Code Viewer */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-[#0A1020] border border-[#1E293B] shadow-2xl overflow-hidden">
                  {/* Code Editor Header */}
                  <div className="px-5 py-3.5 bg-[#05070D] border-b border-[#1E293B] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                      </div>
                      <span className="ml-3 font-mono text-xs text-slate-300 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>{selectedLayer.csharpFile}</span>
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-cyan-400 bg-blue-950/60 px-2.5 py-0.5 rounded border border-blue-500/30">
                      C# .NET 8
                    </span>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="p-5 overflow-x-auto text-xs font-mono leading-relaxed bg-[#060913] text-slate-200">
                    <pre className="selection:bg-blue-600">
                      <code>{selectedLayer.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Live API Playground (Swagger / Postman Sandbox) */}
        {activeTab === 'api' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Endpoints Sidebar */}
            <div className="lg:col-span-4 space-y-3">
              <div className="p-4 rounded-3xl bg-[#0A1020]/90 border border-[#1E293B] backdrop-blur-xl shadow-xl space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Available API Endpoints</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">● 5 Live Endpoints</span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {apiEndpoints.map((ep) => {
                    const isSelected = selectedEndpoint.id === ep.id;
                    return (
                      <button
                        key={ep.id}
                        onClick={() => handleSelectEndpoint(ep)}
                        className={`w-full p-3 rounded-2xl text-left transition-all duration-200 flex flex-col gap-1 border ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500/60 shadow-md shadow-blue-900/30'
                            : 'bg-[#0E172B]/60 border-transparent hover:border-[#1E293B] hover:bg-[#0E172B]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            ep.method === 'GET'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>
                            {ep.method}
                          </span>
                          <span className="text-xs font-mono text-slate-200 truncate">
                            {ep.path}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {ep.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Request & Response Playground */}
            <div className="lg:col-span-8 space-y-4">
              <div className="rounded-3xl bg-[#0A1020] border border-[#1E293B] shadow-2xl overflow-hidden">
                {/* Method & URL Execution Bar */}
                <div className="p-4 bg-[#05070D] border-b border-[#1E293B] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex items-center gap-2 flex-1 bg-[#0E172B] border border-[#1E293B] px-3.5 py-2.5 rounded-xl">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
                      selectedEndpoint.method === 'GET'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {selectedEndpoint.method}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-white flex-1 truncate">
                      {selectedEndpoint.path}
                    </span>
                  </div>

                  <button
                    onClick={handleExecuteApi}
                    disabled={isLoadingApi}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className={`w-3.5 h-3.5 ${isLoadingApi ? 'animate-spin' : ''}`} />
                    <span>{isLoadingApi ? 'Executing...' : 'Send Request'}</span>
                  </button>
                </div>

                {/* Request Payload Editor (if POST) */}
                {selectedEndpoint.method === 'POST' && (
                  <div className="p-4 border-b border-[#1E293B] bg-[#0A1020] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Request Body (application/json)</span>
                      <button
                        onClick={() => setRequestBody(selectedEndpoint.defaultPayload || '')}
                        className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset to Default</span>
                      </button>
                    </div>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      rows={5}
                      className="w-full p-3 rounded-xl bg-[#05070D] border border-[#1E293B] text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500/60"
                      spellCheck={false}
                    />
                  </div>
                )}

                {/* Response Pane */}
                <div className="p-4 bg-[#060913] space-y-3">
                  {/* Response Meta Header */}
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#1E293B]/70">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {apiResponse?.statusText || '200 OK'}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{apiResponse?.durationMs || 18} ms</span>
                      </span>
                    </div>

                    <button
                      onClick={handleCopyResponse}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0E172B] hover:bg-[#1E293B] text-slate-300 text-xs font-medium border border-[#1E293B] transition-colors"
                    >
                      {copiedResponse ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedResponse ? 'Copied' : 'Copy Response'}</span>
                    </button>
                  </div>

                  {/* Formatted JSON Tree */}
                  <div className="max-h-96 overflow-y-auto p-4 rounded-xl bg-[#05070D] border border-[#1E293B]/50 font-mono text-xs text-slate-200">
                    <pre>
                      <code>{JSON.stringify(apiResponse?.data, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

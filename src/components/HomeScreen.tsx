import { motion } from "motion/react";
import { GraduationCap, ArrowRight, Sparkles, Brain, FileText, Languages } from "lucide-react";
import { ScreenType } from "../types";

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectFeaturePreset?: (presetText: string) => void;
}

export default function HomeScreen({ onNavigate, onSelectFeaturePreset }: HomeScreenProps) {
  const handleFeatureClick = (presetType: string) => {
    if (onSelectFeaturePreset) {
      if (presetType === "concept") {
        onSelectFeaturePreset("Quantum Entanglement");
      } else if (presetType === "step") {
        onSelectFeaturePreset("Supply & Demand Curves");
      } else if (presetType === "plain") {
        onSelectFeaturePreset("How do plants convert sunlight into food while releasing oxygen back into the atmosphere?");
      }
    }
    onNavigate("simplify");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-5 py-6 text-center"
    >
      {/* Hero Illustration / Graphic Placeholder */}
      <div className="relative w-full max-w-sm h-64 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-100/40 opacity-40 blur-3xl rounded-full"></div>
        <div className="relative z-10 w-60 p-8 glass-card rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 transform hover:scale-[1.03] transition-transform duration-500 flex flex-col items-center justify-center bg-white/70">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <Sparkles className="text-[#2563eb] w-10 h-10 animate-pulse" />
          </div>
          <div className="space-y-3 w-full">
            <div className="h-2 w-3/4 bg-blue-200/50 rounded-full mx-auto"></div>
            <div className="h-2 w-1/2 bg-blue-100/50 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Title & Headline */}
      <div className="space-y-4 max-w-lg">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
          Question Simplifier AI
        </h2>
        <p className="text-base leading-relaxed text-slate-500">
          Understand difficult study questions in simple language using AI. Our advanced algorithms break down complex concepts into bite-sized explanations.
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-8 w-full max-w-xs">
        <button
          id="btn-start-simplifying"
          onClick={() => onNavigate("simplify")}
          className="group w-full py-4 px-6 bg-[#2563eb] text-white font-semibold text-lg rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:bg-[#1d4ed8] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Start Simplifying</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
        <p className="mt-3.5 text-[11px] font-semibold text-[#516070] uppercase tracking-widest">
          Free for all students
        </p>
      </div>

      {/* Feature Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full mt-12">
        <button
          id="btn-preset-concept"
          onClick={() => handleFeatureClick("concept")}
          className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all active:scale-[0.97] flex flex-col items-center gap-2 text-center group"
        >
          <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-blue-100/70 transition-colors">
            <Brain className="w-5 h-5 text-[#2563eb]" />
          </div>
          <span className="text-xs font-semibold text-slate-700">Concept Mapping</span>
        </button>

        <button
          id="btn-preset-step"
          onClick={() => handleFeatureClick("step")}
          className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all active:scale-[0.97] flex flex-col items-center gap-2 text-center group"
        >
          <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-blue-100/70 transition-colors">
            <FileText className="w-5 h-5 text-[#2563eb]" />
          </div>
          <span className="text-xs font-semibold text-slate-700">Step-by-Step</span>
        </button>

        <button
          id="btn-preset-plain"
          onClick={() => handleFeatureClick("plain")}
          className="col-span-2 md:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all active:scale-[0.97] flex flex-col items-center gap-2 text-center group"
        >
          <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-blue-100/70 transition-colors">
            <Languages className="w-5 h-5 text-[#2563eb]" />
          </div>
          <span className="text-xs font-semibold text-slate-700">Plain English</span>
        </button>
      </div>
    </motion.div>
  );
}

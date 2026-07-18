import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, HelpCircle, FileText, Lightbulb, Puzzle, Copy, Check, RotateCcw, AlertCircle } from "lucide-react";
import { SimplificationResult } from "../types";

interface SimplifyScreenProps {
  initialQuestion: string;
  onClearInitialQuestion: () => void;
}

export default function SimplifyScreen({ initialQuestion, onClearInitialQuestion }: SimplifyScreenProps) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SimplificationResult | null>(null);
  const [copied, setCopied] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Set initial question if passed from feature click on Home Screen
  useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion);
      onClearInitialQuestion();
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [initialQuestion, onClearInitialQuestion]);

  // Loading steps animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 4);
      }, 1800);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const loadingMessages = [
    "Reading study prompt...",
    "Analyzing core technical concepts...",
    "Formulating friendly analogies...",
    "Styling clarity results...",
  ];

  const handleSimplify = async () => {
    // 1. Validate that it is not empty
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to simplify the question right now. Please try again.");
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("Unable to simplify the question right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    
    const keyConceptsText = result.keyConcepts
      .map((c) => `- ${c}`)
      .join("\n");

    const textToCopy = `Simplified Question:
${result.simplifiedQuestion}

Explanation:
${result.explanation}

Key Concepts:
${keyConceptsText}

Helpful Hint:
${result.helpfulHint}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setResult(null);
    setQuestion("");
    setError(null);
  };

  const handlePresetClick = (presetText: string) => {
    setQuestion(presetText);
    setError(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-5 py-6">
      <AnimatePresence mode="wait">
        {/* Loader view */}
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-6"
          >
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin"></div>
              <Sparkles className="w-8 h-8 text-[#2563eb] animate-pulse" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-slate-800 transition-all duration-300">
                {loadingMessages[loadingStep]}
              </p>
              <p className="text-xs text-slate-400">Removing cognitive noise with AI...</p>
            </div>
          </motion.div>
        )}

        {/* Results Screen State */}
        {!loading && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Results Title */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Simplification Results
              </h2>
              <p className="text-sm text-slate-500 mt-1">We've broken down the complexity for you.</p>
            </div>

            {/* Grid of Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Simplified Question */}
              <section className="bg-white p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100 md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-[#2563eb]" />
                  <h3 className="text-xs font-bold text-[#2563eb] uppercase tracking-wider">
                    Simplified Question
                  </h3>
                </div>
                <p className="text-[17px] font-semibold text-slate-800 leading-snug">
                  {result.simplifiedQuestion}
                </p>
              </section>

              {/* Card 2: Explanation */}
              <section className="bg-white p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-slate-500" />
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Explanation
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {result.explanation}
                </p>
              </section>

              {/* Card 3: Key Concepts */}
              <section className="bg-white p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <Puzzle className="w-5 h-5 text-slate-500" />
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Key Concepts
                  </h3>
                </div>
                <ul className="space-y-3">
                  {result.keyConcepts.map((concept, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#2563eb] mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 leading-normal">
                        {concept}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Card 4: Helpful Hint */}
              <section className="bg-[#dbe4f8]/30 p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-[#d5e4f8] md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#bc4800]" />
                  <h3 className="text-xs font-bold text-[#bc4800] uppercase tracking-wider">
                    Helpful Hint
                  </h3>
                </div>
                <div className="bg-white/80 p-4 rounded-xl italic text-sm text-slate-700 border border-white">
                  {result.helpfulHint}
                </div>
              </section>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button
                id="btn-copy-response"
                onClick={handleCopy}
                className="w-full sm:flex-1 h-12 flex items-center justify-center gap-2 px-6 rounded-xl border-2 border-[#2563eb] text-[#2563eb] font-semibold text-sm hover:bg-blue-50 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy Response"}</span>
              </button>
              <button
                id="btn-simplify-another"
                onClick={handleReset}
                className="w-full sm:flex-1 h-12 flex items-center justify-center gap-2 px-6 rounded-xl bg-[#2563eb] text-white font-semibold text-sm hover:bg-[#1d4ed8] shadow-md active:scale-95 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Simplify Another</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Form Entry State */}
        {!loading && !result && (
          <motion.div
            key="input-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Header Section */}
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Simplify</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Paste complex questions or concepts below. We'll break them down into digestible, simple explanations.
              </p>
            </div>

            {/* Error Message if any */}
            {error && (
              <div className="flex items-start gap-2.5 p-4 bg-red-50 text-red-800 rounded-xl border border-red-100 text-sm">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {/* Input Card Container */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 space-y-4">
              <div className="relative group">
                <textarea
                  id="textarea-study-question"
                  ref={textareaRef}
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    if (error) setError(null);
                  }}
                  className="w-full min-h-[220px] bg-slate-50/50 border border-slate-200 focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] rounded-xl p-4 text-slate-800 text-[15px] placeholder:text-slate-400 transition-all duration-200 resize-none outline-none"
                  placeholder="Paste your study question here..."
                ></textarea>
              </div>

              {/* Action Buttons Area */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <Sparkles className="w-4 h-4 text-[#2563eb]" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">AI-Powered Reduction</span>
                </div>
                <button
                  id="btn-submit-simplify"
                  onClick={handleSimplify}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl font-semibold text-sm shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Simplify Question</span>
                </button>
              </div>
            </div>

            {/* Suggestion Chips */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Try an example
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  id="chip-preset-quantum"
                  onClick={() => handlePresetClick("Quantum Entanglement")}
                  className="bg-blue-50 hover:bg-blue-100/80 text-[#004ac6] px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Quantum Entanglement
                </button>
                <button
                  id="chip-preset-supply"
                  onClick={() => handlePresetClick("Supply & Demand Curves")}
                  className="bg-blue-50 hover:bg-blue-100/80 text-[#004ac6] px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Supply &amp; Demand Curves
                </button>
                <button
                  id="chip-preset-chemistry"
                  onClick={() => handlePresetClick("Organic Chemistry Bonds")}
                  className="bg-blue-50 hover:bg-blue-100/80 text-[#004ac6] px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Organic Chemistry Bonds
                </button>
              </div>
            </div>

            {/* Visual Context Banner Card */}
            <div className="relative h-44 rounded-2xl overflow-hidden shadow-sm mt-6 group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDmJTleIf9sDe0dyidFn_jdGw3lt12W4cWxjiex7KmpUI2HIhO8Du3Dm5XVDAyQ0K9Q1xJ0DLDNNIr-zGI8s_LWYecvFUr0tlMBXhvPaAmIhNNi_8ox0MGfFMG1HTwuOWZ6DMBlttQEXUJ4xG5ASw_7KlSw29OEMGidf2GcfFdJCuEj_tHZ7G77lto8np6YR8bA5WtsPpDQW8QjsVi_1C_h_ZOqwPBjBbSgQsJOOZ1fpfcZkrpky_asVe0RyZ3MMMduy4a6s71gBhdX')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent flex items-end p-5">
                <p className="text-white text-xs font-medium italic">
                  "Complexity is the enemy of execution."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

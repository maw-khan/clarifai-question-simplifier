import { motion } from "motion/react";
import { Brain, EyeOff, CheckCircle2, Zap, Sparkles, Code, Github, Globe } from "lucide-react";
import developerImg from "../assets/images/developer_exact_photo_1784415850834.jpg";

export default function AboutScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex-1 w-full max-w-2xl mx-auto px-5 py-6 space-y-12"
    >
      {/* Hero Brand Identity */}
      <section className="flex flex-col items-center text-center pt-8">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-md shadow-blue-200">
          <Sparkles className="text-white w-9 h-9" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Clarity Through Reduction
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed max-w-md">
          SimplifAI is a high-focus environment designed to distill complex subjects into manageable insights using advanced neural processing.
        </p>
      </section>

      {/* Bento Grid Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* App Purpose */}
        <div className="sm:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Brain className="w-5 h-5 text-[#2563eb]" />
            </div>
            <h3 className="text-base font-bold text-slate-800">The Intelligence</h3>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Our AI models leverage Large Language Model architectures to analyze educational content. By identifying core concepts and hierarchical structures, we remove cognitive noise, allowing students to focus on what truly matters.
          </p>
        </div>

        {/* System Status */}
        <div className="bg-[#d5e4f8] p-6 rounded-2xl shadow-sm border border-blue-100/50 hover:scale-[1.01] transition-transform duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#004ac6]">
                System Status
              </span>
              <span className="bg-[#2563eb] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                Live
              </span>
            </div>
            <h3 className="text-3xl font-extrabold text-[#00174b] tracking-tight">v1.0.0</h3>
            <p className="text-xs text-slate-600 mt-1">Stable Build: Apollo-1</p>
          </div>
          <div className="mt-4">
            <div className="w-full h-1 bg-blue-200/50 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-[#2563eb] animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        <div className="sm:col-span-3 bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
          <div className="flex flex-col items-center justify-center text-center gap-5 relative z-10">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border-2 border-white">
              <img
                className="w-full h-full object-cover"
                alt="Muhammad Ali Waris Khan"
                src={developerImg}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center flex flex-col items-center">
              <h3 className="text-lg font-bold text-slate-800">Muhammad Ali Waris Khan</h3>
              <p className="text-sm font-semibold text-[#2563eb]">AI/ML Student</p>
              <p className="text-xs text-slate-500 italic mt-0.5">Final ACT-AI Project</p>
              
              {/* Clickable social icons */}
              <div className="mt-3 flex justify-center gap-3">
                <a
                  id="link-github"
                  href="https://github.com/maw-khan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors shadow-sm"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  id="link-portfolio"
                  href="https://mawk-portfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors shadow-sm"
                  aria-label="Portfolio Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          {/* Abstract visual background element */}
          <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Code className="w-28 h-28 text-slate-800" />
          </div>
        </div>
      </div>

      {/* App Values */}
      <section className="space-y-8 pt-4">
        <h3 className="text-lg font-bold text-center text-slate-800">Our Core Philosophies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center space-y-2 flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#2563eb] mb-2 shadow-sm">
              <EyeOff className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Zero Distraction</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Interfaces designed to disappear, keeping your attention on learning.
            </p>
          </div>

          <div className="text-center space-y-2 flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#2563eb] mb-2 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Verifiable Truth</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              AI-generated summaries cross-referenced with academic standards.
            </p>
          </div>

          <div className="text-center space-y-2 flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#2563eb] mb-2 shadow-sm">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Rapid Synthesis</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Convert hours of reading into minutes of deep understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pt-8 border-t border-slate-100">
        <p className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">
          © 2026 SimplifAI Project. Built with focused intent.
        </p>
      </footer>
    </motion.div>
  );
}

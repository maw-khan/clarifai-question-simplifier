import { Home, Sparkles, Info } from "lucide-react";
import { ScreenType } from "../types";

interface BottomNavProps {
  currentScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
}

export default function BottomNav({ currentScreen, onScreenChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white z-50 rounded-t-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-t border-slate-100">
      <div className="flex justify-around items-center px-4 py-3 max-w-lg mx-auto">
        {/* Home */}
        <button
          id="nav-btn-home"
          onClick={() => onScreenChange("home")}
          className={`flex flex-col items-center justify-center px-5 py-1.5 rounded-xl transition-all duration-200 active:scale-95 ${
            currentScreen === "home"
              ? "bg-[#d5e4f8] text-[#004ac6] font-semibold"
              : "text-[#516070] hover:bg-slate-50"
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${currentScreen === "home" ? "fill-current" : ""}`} />
          <span className="text-[12px] tracking-wide">Home</span>
        </button>

        {/* Simplify */}
        <button
          id="nav-btn-simplify"
          onClick={() => onScreenChange("simplify")}
          className={`flex flex-col items-center justify-center px-5 py-1.5 rounded-xl transition-all duration-200 active:scale-95 ${
            currentScreen === "simplify"
              ? "bg-[#d5e4f8] text-[#004ac6] font-semibold"
              : "text-[#516070] hover:bg-slate-50"
          }`}
        >
          <Sparkles className={`w-5 h-5 mb-0.5 ${currentScreen === "simplify" ? "fill-current" : ""}`} />
          <span className="text-[12px] tracking-wide">Simplify</span>
        </button>

        {/* About */}
        <button
          id="nav-btn-about"
          onClick={() => onScreenChange("about")}
          className={`flex flex-col items-center justify-center px-5 py-1.5 rounded-xl transition-all duration-200 active:scale-95 ${
            currentScreen === "about"
              ? "bg-[#d5e4f8] text-[#004ac6] font-semibold"
              : "text-[#516070] hover:bg-slate-50"
          }`}
        >
          <Info className={`w-5 h-5 mb-0.5 ${currentScreen === "about" ? "fill-current" : ""}`} />
          <span className="text-[12px] tracking-wide">About</span>
        </button>
      </div>
    </nav>
  );
}

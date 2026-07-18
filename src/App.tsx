import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { ScreenType } from "./types";
import HomeScreen from "./components/HomeScreen";
import SimplifyScreen from "./components/SimplifyScreen";
import AboutScreen from "./components/AboutScreen";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("home");
  const [presetQuestion, setPresetQuestion] = useState("");

  // Scroll to top whenever screen changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  const handleSelectFeaturePreset = (questionText: string) => {
    setPresetQuestion(questionText);
  };

  const handleClearPreset = () => {
    setPresetQuestion("");
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-800 flex flex-col font-sans pb-28">
      {/* Centered Sticky TopAppBar */}
      <header className="sticky top-0 w-full bg-white z-40 border-b border-slate-100">
        <div className="flex items-center justify-center h-16 px-5 w-full">
          <button
            id="logo-brand-header"
            onClick={() => setCurrentScreen("home")}
            className="flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all outline-none"
          >
            <GraduationCap className="text-[#2563eb] w-6 h-6 fill-[#2563eb]" />
            <h1 className="text-xl font-bold text-[#2563eb] tracking-tight font-sans">
              SimplifAI
            </h1>
          </button>
        </div>
      </header>

      {/* Main Screen Views with Smooth Container */}
      <main className="flex-1 flex flex-col w-full">
        {currentScreen === "home" && (
          <HomeScreen
            onNavigate={setCurrentScreen}
            onSelectFeaturePreset={handleSelectFeaturePreset}
          />
        )}
        {currentScreen === "simplify" && (
          <SimplifyScreen
            initialQuestion={presetQuestion}
            onClearInitialQuestion={handleClearPreset}
          />
        )}
        {currentScreen === "about" && <AboutScreen />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
    </div>
  );
}

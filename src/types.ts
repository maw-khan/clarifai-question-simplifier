export interface SimplificationResult {
  simplifiedQuestion: string;
  explanation: string;
  keyConcepts: string[];
  helpfulHint: string;
}

export type ScreenType = 'home' | 'simplify' | 'about';

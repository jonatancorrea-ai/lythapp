export interface StrategyRow {
  hook: string;
  angulo: string;
  enfoque: string;
  formato: string;
  emocion: string;
  percentage: number;
}

export interface WorkspaceTemplate {
  label: string;
  whoAreYou: string;
  whoAreYouTalkingTo: string;
  whatToCommunicate: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'download';
}

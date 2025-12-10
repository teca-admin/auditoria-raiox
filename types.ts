
export interface AuditStats {
  total: number;
  validated: number;
  invalid: number;
  nonComplianceRate: number; // Percentual de não conformidade
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface WebhookResponse {
  message?: string;
  data?: Partial<AuditStats>;
  // Allow for flexible response from n8n
  [key: string]: any;
}

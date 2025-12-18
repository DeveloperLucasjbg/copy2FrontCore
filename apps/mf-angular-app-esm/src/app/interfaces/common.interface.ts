export interface ResponseCommon<T> {
    code?: number;
    message?: string;
    payload?: T;
}

export type AcronymAPP = "VEVO" | "OCL";
export type NameApp = "Venta en Verde" | "Onboarding Garantía Técnica Chile";

export interface ResponseAlert {
  message: string;
  type: '' | 'WARN' | 'ERROR' | 'SUCCESS' | 'INFO';
  closable: boolean;
  monitoringCode: string;
  duration: number | null;
}

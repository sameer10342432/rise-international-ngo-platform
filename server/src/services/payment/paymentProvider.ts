export interface CreateSessionParams {
  amount: number;
  currency: string;
  donorName: string;
  email: string;
  frequency: 'one_time' | 'monthly';
  purpose: string;
  metadata?: Record<string, string>;
}

export interface PaymentSessionResult {
  sessionId: string;
  transactionId: string;
  checkoutUrl: string;
  amount: number;
  currency: string;
}

export interface IPaymentProvider {
  createPaymentSession(params: CreateSessionParams): Promise<PaymentSessionResult>;
  verifyWebhookSignature(rawBody: string | Buffer, signature: string): boolean;
  parseWebhookEvent(rawBody: string | Buffer): {
    eventType: string;
    transactionId: string;
    status: 'completed' | 'failed';
  };
}

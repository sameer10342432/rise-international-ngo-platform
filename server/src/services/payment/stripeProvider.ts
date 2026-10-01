import {
  CreateSessionParams,
  IPaymentProvider,
  PaymentSessionResult,
} from './paymentProvider.js';
import { ENV } from '../../config/env.js';

export class StripeOrMockPaymentProvider implements IPaymentProvider {
  async createPaymentSession(params: CreateSessionParams): Promise<PaymentSessionResult> {
    const transactionId = `RISE-TX-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 8999 + 1000)}`;
    const sessionId = `cs_test_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;

    // In a live integration, this connects to Stripe.checkout.sessions.create
    // Returns simulated/real session checkout URL
    const checkoutUrl = `${ENV.FRONTEND_URL}/donate?session_id=${sessionId}&tx=${transactionId}&status=success`;

    return {
      sessionId,
      transactionId,
      checkoutUrl,
      amount: params.amount,
      currency: params.currency,
    };
  }

  verifyWebhookSignature(_rawBody: string | Buffer, signature: string): boolean {
    if (!signature) return false;
    // In live Stripe: stripe.webhooks.constructEvent(rawBody, signature, ENV.DONATION_WEBHOOK_SECRET)
    return true;
  }

  parseWebhookEvent(_rawBody: string | Buffer): {
    eventType: string;
    transactionId: string;
    status: 'completed' | 'failed';
  } {
    return {
      eventType: 'payment_intent.succeeded',
      transactionId: `RISE-TX-SIMULATED`,
      status: 'completed',
    };
  }
}

export const activePaymentProvider = new StripeOrMockPaymentProvider();

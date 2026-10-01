import nodemailer from 'nodemailer';
import { ENV } from '../../config/env.js';
import {
  getDonationEmailHtml,
  getContactNotificationEmailHtml,
  getVolunteerNotificationEmailHtml,
} from './templates.js';

let transporter: nodemailer.Transporter | null = null;

if (ENV.SMTP_USER && ENV.SMTP_PASSWORD) {
  transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,
    secure: ENV.SMTP_PORT === 465,
    auth: {
      user: ENV.SMTP_USER,
      pass: ENV.SMTP_PASSWORD,
    },
  });
}

export const emailService = {
  async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    if (!transporter) {
      console.log(`[Email Service - Simulated] To: ${to} | Subject: "${subject}"`);
      return true;
    }

    try {
      await transporter.sendMail({
        from: ENV.SMTP_FROM,
        to,
        subject,
        html,
      });
      return true;
    } catch (error) {
      console.error('[Email Service] Error dispatching email:', error);
      return false;
    }
  },

  async sendDonationReceipt(donorEmail: string, donorName: string, amount: number, frequency: string, purpose: string, txId: string) {
    const html = getDonationEmailHtml(donorName, amount, frequency, purpose, txId);
    return this.sendEmail(donorEmail, `Your RISE International Tax-Deductible Donation Receipt (${txId})`, html);
  },

  async sendContactAlert(name: string, email: string, subject: string, message: string) {
    const html = getContactNotificationEmailHtml(name, email, subject, message);
    return this.sendEmail(ENV.SMTP_FROM, `[Website Enquiry] ${subject} from ${name}`, html);
  },

  async sendVolunteerAlert(name: string, email: string, country: string, area: string, message: string) {
    const html = getVolunteerNotificationEmailHtml(name, email, country, area, message);
    return this.sendEmail(ENV.SMTP_FROM, `[Volunteer Application] New submission from ${name} (${country})`, html);
  },
};

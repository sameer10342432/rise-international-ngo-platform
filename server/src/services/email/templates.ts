export function getDonationEmailHtml(donorName: string, amount: number, frequency: string, purpose: string, txId: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #121B2E; background: #ffffff; border-radius: 12px; border: 1px solid #DDE4EC;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #0B2145; margin: 0;">RISE INTERNATIONAL</h2>
        <p style="color: #16B866; font-size: 14px; margin: 4px 0 0;">Empowering Communities. Transforming Lives.</p>
      </div>
      <p style="font-size: 16px;">Dear <strong>${donorName}</strong>,</p>
      <p style="line-height: 1.6;">Thank you for your generous <strong>$${amount} (${frequency === 'monthly' ? 'monthly recurring' : 'one-time'})</strong> contribution to RISE International.</p>
      <div style="background: #F1F3FF; padding: 16px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 4px 0;"><strong>Receipt / Transaction ID:</strong> ${txId}</p>
        <p style="margin: 4px 0;"><strong>Designated Purpose:</strong> ${purpose}</p>
        <p style="margin: 4px 0;"><strong>Status:</strong> Completed & Verified</p>
      </div>
      <p style="font-size: 13px; color: #5D6878; line-height: 1.5;">88% of your donation is deployed directly into frontline community development, clean solar water boreholes, and classroom kits. This email serves as your official 501(c)(3) tax deduction confirmation.</p>
      <p style="margin-top: 24px;">With heartfelt gratitude,<br/><strong>The RISE International Team</strong></p>
    </div>
  `;
}

export function getContactNotificationEmailHtml(name: string, email: string, subject: string, message: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #121B2E;">
      <h3 style="color: #0B2145;">New Contact Enquiry Received - RISE International</h3>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <div style="background: #F7F9FC; padding: 16px; border-radius: 8px; border-left: 4px solid #16B866;">
        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
      </div>
    </div>
  `;
}

export function getVolunteerNotificationEmailHtml(name: string, email: string, country: string, area: string, message: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #121B2E;">
      <h3 style="color: #0B2145;">New Volunteer Application Received</h3>
      <p><strong>Applicant:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Area of Interest:</strong> ${area}</p>
      <div style="background: #F7F9FC; padding: 16px; border-radius: 8px; border-left: 4px solid #1479E8;">
        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
      </div>
    </div>
  `;
}

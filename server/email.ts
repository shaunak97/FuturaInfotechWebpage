import { MailService } from '@sendgrid/mail';
import { ContactSubmission } from '@shared/schema';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable is not set. Email notifications will not work.");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text: string; // Making text required
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn("Cannot send email: SENDGRID_API_KEY is not set");
    return false;
  }

  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendContactNotification(submission: ContactSubmission): Promise<boolean> {
  // Format the date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();
  
  const emailHtml = `
    <h1>New Contact Form Submission</h1>
    <p><strong>Received:</strong> ${formattedDate}</p>
    <hr>
    <h2>Contact Details</h2>
    <p><strong>Name:</strong> ${submission.name}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Phone:</strong> ${submission.phone || 'Not provided'}</p>
    <p><strong>Event Type:</strong> ${submission.eventType}</p>
    <hr>
    <h2>Message</h2>
    <p>${submission.message.replace(/\n/g, '<br>')}</p>
  `;

  const emailText = `
New Contact Form Submission
Received: ${formattedDate}

CONTACT DETAILS
Name: ${submission.name}
Email: ${submission.email}
Phone: ${submission.phone || 'Not provided'}
Event Type: ${submission.eventType}

MESSAGE
${submission.message}
  `;

  // Use environment variables for email addresses or default values
  const toEmail = process.env.NOTIFICATION_EMAIL || "info@elevateevents.com";
  const fromEmail = process.env.FROM_EMAIL || "noreply@elevateevents.com";

  return sendEmail({
    to: toEmail,
    from: fromEmail,
    subject: `New Contact Form: ${submission.name} - ${submission.eventType}`,
    text: emailText,
    html: emailHtml,
  });
}
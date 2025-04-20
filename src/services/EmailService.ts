import formData from "form-data";
import Mailgun from "mailgun.js";
import { API_URL, CONTACT_EMAIL, APP_NAME } from "../config/constants";

// Email templates
export enum EmailTemplate {
  VERIFICATION = "verification",
  WELCOME = "welcome",
  PASSWORD_RESET = "password-reset",
  RIDE_RECEIPT = "ride-receipt",
  BOOKING_CONFIRMATION = "booking-confirmation",
}

interface SendEmailParams {
  to: string;
  subject: string;
  template: EmailTemplate;
  templateData: Record<string, any>;
}

// Check if we're running in the browser
const isBrowser = typeof window !== "undefined";

class EmailService {
  private mailgun: any;
  private domain: string;
  private fromEmail: string;

  constructor() {
    this.domain = process.env.MAILGUN_DOMAIN || "mail.troskiweb.com";
    this.fromEmail = process.env.EMAIL_FROM || `noreply@${this.domain}`;

    // Only initialize Mailgun on the server side
    if (!isBrowser) {
      // Initialize Mailgun
      const mailgun = new Mailgun(formData);
      this.mailgun = mailgun.client({
        username: "api",
        key: process.env.MAILGUN_API_KEY || "",
      });
    }
  }

  /**
   * Send an email using Mailgun
   */
  async sendEmail({
    to,
    subject,
    template,
    templateData,
  }: SendEmailParams): Promise<boolean> {
    try {
      // If we're in the browser, just log that we can't send emails from client
      if (isBrowser) {
        console.log("Emails cannot be sent from browser - would have sent:", {
          to,
          subject,
          template,
        });
        return true;
      }

      // If we're in development or testing mode, log the email instead of sending it
      if (
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "test"
      ) {
        console.log("========== EMAIL SENDING (DEV MODE) ==========");
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Template: ${template}`);
        console.log("Template Data:", templateData);
        console.log("==============================================");
        return true;
      }

      // Send the actual email in production
      const result = await this.mailgun.messages.create(this.domain, {
        from: `${APP_NAME} <${this.fromEmail}>`,
        to: [to],
        subject,
        template,
        "h:X-Mailgun-Variables": JSON.stringify(templateData),
      });

      return result.status === 200;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  /**
   * Send a verification code email
   */
  async sendVerificationCode(
    email: string,
    code: string,
    firstName: string
  ): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: `${APP_NAME} - Verify Your Account`,
      template: EmailTemplate.VERIFICATION,
      templateData: {
        firstName,
        verificationCode: code,
        appName: APP_NAME,
        contactEmail: CONTACT_EMAIL,
      },
    });
  }

  /**
   * Send a welcome email after successful verification
   */
  async sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: `Welcome to ${APP_NAME}!`,
      template: EmailTemplate.WELCOME,
      templateData: {
        firstName,
        appName: APP_NAME,
        contactEmail: CONTACT_EMAIL,
      },
    });
  }

  /**
   * Send a password reset email
   */
  async sendPasswordResetEmail(
    email: string,
    code: string,
    firstName: string
  ): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: `${APP_NAME} - Reset Your Password`,
      template: EmailTemplate.PASSWORD_RESET,
      templateData: {
        firstName,
        resetCode: code,
        appName: APP_NAME,
        contactEmail: CONTACT_EMAIL,
      },
    });
  }

  /**
   * Send a ride receipt email
   */
  async sendRideReceipt(
    email: string,
    firstName: string,
    rideDetails: any
  ): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: `${APP_NAME} - Your Ride Receipt`,
      template: EmailTemplate.RIDE_RECEIPT,
      templateData: {
        firstName,
        rideDetails,
        appName: APP_NAME,
        contactEmail: CONTACT_EMAIL,
      },
    });
  }

  /**
   * Send a booking confirmation email
   */
  async sendBookingConfirmation(
    email: string,
    firstName: string,
    bookingDetails: any
  ): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: `${APP_NAME} - Booking Confirmation`,
      template: EmailTemplate.BOOKING_CONFIRMATION,
      templateData: {
        firstName,
        bookingDetails,
        appName: APP_NAME,
        contactEmail: CONTACT_EMAIL,
      },
    });
  }
}

// Create a singleton instance
const emailService = new EmailService();
export default emailService;

"use client";

import { UserRole } from "./UserProfileService";

// Support ticket status
export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

// Support ticket priority
export type TicketPriority = "low" | "medium" | "high" | "urgent";

// Support ticket type
export type TicketType =
  | "account_issue"
  | "payment_problem"
  | "ride_complaint"
  | "driver_feedback"
  | "app_bug"
  | "feature_request"
  | "safety_concern"
  | "lost_item"
  | "other";

// Support ticket interface
export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: Date;
  updatedAt: Date;
  attachments?: string[];
  messages: TicketMessage[];
  rideId?: string;
}

// Ticket message interface
export interface TicketMessage {
  id: string;
  ticketId: string;
  sender: "user" | "support";
  message: string;
  createdAt: Date;
  attachments?: string[];
}

// FAQ category
export interface FaqCategory {
  id: string;
  name: string;
  description: string;
  faqs: Faq[];
}

// FAQ item
export interface Faq {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
  tags: string[];
}

// Sample support tickets for demo
const sampleSupportTickets: SupportTicket[] = [
  {
    id: "ticket-1",
    title: "Driver took wrong route",
    description:
      "The driver took a much longer route than necessary, which increased the fare.",
    type: "ride_complaint",
    status: "in_progress",
    priority: "medium",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    rideId: "ride-789",
    messages: [
      {
        id: "msg-1",
        ticketId: "ticket-1",
        sender: "user",
        message:
          "The driver took a much longer route than necessary, which increased the fare.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        id: "msg-2",
        ticketId: "ticket-1",
        sender: "support",
        message:
          "I apologize for the inconvenience. I've reviewed the route taken and will investigate this matter further. Could you provide any additional details about what happened?",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
    ],
  },
  {
    id: "ticket-2",
    title: "Payment method not working",
    description:
      "I'm unable to add my new credit card. The app keeps showing an error.",
    type: "payment_problem",
    status: "open",
    priority: "high",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    messages: [
      {
        id: "msg-3",
        ticketId: "ticket-2",
        sender: "user",
        message:
          'I\'m unable to add my new credit card. The app keeps showing an error message saying "Payment method could not be processed".',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      },
    ],
  },
  {
    id: "ticket-3",
    title: "Found item in driver's car",
    description:
      "I think I left my glasses in the car. They're in a black case.",
    type: "lost_item",
    status: "resolved",
    priority: "medium",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    rideId: "ride-777",
    messages: [
      {
        id: "msg-4",
        ticketId: "ticket-3",
        sender: "user",
        message:
          "I think I left my glasses in the car. They're in a black case.",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
      {
        id: "msg-5",
        ticketId: "ticket-3",
        sender: "support",
        message:
          "We've contacted the driver and they have found your glasses. They can return them to you. When would be a good time?",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      },
      {
        id: "msg-6",
        ticketId: "ticket-3",
        sender: "user",
        message: "That's great! I'm available tomorrow between 2-4 PM.",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      },
      {
        id: "msg-7",
        ticketId: "ticket-3",
        sender: "support",
        message:
          "Perfect. The driver will meet you at your home address at 3 PM tomorrow. You'll receive a notification when they're on the way.",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      },
      {
        id: "msg-8",
        ticketId: "ticket-3",
        sender: "support",
        message:
          "The driver has confirmed that they returned your glasses. Is there anything else you need help with?",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
      {
        id: "msg-9",
        ticketId: "ticket-3",
        sender: "user",
        message: "I got my glasses back. Thank you so much for your help!",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
    ],
  },
];

// Sample FAQ categories for demo
const sampleFaqCategories: FaqCategory[] = [
  {
    id: "cat-1",
    name: "Account & Profile",
    description:
      "Managing your account, profile settings, and personal information",
    faqs: [
      {
        id: "faq-1",
        question: "How do I change my email address?",
        answer:
          "You can change your email address in the Profile section of the app. Go to Settings > Profile > Email, and follow the verification steps to update your email.",
        categoryId: "cat-1",
        tags: ["account", "profile", "email", "settings"],
      },
      {
        id: "faq-2",
        question: "How do I reset my password?",
        answer:
          "If you're logged in, go to Settings > Profile > Password to change your password. If you're locked out, use the \"Forgot Password\" link on the login screen to receive a password reset email.",
        categoryId: "cat-1",
        tags: ["account", "password", "reset", "security"],
      },
      {
        id: "faq-3",
        question: "Can I have both a rider and driver account?",
        answer:
          "Yes, you can have both types of accounts, but you'll need to use different email addresses for each account. You'll also need to complete the driver verification process separately.",
        categoryId: "cat-1",
        tags: ["account", "driver", "rider", "dual accounts"],
      },
    ],
  },
  {
    id: "cat-2",
    name: "Payments & Pricing",
    description: "Information about fares, payment methods, and billing issues",
    faqs: [
      {
        id: "faq-4",
        question: "How is my fare calculated?",
        answer:
          "Your fare is calculated based on a base fare plus time and distance rates. Troski does not implement surge pricing, so you'll always pay a predictable fare based on the route.",
        categoryId: "cat-2",
        tags: ["pricing", "fare", "calculation", "rates"],
      },
      {
        id: "faq-5",
        question: "How do I add a new payment method?",
        answer:
          "To add a new payment method, go to Settings > Payment Methods > Add Payment Method. You can add credit/debit cards or mobile money accounts depending on your region.",
        categoryId: "cat-2",
        tags: ["payment", "credit card", "mobile money", "billing"],
      },
      {
        id: "faq-6",
        question: "How do I get a receipt for my ride?",
        answer:
          "Receipts are automatically emailed to you after each ride. You can also view all your receipts in the app by going to Ride History and selecting the specific ride.",
        categoryId: "cat-2",
        tags: ["receipt", "invoice", "ride history", "email"],
      },
    ],
  },
  {
    id: "cat-3",
    name: "Riding with Troski",
    description: "Help with booking rides, ride types, and ride-related issues",
    faqs: [
      {
        id: "faq-7",
        question: "How do I schedule a ride in advance?",
        answer:
          'To schedule a ride, tap on "Schedule" in the main screen instead of "Request a Ride." You can schedule rides up to 90 days in advance and choose your preferred pickup time.',
        categoryId: "cat-3",
        tags: ["booking", "schedule", "advance", "reservation"],
      },
      {
        id: "faq-8",
        question: "What should I do if my driver doesn't arrive?",
        answer:
          "If your driver doesn't arrive within the estimated time, you can contact them through the app. If there's no response, you can cancel the ride without a cancellation fee and request a new one.",
        categoryId: "cat-3",
        tags: ["driver", "arrival", "waiting", "cancel"],
      },
      {
        id: "faq-9",
        question: "How do I report a safety concern during my ride?",
        answer:
          "In an emergency, always call your local emergency number first. Within the app, you can tap the shield icon during an active ride to access safety features, including sharing your trip, contacting support, or calling emergency services.",
        categoryId: "cat-3",
        tags: ["safety", "emergency", "security", "concern"],
      },
    ],
  },
];

class SupportService {
  private userTickets: SupportTicket[] = [...sampleSupportTickets];
  private faqCategories: FaqCategory[] = [...sampleFaqCategories];
  private currentUserRole: UserRole | null = null;

  /**
   * Initialize the service with the user's role
   */
  initialize(userRole: UserRole) {
    this.currentUserRole = userRole;
  }

  /**
   * Get all support tickets for the current user
   */
  async getTickets(): Promise<SupportTicket[]> {
    // Simulate API call delay
    await this.delay(800);

    if (!this.currentUserRole) {
      throw new Error("Service not initialized with user role");
    }

    return [...this.userTickets].sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  /**
   * Get a specific support ticket by ID
   */
  async getTicketById(ticketId: string): Promise<SupportTicket | null> {
    // Simulate API call delay
    await this.delay(500);

    if (!this.currentUserRole) {
      throw new Error("Service not initialized with user role");
    }

    return this.userTickets.find((ticket) => ticket.id === ticketId) || null;
  }

  /**
   * Create a new support ticket
   */
  async createTicket(ticketData: {
    title: string;
    description: string;
    type: TicketType;
    priority: TicketPriority;
    rideId?: string;
    attachments?: string[];
  }): Promise<SupportTicket> {
    // Simulate API call delay
    await this.delay(1000);

    if (!this.currentUserRole) {
      throw new Error("Service not initialized with user role");
    }

    const now = new Date();

    const newTicket: SupportTicket = {
      id: `ticket-${Math.floor(Math.random() * 10000) + 100}`,
      ...ticketData,
      status: "open",
      createdAt: now,
      updatedAt: now,
      messages: [
        {
          id: `msg-${Math.floor(Math.random() * 10000) + 100}`,
          ticketId: `ticket-${Math.floor(Math.random() * 10000) + 100}`,
          sender: "user",
          message: ticketData.description,
          createdAt: now,
          attachments: ticketData.attachments,
        },
      ],
    };

    this.userTickets.unshift(newTicket);

    return newTicket;
  }

  /**
   * Add a message to an existing ticket
   */
  async addTicketMessage(
    ticketId: string,
    message: string,
    attachments?: string[]
  ): Promise<TicketMessage> {
    // Simulate API call delay
    await this.delay(700);

    if (!this.currentUserRole) {
      throw new Error("Service not initialized with user role");
    }

    const ticket = this.userTickets.find((t) => t.id === ticketId);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const now = new Date();

    const newMessage: TicketMessage = {
      id: `msg-${Math.floor(Math.random() * 10000) + 100}`,
      ticketId,
      sender: "user",
      message,
      createdAt: now,
      attachments,
    };

    ticket.messages.push(newMessage);
    ticket.updatedAt = now;

    if (ticket.status === "resolved" || ticket.status === "closed") {
      ticket.status = "in_progress";
    }

    return newMessage;
  }

  /**
   * Close a support ticket
   */
  async closeTicket(ticketId: string, feedback?: string): Promise<boolean> {
    // Simulate API call delay
    await this.delay(600);

    if (!this.currentUserRole) {
      throw new Error("Service not initialized with user role");
    }

    const ticket = this.userTickets.find((t) => t.id === ticketId);

    if (!ticket) {
      return false;
    }

    ticket.status = "closed";
    ticket.updatedAt = new Date();

    if (feedback) {
      this.addTicketMessage(
        ticketId,
        `Closing ticket with feedback: ${feedback}`
      );
    }

    return true;
  }

  /**
   * Get all FAQ categories
   */
  async getFaqCategories(): Promise<FaqCategory[]> {
    // Simulate API call delay
    await this.delay(500);

    return [...this.faqCategories];
  }

  /**
   * Get FAQs by category ID
   */
  async getFaqsByCategory(categoryId: string): Promise<Faq[]> {
    // Simulate API call delay
    await this.delay(400);

    const category = this.faqCategories.find((cat) => cat.id === categoryId);

    if (!category) {
      return [];
    }

    return [...category.faqs];
  }

  /**
   * Search FAQs by query
   */
  async searchFaqs(query: string): Promise<Faq[]> {
    // Simulate API call delay
    await this.delay(600);

    if (!query || query.trim().length < 2) {
      return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const results: Faq[] = [];

    // Search through all FAQs across all categories
    this.faqCategories.forEach((category) => {
      category.faqs.forEach((faq) => {
        if (
          faq.question.toLowerCase().includes(normalizedQuery) ||
          faq.answer.toLowerCase().includes(normalizedQuery) ||
          faq.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
        ) {
          results.push(faq);
        }
      });
    });

    return results;
  }

  /**
   * Submit feedback about the app
   */
  async submitAppFeedback(data: {
    rating: number;
    feedback: string;
    category: string;
    contactForFollowUp?: boolean;
  }): Promise<boolean> {
    // Simulate API call delay
    await this.delay(1000);

    if (!this.currentUserRole) {
      throw new Error("Service not initialized with user role");
    }

    // In a real app, this would send the feedback to your backend
    console.log("App feedback submitted:", data);

    return true;
  }

  /**
   * Get help articles (simplified for demo)
   */
  async getHelpArticles(
    category?: string
  ): Promise<{ title: string; snippet: string; url: string }[]> {
    // Simulate API call delay
    await this.delay(700);

    // In a real app, these would be fetched from your knowledge base
    const articles = [
      {
        title: "Getting Started with Troski",
        snippet:
          "Learn how to create an account, book your first ride, and navigate the app.",
        url: "/help/getting-started",
        category: "general",
      },
      {
        title: "Understanding Troski's Pricing",
        snippet:
          "Learn about our transparent pricing model with no surge pricing.",
        url: "/help/pricing",
        category: "payments",
      },
      {
        title: "Safety Features and Policies",
        snippet:
          "Discover the safety features built into the Troski app and our safety policies.",
        url: "/help/safety",
        category: "safety",
      },
      {
        title: "Troski Loyalty Program",
        snippet:
          "Learn how to earn and redeem loyalty points for free rides and other rewards.",
        url: "/help/loyalty",
        category: "rewards",
      },
      {
        title: "Becoming a Troski Driver",
        snippet:
          "Find out how to sign up as a driver, the requirements, and the approval process.",
        url: "/help/driver-signup",
        category: "drivers",
      },
    ];

    if (category) {
      return articles.filter((article) => article.category === category);
    }

    return articles;
  }

  /**
   * Helper method to simulate delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export as singleton
export default new SupportService();

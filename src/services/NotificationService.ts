"use client";

import { UserRole } from "./UserProfileService";
import apiService, { ApiResponse } from "./ApiService";

// Notification types
export enum NotificationType {
  RIDE_UPDATE = "ride_update",
  PAYMENT = "payment",
  PROMOTION = "promotion",
  ACCOUNT = "account",
  DRIVER_UPDATE = "driver_update",
  SYSTEM = "system",
}

// Notification priority
export type NotificationPriority = "low" | "medium" | "high" | "urgent";

// Notification interface
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  data?: any;
  createdAt: Date;
  expiresAt?: Date;
}

// Notification action
export interface NotificationAction {
  label: string;
  action: string; // Action identifier
  url?: string; // URL to navigate to
}

// Notification filter
export interface NotificationFilter {
  type?: NotificationType | NotificationType[];
  isRead?: boolean;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

// Notification subscription
export interface NotificationSubscription {
  id: string;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  createdAt: Date;
}

// Sample notifications for demo purposes
const sampleRiderNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "rider-1",
    type: NotificationType.RIDE_UPDATE,
    title: "Driver accepted your ride",
    message: "Alex is on the way to pick you up in a Silver Toyota Camry.",
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false,
    data: {
      rideId: "ride-123",
      driverName: "Alex",
      driverRating: 4.9,
      vehicleInfo: "Silver Toyota Camry",
    },
  },
  {
    id: "notif-2",
    userId: "rider-1",
    type: NotificationType.DRIVER_UPDATE,
    title: "You earned 25 loyalty points!",
    message: "You're getting closer to Silver tier. Just 50 more points to go!",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: true,
    data: {
      pointsEarned: 25,
      totalPoints: 150,
      nextTier: "Silver",
      pointsToNextTier: 50,
    },
  },
  {
    id: "notif-3",
    userId: "rider-1",
    type: NotificationType.PROMOTION,
    title: "Weekend Special: 15% Off",
    message: "Enjoy 15% off all rides this weekend using code WEEKEND15.",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    data: {
      promoCode: "WEEKEND15",
      discount: "15%",
      validUntil: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Valid for 2 more days
    },
  },
];

const sampleDriverNotifications: Notification[] = [
  {
    id: "notif-4",
    userId: "driver-1",
    type: NotificationType.RIDE_UPDATE,
    title: "New ride request",
    message:
      "You have a new ride request from Toronto Downtown to Toronto Airport.",
    createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    isRead: false,
    data: {
      rideId: "ride-456",
      pickupLocation: "Toronto Downtown",
      dropoffLocation: "Toronto Airport",
      estimatedFare: 45.75,
      estimatedDistance: 28.5,
    },
  },
  {
    id: "notif-5",
    userId: "driver-1",
    type: NotificationType.DRIVER_UPDATE,
    title: "Weekly earnings updated",
    message: "You earned $485.50 this week. Nice job!",
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    isRead: true,
    data: {
      weeklyEarnings: 485.5,
      trips: 23,
      topDay: "Friday",
      comparison: {
        lastWeek: 420.25,
        percentChange: 15.5,
      },
    },
  },
  {
    id: "notif-6",
    userId: "driver-1",
    type: NotificationType.DRIVER_UPDATE,
    title: "Insurance document approved",
    message: "Your insurance document has been verified and approved.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: true,
    data: {
      documentType: "insurance",
      expiryDate: new Date("2024-05-15"),
    },
  },
];

class NotificationService {
  private readonly baseUrl = "/notifications";
  private riderNotifications: Notification[] = [...sampleRiderNotifications];
  private driverNotifications: Notification[] = [...sampleDriverNotifications];
  private notificationListeners: ((notification: Notification) => void)[] = [];
  private currentUserRole: UserRole | null = null;

  /**
   * Initialize the service with the user's role
   */
  initialize(userRole: UserRole) {
    this.currentUserRole = userRole;
  }

  /**
   * Get all notifications for the current user
   * @param filter Optional filter for notifications
   */
  public async getNotifications(
    filter?: NotificationFilter
  ): Promise<Notification[]> {
    const response = await apiService.get<Notification[]>(this.baseUrl, {
      params: filter,
    });
    return response.data as Notification[];
  }

  /**
   * Get unread notification count
   */
  public async getUnreadCount(): Promise<number> {
    const response = await apiService.get<{ count: number }>(
      `${this.baseUrl}/unread-count`
    );
    return response.data.count;
  }

  /**
   * Mark notification as read
   * @param notificationId ID of the notification to mark as read
   */
  public async markAsRead(notificationId: string): Promise<ApiResponse> {
    return await apiService.put(`${this.baseUrl}/${notificationId}/read`);
  }

  /**
   * Mark all notifications as read
   */
  public async markAllAsRead(): Promise<ApiResponse> {
    return await apiService.put(`${this.baseUrl}/mark-all-read`);
  }

  /**
   * Delete a notification
   * @param notificationId ID of the notification to delete
   */
  public async deleteNotification(
    notificationId: string
  ): Promise<ApiResponse> {
    return await apiService.delete(`${this.baseUrl}/${notificationId}`);
  }

  /**
   * Clear all notifications
   */
  public async clearAllNotifications(): Promise<ApiResponse> {
    return await apiService.delete(`${this.baseUrl}/clear-all`);
  }

  /**
   * Subscribe to push notifications
   * @param subscription Push subscription details
   */
  public async subscribeToPushNotifications(
    subscription: PushSubscription
  ): Promise<ApiResponse> {
    return await apiService.post(`${this.baseUrl}/push/subscribe`, {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.getKey("p256dh"),
        auth: subscription.getKey("auth"),
      },
    });
  }

  /**
   * Unsubscribe from push notifications
   * @param endpoint Push subscription endpoint
   */
  public async unsubscribeFromPushNotifications(
    endpoint: string
  ): Promise<ApiResponse> {
    return await apiService.post(`${this.baseUrl}/push/unsubscribe`, {
      endpoint,
    });
  }

  /**
   * Get push notification subscriptions
   */
  public async getPushSubscriptions(): Promise<NotificationSubscription[]> {
    const response = await apiService.get<NotificationSubscription[]>(
      `${this.baseUrl}/push/subscriptions`
    );
    return response.data as NotificationSubscription[];
  }

  /**
   * Update notification settings
   * @param settings Notification settings to update
   */
  public async updateNotificationSettings(settings: any): Promise<ApiResponse> {
    return await apiService.put(`${this.baseUrl}/settings`, settings);
  }

  /**
   * Get notification settings
   */
  public async getNotificationSettings(): Promise<any> {
    const response = await apiService.get(`${this.baseUrl}/settings`);
    return response.data;
  }

  /**
   * Send a test notification
   * @param type Type of notification to test
   */
  public async sendTestNotification(
    type: NotificationType
  ): Promise<ApiResponse> {
    return await apiService.post(`${this.baseUrl}/test`, { type });
  }

  /**
   * Add a notification for the current user
   * Used internally or by other services
   */
  async addNotification(
    notification: Omit<Notification, "id" | "timestamp" | "isRead">
  ): Promise<Notification> {
    // Simulate API call delay
    await this.delay(300);

    if (!this.currentUserRole) {
      throw new Error("Service not initialized with user role");
    }

    const newNotification: Notification = {
      ...notification,
      id: `notif-${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date(),
      isRead: false,
    };

    if (this.currentUserRole === "rider") {
      this.riderNotifications.unshift(newNotification);
    } else {
      this.driverNotifications.unshift(newNotification);
    }

    // Trigger any registered listeners
    this.notificationListeners.forEach((listener) => listener(newNotification));

    return newNotification;
  }

  /**
   * Execute an action on a notification
   */
  async executeAction(
    notificationId: string,
    actionId: string
  ): Promise<boolean> {
    // Simulate API call delay
    await this.delay(600);

    if (!this.currentUserRole) {
      throw new Error("Service not initialized with user role");
    }

    const notifications =
      this.currentUserRole === "rider"
        ? this.riderNotifications
        : this.driverNotifications;

    const notification = notifications.find((n) => n.id === notificationId);

    if (!notification) {
      return false;
    }

    const action = notification.actions?.find((a) => a.action === actionId);

    if (!action) {
      return false;
    }

    // In a real app, you'd execute the action here
    // For demo purposes, we're just marking the notification as read
    notification.isRead = true;

    // Log the action (in a real app, you'd have more sophisticated handling)
    console.log(
      `Executed action ${actionId} on notification ${notificationId}`,
      action
    );

    return true;
  }

  /**
   * Subscribe to new notifications
   * Returns a function to unsubscribe
   */
  subscribeToNotifications(
    callback: (notification: Notification) => void
  ): () => void {
    this.notificationListeners.push(callback);

    // Return unsubscribe function
    return () => {
      this.notificationListeners = this.notificationListeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  /**
   * Helper method to simulate delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export as singleton
const notificationService = new NotificationService();
export default notificationService;

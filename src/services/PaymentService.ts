"use client";

import apiService, { ApiResponse } from "./ApiService";
import { PaymentMethod } from "./BookingService";

// Interfaces
export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: PaymentMethod;
  rideId?: string;
  description: string;
  receipt?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardDetails {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

export interface MobileMoneyDetails {
  provider: "mtn" | "vodafone" | "airtel-tigo";
  phoneNumber: string;
}

export interface AddPaymentMethodRequest {
  type: "card" | "mobile_money";
  nickname?: string;
  isDefault?: boolean;
  card?: CardDetails;
  mobileMoney?: MobileMoneyDetails;
}

export interface WalletBalance {
  balance: number;
  currency: string;
  points: number;
}

export interface TransactionFilter {
  startDate?: Date;
  endDate?: Date;
  status?: string;
  limit?: number;
  offset?: number;
}

class PaymentService {
  private readonly baseUrl = "/payments";

  /**
   * Get all payment methods for the current user
   */
  public async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await apiService.get<PaymentMethod[]>(
      `${this.baseUrl}/methods`
    );
    return response.data as PaymentMethod[];
  }

  /**
   * Add a new payment method
   * @param paymentMethod Payment method details
   */
  public async addPaymentMethod(
    paymentMethod: AddPaymentMethodRequest
  ): Promise<PaymentMethod> {
    const response = await apiService.post<PaymentMethod>(
      `${this.baseUrl}/methods`,
      paymentMethod
    );
    return response.data as PaymentMethod;
  }

  /**
   * Delete a payment method
   * @param paymentMethodId ID of the payment method to delete
   */
  public async deletePaymentMethod(
    paymentMethodId: string
  ): Promise<ApiResponse> {
    return await apiService.delete(
      `${this.baseUrl}/methods/${paymentMethodId}`
    );
  }

  /**
   * Set a payment method as default
   * @param paymentMethodId ID of the payment method to set as default
   */
  public async setDefaultPaymentMethod(
    paymentMethodId: string
  ): Promise<ApiResponse> {
    return await apiService.put(
      `${this.baseUrl}/methods/${paymentMethodId}/default`
    );
  }

  /**
   * Get the user's wallet balance
   */
  public async getWalletBalance(): Promise<WalletBalance> {
    const response = await apiService.get<WalletBalance>(
      `${this.baseUrl}/wallet/balance`
    );
    return response.data as WalletBalance;
  }

  /**
   * Add funds to the user's wallet
   * @param amount Amount to add
   * @param paymentMethodId ID of the payment method to use
   */
  public async topUpWallet(
    amount: number,
    paymentMethodId: string
  ): Promise<Transaction> {
    const response = await apiService.post<Transaction>(
      `${this.baseUrl}/wallet/topup`,
      {
        amount,
        paymentMethodId,
      }
    );
    return response.data as Transaction;
  }

  /**
   * Get transaction history
   * @param filter Optional filter for transactions
   */
  public async getTransactions(
    filter?: TransactionFilter
  ): Promise<Transaction[]> {
    const response = await apiService.get<Transaction[]>(
      `${this.baseUrl}/transactions`,
      {
        params: filter,
      }
    );
    return response.data as Transaction[];
  }

  /**
   * Get a specific transaction by ID
   * @param transactionId ID of the transaction to retrieve
   */
  public async getTransaction(transactionId: string): Promise<Transaction> {
    const response = await apiService.get<Transaction>(
      `${this.baseUrl}/transactions/${transactionId}`
    );
    return response.data as Transaction;
  }

  /**
   * Request a refund for a transaction
   * @param transactionId ID of the transaction to refund
   * @param reason Reason for refund
   */
  public async requestRefund(
    transactionId: string,
    reason: string
  ): Promise<ApiResponse> {
    return await apiService.post(
      `${this.baseUrl}/transactions/${transactionId}/refund`,
      { reason }
    );
  }

  /**
   * Download receipt for a transaction
   * @param transactionId ID of the transaction
   */
  public async downloadReceipt(transactionId: string): Promise<Blob> {
    const response = await apiService.get(
      `${this.baseUrl}/transactions/${transactionId}/receipt`,
      {
        responseType: "blob",
      }
    );
    return response.data as Blob;
  }

  /**
   * Make a direct payment for a ride
   * @param rideId ID of the ride
   * @param paymentMethodId ID of the payment method to use
   */
  public async payForRide(
    rideId: string,
    paymentMethodId: string
  ): Promise<Transaction> {
    const response = await apiService.post<Transaction>(
      `${this.baseUrl}/pay-ride`,
      {
        rideId,
        paymentMethodId,
      }
    );
    return response.data as Transaction;
  }

  /**
   * Add a tip for a completed ride
   * @param rideId ID of the ride
   * @param amount Tip amount
   * @param paymentMethodId ID of the payment method to use
   */
  public async addTip(
    rideId: string,
    amount: number,
    paymentMethodId: string
  ): Promise<Transaction> {
    const response = await apiService.post<Transaction>(`${this.baseUrl}/tip`, {
      rideId,
      amount,
      paymentMethodId,
    });
    return response.data as Transaction;
  }

  /**
   * Verify a mobile money payment
   * @param transactionId ID of the transaction to verify
   * @param otp One-time password received via SMS
   */
  public async verifyMobileMoneyPayment(
    transactionId: string,
    otp: string
  ): Promise<ApiResponse> {
    return await apiService.post(`${this.baseUrl}/verify-mobile-money`, {
      transactionId,
      otp,
    });
  }

  /**
   * Get available promo codes
   */
  public async getPromoCodes(): Promise<PromoCode[]> {
    const response = await apiService.get<PromoCode[]>(
      `${this.baseUrl}/promo-codes`
    );
    return response.data as PromoCode[];
  }

  /**
   * Apply a promo code to the user's account
   * @param code Promo code to apply
   */
  public async applyPromoCode(code: string): Promise<ApiResponse> {
    return await apiService.post(`${this.baseUrl}/promo-codes/apply`, { code });
  }
}

// Define the PromoCode interface
export interface PromoCode {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  maxDiscount?: number;
  expiresAt: Date;
  isActive: boolean;
  usageLimit: number;
  usageCount: number;
  termsAndConditions?: string;
}

// Create a singleton instance
const paymentService = new PaymentService();
export default paymentService;

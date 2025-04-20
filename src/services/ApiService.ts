import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { API_URL, AUTH_TOKEN_KEY } from "../config/constants";
import { toast } from "react-hot-toast";

// Check if we're running in the browser
const isBrowser = typeof window !== "undefined";

// Type definitions
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
}

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 30000, // 30 seconds
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Skip interceptors setup if we're not in a browser
    if (!isBrowser) return;

    // Request interceptor for API calls
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (token && config.headers) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for API calls
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        const { response } = error;

        if (response) {
          // Handle different HTTP status codes
          switch (response.status) {
            case 401:
              // Unauthorized - clear token and redirect to login
              localStorage.removeItem(AUTH_TOKEN_KEY);
              // Only redirect if we're in the browser
              window.location.href = "/signin";
              break;
            case 403:
              // Forbidden
              toast.error("You do not have permission to perform this action");
              break;
            case 404:
              // Not found
              toast.error("The requested resource was not found");
              break;
            case 422:
              // Validation errors
              if (response.data && (response.data as any).errors) {
                const errorMessages = Object.values(
                  (response.data as any).errors
                ).flat();
                if (errorMessages.length > 0) {
                  toast.error(errorMessages[0] as string);
                }
              } else {
                toast.error("Validation failed. Please check your input.");
              }
              break;
            case 500:
              // Server error
              toast.error(
                "An unexpected server error occurred. Please try again later."
              );
              break;
            default:
              // Handle other errors
              const errorMessage =
                (response.data as any)?.message || "An error occurred";
              toast.error(errorMessage);
              break;
          }
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("Network error. Please check your internet connection.");
        } else {
          // Something happened in setting up the request
          toast.error("An error occurred while setting up the request.");
        }

        return Promise.reject(error);
      }
    );
  }

  // Generic GET request
  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic POST request
  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic PUT request
  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic PATCH request
  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.patch<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic DELETE request
  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handler
  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      // Return a more descriptive error
      const { response } = error as AxiosError;
      if (response && response.data) {
        return new Error(
          (response.data as any).message || "An unexpected error occurred"
        );
      }
    }
    return new Error("An unexpected error occurred");
  }

  // Upload files
  public async uploadFile<T = any>(
    url: string,
    file: File,
    additionalData?: Record<string, any>,
    onProgress?: (percentage: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentage);
        }
      },
    };

    return this.post<T>(url, formData, config);
  }

  // Download files
  public async downloadFile(url: string, filename?: string): Promise<void> {
    if (!isBrowser) {
      throw new Error(
        "File downloading is only available in browser environments"
      );
    }

    try {
      const response = await this.api.get(url, {
        responseType: "blob",
      });

      // Create a link element to trigger the download
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download =
        filename || this.getFilenameFromResponse(response) || "download";
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Clean up the URL object
      setTimeout(() => {
        window.URL.revokeObjectURL(downloadUrl);
      }, 100);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private getFilenameFromResponse(response: AxiosResponse): string | null {
    const contentDisposition = response.headers["content-disposition"];
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^"]*)"?/);
      if (filenameMatch && filenameMatch[1]) {
        return filenameMatch[1];
      }
    }
    return null;
  }
}

// Create a singleton instance
const apiService = new ApiService();
export default apiService;

import { CustomError, ProblemDetails } from "@/types/ResponseErrorTypes";
import axios, { AxiosError, AxiosInstance } from "axios";

export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 5000,
  });

  // Interceptor de solicitud
  instance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor de respuesta
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      // Handle network or connection errors
      if (error.code === "ECONNREFUSED") {
        const errorMessage =
          "Error connecting to the server. Contact the administrator.";
        return Promise.reject(errorMessage);
      }

      if (error.code === "ERR_NETWORK") {
        const errorMessage = `Network error. Please check your internet connection or try again later.
                              If the problem persists, please contact the administrator.`;
        return Promise.reject(errorMessage);
      }

      if (error.response) {
        const { status, data } = error.response;

        // Unprocessable Entity (Validation errors) or Internal Server Error
        if (status === 422 || status === 500) {
          const problemDetails = data as ProblemDetails;
          if (problemDetails.errors) {
            const errorMessages = problemDetails.errors
              .map((error) => error.errorMessage)
              .join(", ");
            return Promise.reject(
              errorMessages || problemDetails.detail || "Unknown error."
            );
          }
          return Promise.reject(problemDetails.detail || "Unknown error.");
        }

        // Bad Request
        if (status === 400) {
          const customError = data as CustomError;
          const errorMessage =
            customError.description || "Request error.";
          return Promise.reject(errorMessage);
        }
      }

      return Promise.reject(error?.message || "Unexpected error occurred.");
    }
  );

  return instance;
};

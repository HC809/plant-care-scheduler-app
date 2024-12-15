'use client';

import { useState } from 'react';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import useAxios from './use-axios';

interface UseAxiosMutationReturn<T> {
    mutate: (method: 'POST' | 'PUT' | 'DELETE', url: string, data: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T> | void>;
    isLoading: boolean;
    error: string | null;
}

export function useAxiosMutation<T>(): UseAxiosMutationReturn<T> {
    const apiClient: AxiosInstance | null = useAxios();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (method: 'POST' | 'PUT' | 'DELETE', url: string, data: any, config?: AxiosRequestConfig) => {
        if (!apiClient) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.request<T>({
                method,
                url,
                data,
                ...config,
            });
            return response;
        } catch (err) {
            const errorMessage = err as string;
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return { mutate, isLoading, error };
}

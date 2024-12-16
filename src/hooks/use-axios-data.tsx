'use client';

import { useState, useCallback } from 'react';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import useAxios from './use-axios';

interface UseAxiosDataReturn<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    hasFetched: boolean;
    fetchData: (url: string, config?: AxiosRequestConfig) => Promise<void>;
}

export function useAxiosData<T>(): UseAxiosDataReturn<T> {
    const apiClient: AxiosInstance | null = useAxios();

    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Cambiar a false
    const [error, setError] = useState<string | null>(null);
    const [hasFetched, setHasFetched] = useState<boolean>(false);

    const fetchData = useCallback(async (url: string, config?: AxiosRequestConfig) => {
        if (!apiClient) {
            return;
        }

        setIsLoading(true); 
        setError(null); 

        try {
            const response: AxiosResponse<T> = await apiClient.get<T>(url, {
                ...config,
            });
            setData(response.data);
        } catch (err) {
            if (axios.isCancel(err)) {
                //console.log('Request canceled:', err.message);
            } else {
                const errorMessage = err as string;
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false); 
            setHasFetched(true); 
        }
    }, [apiClient]);

    return { data, isLoading, error, hasFetched, fetchData };
}

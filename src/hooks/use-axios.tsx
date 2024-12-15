"use client";

import { useMemo } from 'react';
import { createAxiosInstance } from '@/lib/axios-instance';

const useAxios = () => {
    const axiosInstance = useMemo(() => {
        return createAxiosInstance();
    }, []);

    return axiosInstance;
};

export default useAxios;

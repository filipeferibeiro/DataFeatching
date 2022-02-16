import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
    baseURL: 'https://api.github.com'
})

/**
 * Criado sem usar React Query
 * @param url 
 * @param options 
 * @returns 
 */

export function useFetch<T = unknown>(url: string, options?: AxiosRequestConfig) {
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFatching] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        api.get(url, options)
          .then(response => {
            setData(response.data);
          })
          .catch(err => {
              setError(err);
          })
          .finally(() => {
              setIsFatching(false);
          })
      }, []);

    return { data, error, isFetching };
};
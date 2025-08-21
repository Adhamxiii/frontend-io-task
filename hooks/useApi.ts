'use client';

import { useState, useCallback } from "react";
import { fetchAPI } from "@/utils/fetch-api";
import type { UseApiState, UseApiOptions } from "@/types";

export function useApi<T = any>(
  url: string,
  options: UseApiOptions = {}
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (params?: Record<string, string>) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const finalUrl = params 
          ? `${url}?${new URLSearchParams(params).toString()}`
          : url;
          
        const response = await fetchAPI(finalUrl, {
          method: "GET",
          next: options.revalidate ? { revalidate: options.revalidate } : undefined,
        });

        if (response.error) {
          throw new Error(response.error);
        }

        setState({
          data: response,
          loading: false,
          error: null,
        });

        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
        throw error;
      }
    },
    [url, options.revalidate]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

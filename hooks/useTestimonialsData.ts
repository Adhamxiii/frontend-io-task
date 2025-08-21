"use client";

import { useState, useEffect } from "react";
import { getTestimonialsData } from "@/data/loaders";
import type { TestimonialsResponse } from "@/types";

interface UseTestimonialsDataState {
  data: TestimonialsResponse | null;
  loading: boolean;
  error: string | null;
}

export function useTestimonialsData() {
  const [state, setState] = useState<UseTestimonialsDataState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const testimonialsData = await getTestimonialsData();

        setState({
          data: testimonialsData,
          loading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load testimonials data";
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
      }
    };

    fetchData();
  }, []);

  const refetch = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const testimonialsData = await getTestimonialsData();

      setState({
        data: testimonialsData,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load testimonials data";
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
    }
  };

  return {
    ...state,
    refetch,
  };
}

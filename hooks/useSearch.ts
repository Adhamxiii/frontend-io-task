"use client";

import { useState, useCallback } from "react";
import { fetchAPI } from "@/utils/fetch-api";
import type { SearchResult, UseSearchState } from "@/types";

export function useSearch() {
  const [state, setState] = useState<UseSearchState>({
    results: null,
    loading: false,
    error: null,
  });

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setState(prev => ({ ...prev, results: null, error: null }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
      
      const teamUrl = new URL(
        `/api/teams?populate=*&filters[name][$containsi]=${encodeURIComponent(query)}`,
        BASE_URL
      );
      
      const servicesUrl = new URL(
        `/api/services?populate=*&filters[title][$containsi]=${encodeURIComponent(query)}`,
        BASE_URL
      );

      const [teamResponse, servicesResponse] = await Promise.all([
        fetchAPI(teamUrl.href, { method: "GET" }),
        fetchAPI(servicesUrl.href, { method: "GET" }),
      ]);

      const results: SearchResult = {
        team: teamResponse?.data || [],
        services: servicesResponse?.data || [],
      };

      setState({
        results,
        loading: false,
        error: null,
      });

      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Search failed";
      setState({
        results: null,
        loading: false,
        error: errorMessage,
      });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      results: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    search,
    reset,
  };
}

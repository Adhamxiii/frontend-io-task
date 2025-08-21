"use client";

import { useState, useEffect } from "react";
import { getTeamData } from "@/data/loaders";
import type { TeamResponse } from "@/types";

interface UseTeamDataState {
  data: TeamResponse | null;
  loading: boolean;
  error: string | null;
}

export function useTeamData() {
  const [state, setState] = useState<UseTeamDataState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const teamData = await getTeamData();

        setState({
          data: teamData,
          loading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load team data";
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
      const teamData = await getTeamData();

      setState({
        data: teamData,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load team data";
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

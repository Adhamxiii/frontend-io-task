import { fetchAPI } from "@/utils/fetch-api";
import type {
  HeroResponse,
  TeamResponse,
  TestimonialsResponse,
  ServicesResponse,
  BlogResponse,
  ClientsResponse,
  Service,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface LoaderOptions {
  revalidate?: number;
  tags?: string[];
}

async function fetchWithOptions<T>(
  path: string,
  options: LoaderOptions = {}
): Promise<T> {
  try {
    const url = new URL(path, BASE_URL);
    const response = await fetchAPI(url.href, {
      method: "GET",
      next: {
        revalidate: options.revalidate || 60,
        tags: options.tags || [],
      },
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    throw error;
  }
}

export const getHeroData = async (
  options?: LoaderOptions
): Promise<HeroResponse> => {
  return fetchWithOptions<HeroResponse>("/api/homes?populate=*", {
    revalidate: 300,
    tags: ["hero"],
    ...options,
  });
};

export const getTeamData = async (
  options?: LoaderOptions
): Promise<TeamResponse> => {
  return fetchWithOptions<TeamResponse>("/api/teams?populate=*", {
    revalidate: 600,
    tags: ["team"],
    ...options,
  });
};

export const getTestimonialsData = async (
  options?: LoaderOptions
): Promise<TestimonialsResponse> => {
  return fetchWithOptions<TestimonialsResponse>(
    "/api/testimonials?populate=*",
    {
      revalidate: 600,
      tags: ["testimonials"],
      ...options,
    }
  );
};

export const getServicesData = async (
  options?: LoaderOptions
): Promise<ServicesResponse> => {
  return fetchWithOptions<ServicesResponse>("/api/services?populate=*", {
    revalidate: 300,
    tags: ["services"],
    ...options,
  });
};

export const getServiceBySlug = async (
  slug: string,
  options?: LoaderOptions
): Promise<{ data: Service[] }> => {
  return fetchWithOptions<{ data: Service[] }>(
    `/api/services?populate=*&filters[slug][$eq]=${encodeURIComponent(slug)}`,
    {
      revalidate: 300,
      tags: ["services", `service-${slug}`],
      ...options,
    }
  );
};

export const getBlogPosts = async (
  options?: LoaderOptions
): Promise<BlogResponse> => {
  return fetchWithOptions<BlogResponse>(
    "/api/blog-posts?populate=*&sort=publishedAt:desc",
    {
      revalidate: 1800,
      tags: ["blog"],
      ...options,
    }
  );
};

export const getBlogPostById = async (
  id: string,
  options?: LoaderOptions
): Promise<BlogResponse> => {
  return fetchWithOptions<BlogResponse>(`/api/blog-posts/${id}?populate=*`, {
    revalidate: 1800,
    tags: ["blog", `blog-${id}`],
    ...options,
  });
};

export const getClientsData = async (
  options?: LoaderOptions
): Promise<ClientsResponse> => {
  return fetchWithOptions<ClientsResponse>("/api/clients?populate=*", {
    revalidate: 3600,
    tags: ["clients"],
    ...options,
  });
};

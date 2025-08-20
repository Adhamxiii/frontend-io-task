import { fetchAPI } from "@/utils/fetch-api";

export const getHeroData = async () => {
  const path = "/api/homes?populate=*";
  const BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const url = new URL(path, BASE_URL);

  const response = await fetchAPI(url.href, {
    method: "GET",
  });

  return response;
};

export const getTeamData = async () => {
  const path = "/api/teams?populate=*";
  const BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const url = new URL(path, BASE_URL);

  const response = await fetchAPI(url.href, {
    method: "GET",
  });

  return response;
};

export const getTestimonialsData = async () => {
  const path = "/api/testimonials?populate=*";
  const BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const url = new URL(path, BASE_URL);

  const response = await fetchAPI(url.href, {
    method: "GET",
  });

  return response;
};

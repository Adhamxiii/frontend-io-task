"use server";

import { fetchAPI } from "@/utils/fetch-api";
import type { NewsletterResponse } from "@/types";

export const createSubscription = async (email: string): Promise<NewsletterResponse | { error: string }> => {
  const url = new URL(
    "/api/newsletter-signups",
    process.env.NEXT_PUBLIC_STRAPI_URL
  );

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          email,
        },
      }),
    });

    return response.json();
  } catch (error) {
    console.error("Error creating subscription:", error);
    return { error: "Failed to create subscription" };
  }
};

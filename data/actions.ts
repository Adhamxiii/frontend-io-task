"use server";

import type { NewsletterResponse } from "@/types";

export const createSubscription = async (
  email: string
): Promise<NewsletterResponse | { error: string }> => {
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

    const json = await response.json();

    if (!response.ok) {
      const message: string =
        (json?.error?.message as string) ||
        (json?.message as string) ||
        "Failed";

      const lower = message.toLowerCase();
      if (lower.includes("unique") || lower.includes("already")) {
        return { error: "duplicate" };
      }
      return { error: message || "Failed to create subscription" };
    }

    return json;
  } catch (error) {
    console.error("Error creating subscription:", error);
    return { error: "Failed to create subscription" };
  }
};

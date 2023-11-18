interface Config {
  apiBaseUrl: string;
  orderAppUrl: string;
  googleClientId: string;
  googleClientSecret: string;
  nextAuthSecret: string;
}

export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  orderAppUrl: process.env.NEXT_PUBLIC_ORDER_APP_URL || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  nextAuthSecret: process.env.NEXT_AUTH_SECRET || "s",
};

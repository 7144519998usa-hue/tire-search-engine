const deploymentEnvironment = process.env.TSE_ENV || process.env.VERCEL_ENV || "local";

function getString(name, fallback = "") {
  const value = process.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function getBoolean(name, fallback = false) {
  const value = getString(name);
  if (!value) {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function assertPresent(name) {
  const value = getString(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const appEnv = {
  deploymentEnvironment,
  isLocal: deploymentEnvironment === "local",
  isProduction: deploymentEnvironment === "production",
  isNonProduction: deploymentEnvironment !== "production",
};

export const publicEnv = {
  siteUrl: getString("NEXT_PUBLIC_SITE_URL", "https://www.tiresearchengine.com"),
  googleVerification: getString("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"),
  googleAnalyticsId: getString("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
};

export function getServerEnv() {
  return {
    supabaseUrl: getString("SUPABASE_URL") || (appEnv.isLocal ? getString("NEXT_PUBLIC_SUPABASE_URL") : ""),
    supabaseKey: getString("SUPABASE_ANON_KEY") || (appEnv.isLocal ? getString("NEXT_PUBLIC_SUPABASE_ANON_KEY") : ""),
    redirectSecret: getString("TSE_REDIRECT_SECRET"),
    internalApiKey: getString("TSE_INTERNAL_API_KEY"),
    previewUsername: getString("TSE_PREVIEW_USERNAME"),
    previewPassword: getString("TSE_PREVIEW_PASSWORD"),
    adminToken: getString("TSE_ADMIN_TOKEN"),
    amazonAssociateTag: getString("TSE_AMAZON_ASSOCIATE_TAG"),
    allowlistedOutboundHosts: getString(
      "TSE_ALLOWED_OUTBOUND_HOSTS",
      [
        "amazon.com",
        "www.amazon.com",
        "tirerack.com",
        "www.tirerack.com",
        "prioritytire.com",
        "www.prioritytire.com",
        "simpletire.com",
        "www.simpletire.com",
        "discounttire.com",
        "www.discounttire.com",
        "walmart.com",
        "www.walmart.com",
      ].join(",")
    ),
    enableVercelAnalytics: getBoolean("TSE_ENABLE_VERCEL_ANALYTICS", true),
  };
}

export function validateCriticalServerEnv() {
  if (!appEnv.isProduction) {
    return;
  }

  assertPresent("SUPABASE_URL");
  assertPresent("SUPABASE_ANON_KEY");
  assertPresent("TSE_REDIRECT_SECRET");
  assertPresent("TSE_INTERNAL_API_KEY");
  assertPresent("NEXT_PUBLIC_SITE_URL");
}

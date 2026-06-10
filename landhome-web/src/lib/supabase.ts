import { createClient } from "@supabase/supabase-js";

// Public read client (anon/publishable key). Safe in the browser and in
// server components. Reads listings/listing_media/agents/seo_pages, which
// have public-read RLS policies.
export function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

// Service-role client. SERVER ONLY — used by /api/forms to write into the
// PII/state tables (leads, showing_requests, saved_searches) which are
// locked to service_role. Never import this into client components.
export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return createClient(url, key, { auth: { persistSession: false } });
}

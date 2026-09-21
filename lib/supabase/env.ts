export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL in .env.local");
  if (!key) throw new Error("Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local");
  return { url, key };
}
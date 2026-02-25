import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] Missing environment variables. Running in mock mode. " +
    "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY for real DB."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

// ========== Auth helpers ==========

export async function signInWithPhone(phone: string) {
  const { data, error } = await supabase.auth.signInWithOtp({ phone });
  return { data, error };
}

export async function verifyOtp(phone: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });
  return { data, error };
}

export async function signInWithKakao() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

// ========== Storage helpers ==========

export async function uploadFile(
  bucket: string,
  path: string,
  file: File
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
  return { data, error };
}

export function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// ========== DB helpers ==========

export async function insertPolicy(policy: {
  user_id: string;
  insurer: string;
  product_name: string;
  contract_date: string;
  main_coverage: string;
  ocr_raw_data: Record<string, unknown>;
  status: string;
}) {
  const { data, error } = await supabase
    .from("policies")
    .insert(policy)
    .select()
    .single();
  return { data, error };
}

export async function getUserPolicies(userId: string) {
  const { data, error } = await supabase
    .from("policies")
    .select("*, riders(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function insertClaim(claim: {
  user_id: string;
  policy_id: string;
  kcd_code_id: string;
  total_amount: number;
  status: string;
}) {
  const { data, error } = await supabase
    .from("claims")
    .insert(claim)
    .select()
    .single();
  return { data, error };
}

export async function insertScannedDocument(doc: {
  user_id: string;
  doc_type: string;
  image_url: string;
  ocr_raw_data: Record<string, unknown>;
}) {
  const { data, error } = await supabase
    .from("scanned_documents")
    .insert(doc)
    .select()
    .single();
  return { data, error };
}

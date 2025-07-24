import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://elfhalgqhxvulxbglzgj.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

export const db = createClient(supabaseUrl, supabaseKey);

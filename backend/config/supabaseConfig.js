const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://elfhalgqhxvulxbglzgj.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseKey)

module.exports = supabaseClient;

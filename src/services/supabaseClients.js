import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dmidkzfqmeldsaxpgtdv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtaWRremZxbWVsZHNheHBndGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NTc2MTIsImV4cCI6MjA3ODMzMzYxMn0.9qu3uUMN-ofL8po2IJGuzO_3OEOwWKn9InmwOZ-jrc0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

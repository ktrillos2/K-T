import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function check() {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await supabase.rpc('exec_sql', { query_text: "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'" });
    if (error) console.error(error);
    else console.log(data);
}
check();

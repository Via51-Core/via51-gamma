import { createClient } from '@supabase/supabase-client';

const supabaseUrl = 'https://ibhhzgtxaqwdykedhtvk.supabase.co';
const supabaseKey = 'sb_publishable_Aicdv3GPUOAdE04R9YVHpw_dA18Knik';

export const supabase = createClient(supabaseUrl, supabaseKey);
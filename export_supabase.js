import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://dhjooqvkzryhofgfgqoq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoam9vcXZrenJ5aG9mZ2ZncW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1Mjk0NzAsImV4cCI6MjA4OTEwNTQ3MH0.GAiuLESPb91toJ64XO2UCJTwiYungWRGKaanrL0PHzM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function exportData() {
    console.log('Exporting Profiles...');
    const { data: profiles, error: pError } = await supabase.from('profiles').select('*');
    if (pError) console.error('Error fetching profiles:', pError);
    else fs.writeFileSync('supabase_profiles_backup.json', JSON.stringify(profiles, null, 2));

    console.log('Exporting Orders...');
    const { data: orders, error: oError } = await supabase.from('orders').select('*');
    if (oError) console.error('Error fetching orders:', oError);
    else fs.writeFileSync('supabase_orders_backup.json', JSON.stringify(orders, null, 2));

    console.log('Export complete.');
}

exportData();

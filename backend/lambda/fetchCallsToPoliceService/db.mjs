import { createClient } from '@supabase/supabase-js'
import { getESTString } from './getEstString.mjs' 

const supabaseUrl = 'https://elfhalgqhxvulxbglzgj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZmhhbGdxaHh2dWx4YmdsemdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODgxMzEsImV4cCI6MjA2NzU2NDEzMX0.RBcKYh-HP3Ec7cBQzz_HrWFzCHaO3f3Wogewa9_NcwY'

const supabase = createClient(supabaseUrl, supabaseKey)

export const insertCallData = async (calls) => {

    const validCalls = calls.filter((call) => {
        return (
          call.callTime &&
          call.callType &&
          call.crossStreets &&
          (call.lat !== 0 || call.lng !== 0)
        );
    });

    const insertPayload = validCalls.map((call) => ({
            call_time: getESTString(call.callTime),
            call_type: call.callType,
            location: `POINT(${call.lng} ${call.lat})`,
            cross_streets: call.crossStreets,
    }))

    const { error } = await supabase
        .from('toronto_police_service_calls')
        .upsert(insertPayload, { onConflict: 'call_time', ignoreDuplicates: true });

    if (error) {
        console.error('Upsert error', error);
    }
}
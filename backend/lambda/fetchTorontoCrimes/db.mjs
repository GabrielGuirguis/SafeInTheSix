import { createClient } from '@supabase/supabase-js' 

const supabaseUrl = 'https://elfhalgqhxvulxbglzgj.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export const insertCrimeData = async (crimes) => {

    const validCrimes = crimes.filter((crime) => {
        return (
          crime.id &&
          crime.type &&
          crime.timestamp &&
          (crime.lat !== 0 || crime.lng !== 0)
        );
    });

    const insertPayload = validCrimes.map((crime) => ({
            id: crime.id,
            crime_type: crime.type,
            location: `POINT(${crime.lng} ${crime.lat})`,
            reported_at: new Date(crime.reportedAt).toISOString(),
            hour_of_day: crime.hour,
            neighbourhood: crime.neighbourhood,
            building_type: crime.buildingType
    }))

    const { error } = await supabase
        .from('crimes')
        .upsert(insertPayload, { onConflict: 'id', ignoreDuplicates: true });

    if (error) {
        console.error('Upsert error', error);
    }
}
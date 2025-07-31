import fetch from 'node-fetch';
// Have this run every so often (30 mins)
export const fetchCallData = async () => {

  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', };

  const url = `https://services.arcgis.com/S9th0jAJ7bqgIRjw/arcgis/rest/services/C4S_Public_NoGO/FeatureServer/0/query?where=1=1&outFields=*&f=json&resultRecordCount=15&orderByFields=OCCURRENCE_TIME DESC`;
  const response = await fetch(url, { headers });
  const data = await response.json();

  const calls = data.features.map((call) => {
    const attr = call.attributes;
    return {
      callTime: attr.OCCURRENCE_TIME,
      callType: attr.CALL_TYPE,
      lat: attr.LATITUDE,
      lng: attr.LONGITUDE,
      crossStreets: attr.CROSS_STREETS
    };
  })
  return calls;
};

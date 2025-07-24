import fetch from 'node-fetch';

export const fetchCrimeData = async (numCrimes) => {

  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', };

  const url = `https://services.arcgis.com/S9th0jAJ7bqgIRjw/arcgis/rest/services/YTD_CRIME_WM/FeatureServer/0/query?where=1=1&outFields=*&f=json&resultRecordCount=${numCrimes}&orderByFields=OCC_DATE_EST DESC`;
  const response = await fetch(url, { headers });
  const data = await response.json();

  const crimes = data.features.map((crime) => {
    const attr = crime.attributes;
    return {
      id: attr.EVENT_UNIQUE_ID,
      crimeType: attr.CRIME_TYPE,
      lat: attr.LAT_WGS84,
      lng: attr.LONG_WGS84,
      reportedAt: attr.OCC_DATE_EST,
      hour: attr.HOUR,
      neighbourhood: attr.NEIGHBOURHOOD_140,
      buildingType: attr.LOCATION_CATEGORY,
      
    };
  })
  return crimes;
};

export type EmergencyNumbers = {
  main: string;
  ambulance?: string;
  police?: string;
  fire?: string;
  alt?: string[];
};

const MAP: Record<string, EmergencyNumbers> = {
  US: { main: "911" },
  CA: { main: "911" },
  MX: { main: "911" },
  GB: { main: "999", alt: ["112"] },
  IE: { main: "112", alt: ["999"] },
  AU: { main: "000", alt: ["112"] },
  NZ: { main: "111" },
  IN: { main: "112", police: "100", fire: "101", ambulance: "102" },
  SG: { main: "995", police: "999" },
  AE: { main: "999", ambulance: "998" },
  JP: { main: "119", police: "110" },
  CN: { main: "120", police: "110", fire: "119" },
  BR: { main: "192", police: "190", fire: "193" },
  ZA: { main: "112", ambulance: "10177", police: "10111" },
  DE: { main: "112", police: "110" },
  FR: { main: "112" },
  ES: { main: "112" },
  IT: { main: "112" },
  SE: { main: "112" },
  NO: { main: "112" },
  FI: { main: "112" },
  NL: { main: "112" },
  BE: { main: "112" },
};

export function getEmergencyForCountry(code?: string): EmergencyNumbers {
  if (!code) return { main: "112" };
  return MAP[code.toUpperCase()] ?? { main: "112" };
}

export async function reverseGeocode(lat: number, lon: number): Promise<{ countryCode?: string; countryName?: string }> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
    );
    if (res.ok) {
      const data = await res.json();
      return { countryCode: data.countryCode, countryName: data.countryName };
    }
  } catch {}
  try {
    const res2 = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
      { headers: { "Accept-Language": "en" } },
    );
    if (res2.ok) {
      const d = await res2.json();
      const code = d?.address?.country_code?.toUpperCase();
      const name = d?.address?.country;
      return { countryCode: code, countryName: name };
    }
  } catch {}
  return {};
}

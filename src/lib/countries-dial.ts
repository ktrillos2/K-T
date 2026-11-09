export type DialCountry = {
  code: string;
  dial: string;
  name: string;
  placeholder: string;
};

export const DIAL_COUNTRIES: DialCountry[] = [
  { code: "CO", dial: "+57", name: "Colombia", placeholder: "311 636 0057" },
  { code: "MX", dial: "+52", name: "México", placeholder: "55 1234 5678" },
  { code: "US", dial: "+1", name: "Estados Unidos", placeholder: "202 555 0123" },
  { code: "ES", dial: "+34", name: "España", placeholder: "612 345 678" },
  { code: "PE", dial: "+51", name: "Perú", placeholder: "912 345 678" },
  { code: "AR", dial: "+54", name: "Argentina", placeholder: "11 1234 5678" },
  { code: "CL", dial: "+56", name: "Chile", placeholder: "9 1234 5678" },
  { code: "EC", dial: "+593", name: "Ecuador", placeholder: "99 123 4567" },
  { code: "VE", dial: "+58", name: "Venezuela", placeholder: "412 123 4567" },
  { code: "PA", dial: "+507", name: "Panamá", placeholder: "6123 4567" },
  { code: "CR", dial: "+506", name: "Costa Rica", placeholder: "8123 4567" },
  { code: "DO", dial: "+1", name: "Rep. Dominicana", placeholder: "809 123 4567" },
  { code: "GT", dial: "+502", name: "Guatemala", placeholder: "5123 4567" },
  { code: "BO", dial: "+591", name: "Bolivia", placeholder: "7123 4567" },
  { code: "UY", dial: "+598", name: "Uruguay", placeholder: "91 234 567" },
  { code: "PY", dial: "+595", name: "Paraguay", placeholder: "981 123 456" },
  { code: "HN", dial: "+504", name: "Honduras", placeholder: "9123 4567" },
  { code: "SV", dial: "+503", name: "El Salvador", placeholder: "7123 4567" },
  { code: "NI", dial: "+505", name: "Nicaragua", placeholder: "8123 4567" },
  { code: "PR", dial: "+1", name: "Puerto Rico", placeholder: "787 123 4567" },
  { code: "BR", dial: "+55", name: "Brasil", placeholder: "11 91234 5678" },
  { code: "CA", dial: "+1", name: "Canadá", placeholder: "416 123 4567" },
  { code: "GB", dial: "+44", name: "Reino Unido", placeholder: "7123 456789" },
  { code: "DE", dial: "+49", name: "Alemania", placeholder: "151 12345678" },
  { code: "FR", dial: "+33", name: "Francia", placeholder: "6 12 34 56 78" },
  { code: "IT", dial: "+39", name: "Italia", placeholder: "312 345 6789" },
];

export const DEFAULT_DIAL_COUNTRY = DIAL_COUNTRIES[0]; // Colombia (+57)

export function dialCountryByCode(code?: string | null): DialCountry {
  if (!code) return DEFAULT_DIAL_COUNTRY;
  const match = DIAL_COUNTRIES.find((c) => c.code.toUpperCase() === code.toUpperCase());
  return match || DEFAULT_DIAL_COUNTRY;
}

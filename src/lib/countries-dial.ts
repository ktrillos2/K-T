export type DialCountry = {
  code: string;
  dial: string;
  flag: string;
  name: string;
  placeholder: string;
};

export const DIAL_COUNTRIES: DialCountry[] = [
  { code: "CO", dial: "+57", flag: "🇨🇴", name: "Colombia", placeholder: "311 636 0057" },
  { code: "MX", dial: "+52", flag: "🇲🇽", name: "México", placeholder: "55 1234 5678" },
  { code: "US", dial: "+1", flag: "🇺🇸", name: "Estados Unidos", placeholder: "202 555 0123" },
  { code: "ES", dial: "+34", flag: "🇪🇸", name: "España", placeholder: "612 345 678" },
  { code: "PE", dial: "+51", flag: "🇵🇪", name: "Perú", placeholder: "912 345 678" },
  { code: "AR", dial: "+54", flag: "🇦🇷", name: "Argentina", placeholder: "11 1234 5678" },
  { code: "CL", dial: "+56", flag: "🇨🇱", name: "Chile", placeholder: "9 1234 5678" },
  { code: "EC", dial: "+593", flag: "🇪🇨", name: "Ecuador", placeholder: "99 123 4567" },
  { code: "VE", dial: "+58", flag: "🇻🇪", name: "Venezuela", placeholder: "412 123 4567" },
  { code: "PA", dial: "+507", flag: "🇵🇦", name: "Panamá", placeholder: "6123 4567" },
  { code: "CR", dial: "+506", flag: "🇨🇷", name: "Costa Rica", placeholder: "8123 4567" },
  { code: "DO", dial: "+1", flag: "🇩🇴", name: "Rep. Dominicana", placeholder: "809 123 4567" },
  { code: "GT", dial: "+502", flag: "🇬🇹", name: "Guatemala", placeholder: "5123 4567" },
  { code: "BO", dial: "+591", flag: "🇧🇴", name: "Bolivia", placeholder: "7123 4567" },
  { code: "UY", dial: "+598", flag: "🇺🇾", name: "Uruguay", placeholder: "91 234 567" },
  { code: "PY", dial: "+595", flag: "🇵🇾", name: "Paraguay", placeholder: "981 123 456" },
  { code: "HN", dial: "+504", flag: "🇭🇳", name: "Honduras", placeholder: "9123 4567" },
  { code: "SV", dial: "+503", flag: "🇸🇻", name: "El Salvador", placeholder: "7123 4567" },
  { code: "NI", dial: "+505", flag: "🇳🇮", name: "Nicaragua", placeholder: "8123 4567" },
  { code: "PR", dial: "+1", flag: "🇵🇷", name: "Puerto Rico", placeholder: "787 123 4567" },
  { code: "BR", dial: "+55", flag: "🇧🇷", name: "Brasil", placeholder: "11 91234 5678" },
  { code: "CA", dial: "+1", flag: "🇨🇦", name: "Canadá", placeholder: "416 123 4567" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "Reino Unido", placeholder: "7123 456789" },
  { code: "DE", dial: "+49", flag: "🇩🇪", name: "Alemania", placeholder: "151 12345678" },
  { code: "FR", dial: "+33", flag: "🇫🇷", name: "Francia", placeholder: "6 12 34 56 78" },
  { code: "IT", dial: "+39", flag: "🇮🇹", name: "Italia", placeholder: "312 345 6789" },
];

export const DEFAULT_DIAL_COUNTRY = DIAL_COUNTRIES[0]; // Colombia (+57)

export function dialCountryByCode(code?: string | null): DialCountry {
  if (!code) return DEFAULT_DIAL_COUNTRY;
  const match = DIAL_COUNTRIES.find((c) => c.code.toUpperCase() === code.toUpperCase());
  return match || DEFAULT_DIAL_COUNTRY;
}

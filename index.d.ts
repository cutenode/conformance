export interface license {
  uniqueLicenseIds: string[];
  spdxLicenseLinks?: string[];
  spdx?: {
      osi: boolean;
      fsf: boolean;
      fsfAndOsi: boolean;
      includesDeprecated: boolean;
  };
}

export interface result {
  licenses: license[];
  hasMultipleLicenses: boolean;
  uniqueLicenseIds: string[];
}
export interface complianceOptions {
  throwOnError: boolean;
}

/**
 * returnableLicense
 */
export interface license {
  uniqueLicenseIds: string[];
  spdxLicenseLinks: string[];
  spdx?: {
    osi: boolean;
    fsf: boolean;
    fsfAndOsi: boolean;
    includesDeprecated: boolean;
  };
}

/**
 * returnableLicenseEror
 */
export interface licenseError {
  license: string;
  error: string;
}

export declare function compliance(licenseID: string, options: complianceOptions): Promise<license | licenseError>

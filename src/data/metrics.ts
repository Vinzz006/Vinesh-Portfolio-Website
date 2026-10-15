export interface MeasuredResult {
  label: string;
  value: string | number;
  unit: string;
  method: string;
  datasetOrSourceUrl: string;
}

/**
 * Verified and defensible measured results.
 * Empty by default until real benchmark data (dataset, split, test device, measurement methodology)
 * is supplied and verified by the portfolio owner.
 *
 * See docs/USER_INPUTS_NEEDED.md to supply values.
 */
export const measuredResults: MeasuredResult[] = [];

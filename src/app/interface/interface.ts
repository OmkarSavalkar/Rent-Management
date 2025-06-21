export interface IRenterProfile {
  id: string;
  name: string;
  joiningDate: string;
  meterNo: number;
  depositPaid: number;
  mobile: number;
  address: string;
  waterRate: number;
  unitRate: number;
  maintenanceRate: number;
  lastMeterUnit: number | undefined;
  rent: number;
  lastGenerated: Date | string;
}

export interface IDropdownOptions {
  id: string;
  name: string;
}

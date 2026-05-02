export type DateRange = '7d' | '30d' | '90d' | '12m';

export interface AdmissionPoint {
  label: string;
  admissions: number;
  discharges: number;
}

export interface DepartmentSlice {
  name: string;
  value: number;
}

export interface AppointmentStatusBucket {
  status: string;
  count: number;
}

export type PatientStatus = 'active' | 'discharged' | 'critical' | 'follow-up';

export type PatientGender = 'male' | 'female' | 'other';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: PatientGender;
  status: PatientStatus;
  condition: string;
  lastVisit: string;
  doctor: string;
  avatarUrl?: string;
}

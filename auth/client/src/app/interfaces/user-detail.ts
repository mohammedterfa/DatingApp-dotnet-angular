export interface UserDetail {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  token: string;
  phoneNumber: string;
  twoFactorEnabled: boolean;
  phoneNumberConfirmed: boolean;
  accessFailedCount: number;
}

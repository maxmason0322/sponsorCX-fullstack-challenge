interface ModelBase {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface Organization extends ModelBase {
  name: string;
}

export interface OrganizationDetails extends Organization {
  accounts: (Account & { deals: Deal[] })[];
}

export interface Account extends ModelBase {
  organization_id: number;
  name: string;
}

export interface Deal extends ModelBase {
  account_id: number;
  start_date: string;
  end_date: string;
  value: number;
  status: string;
}

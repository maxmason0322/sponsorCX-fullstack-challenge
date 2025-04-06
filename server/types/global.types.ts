interface ModelBase {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Organization extends ModelBase {
  name: string;
}

export interface Account extends ModelBase {
  organizationId: number;
  name: string;
}

export interface Deal extends ModelBase {
  accountId: number;
  startDate: string;
  endDate: string;
  value: number;
  status: string;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  teamLeaderId?: number;

  Vacation: Vacation[];
  VacationInfo: VacationInfo[];

  createdAt: Date;
  updatedAt: Date;
};

export type Vacation = {
  id: number;
  start: string;
  end: string;
  userId: number;
  note?: string;

  createdAt: Date;
  updatedAt: Date;
};

export type VacationInfo = {
  id: number;
  originalDays: number;
  remainingDays: number;
  userId: number;

  createdAt: Date;
  updatedAt: Date;
};

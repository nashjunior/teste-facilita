export type IUsersOutput = {
  id: string;
  name: string;
  username: string;
  isCustomer: boolean;
  isPhysicalPerson: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

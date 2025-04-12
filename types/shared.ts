export type GenericEntity = DatedEntity & {
  id: string;
};

export type DatedEntity = {
  createdAt: Date;
  updatedAt: Date;
};

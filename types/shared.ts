export type GenericEntity = DatedEntity & {
  id: number;
};

export type DatedEntity = {
  createdAt: Date;
  updatedAt: Date;
};

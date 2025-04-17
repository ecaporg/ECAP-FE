export type GenericEntity = DatedEntity & {
  id: number | string;
};

export type DatedEntity = {
  createdAt: Date;
  updatedAt: Date;
};

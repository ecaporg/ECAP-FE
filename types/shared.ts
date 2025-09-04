export type GenericEntity = DatedEntity & {
  id: number | string;
};

export type CanvasGenericEntity = GenericEntity & {
  canvas_id?: string;
};

export type DatedEntity = {
  createdAt: Date;
  updatedAt: Date;
};

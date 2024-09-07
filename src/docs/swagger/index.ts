import { userSwagger } from './userSwagger';

export const paths = {
  ...userSwagger.paths,
};

export const tags = [...userSwagger.tags];

export const schemas = {
  ...userSwagger.components.schemas,
};

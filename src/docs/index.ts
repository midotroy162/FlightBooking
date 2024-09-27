import { userSwagger } from './swagger/userSwagger';
import { authSwagger } from './swagger/authSwagger';

export const paths = {
  ...userSwagger.paths,...authSwagger.paths
};

export const tags = [...userSwagger.tags,...authSwagger.tags];

export const schemas = {
  ...userSwagger.components.schemas,
  ...authSwagger.components.schemas,
};

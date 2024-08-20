export type ServiceResponse<T> = {
    error?: string ;
    data?: T | undefined |null;
  };
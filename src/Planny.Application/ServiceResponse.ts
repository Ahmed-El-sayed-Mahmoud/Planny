export type ServiceResponse<T> = {
    data?: T | undefined |null;
    error?:{
      message:string,
      status:Number
    }
  };
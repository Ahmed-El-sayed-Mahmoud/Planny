export type RepositoryRespone<T>={
    data?:T,
    error?:{
        message:string,
        status:Number
    },
    
}
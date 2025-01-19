declare global {
    interface UserDTO {
        userId: number ;
        email?: string ;
        password?: string ;
        createdAt?: string ;
        updatedAt?: string ;
        status?: string ;
        role?: integer;
        name?: string;
    }
}
export {}
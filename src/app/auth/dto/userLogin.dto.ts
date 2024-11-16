
export interface UserLoginDto{
    token: string;
    userId: number;
    email: string;
    ttl: number;
    created: Date;
}
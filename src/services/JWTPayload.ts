import { JwtPayload } from 'jsonwebtoken'

export interface UserJWTPayload extends JwtPayload{
    username: string
    rnd?: number
}
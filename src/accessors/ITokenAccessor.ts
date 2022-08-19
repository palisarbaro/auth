export default interface ITokenAccessor {
    saveRefreshToken(username:string, refreshToken:string): Promise<void>
    findNameByRefreshToken(refreshToken:string): Promise<string|null>
}
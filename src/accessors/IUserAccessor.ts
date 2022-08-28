export default interface IUserAccessor {
    createUser(name: string, passhash: string): Promise<boolean>
    getPassworHashdByUserName(name: string): Promise<string|null>
}

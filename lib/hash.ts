import bcrypt from 'bcrypt'

export const hashed = async (pasword: string) => {
    return await bcrypt.hash(pasword, 10).then(async hash => {
        return await hash
    })
}

export const verifyHash = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash).then(async (result) => {
        return await result
    });
}
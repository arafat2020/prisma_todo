import jwt from 'jsonwebtoken'

const jwt_severt = '89734jkshfg9309503hnk'

export const createToken = (id: Number, name: string) => {
    return jwt.sign({
        data: {
            id, name
        }
    }, jwt_severt, { expiresIn: '10h' });
}

export const verifyJwt = (token: string) => {
    return jwt.verify(token, jwt_severt, function (err, decoded) {
        return  decoded
    });
}
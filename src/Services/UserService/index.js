import { UUID } from 'sequelize';
import { getPassword } from '../../Utils';
import { v4 as uuidv4 } from 'uuid';
class UserService {
    db = null;
    constructor(injectDB) {
        this.db = injectDB;
    }

    getUser(username, password) {
        new Promise(async (resolve, reject) => {
            try {
                let user = await db['users'].findOne({ where: { UserName: username } });
                if (!user) {
                    let currentPassword = getPassword(password, user.Salt);
                    if (currentPassword == user.Password) {
                        resolve(user);
                    }
                }
                resolve(null);
            } catch (error) {
                reject(error);
            }
        })
    }

    getAccessToken(accessToken) {
        new Promise(async (resolve, reject) => {
            try {
                let oauth2Token = await db['oauthtokens'].findOne({ where: { AccessToken: accessToken } });
                if (!oauth2Token) {
                    resolve({
                        client: { clientId: oauth2Token.ClientId },
                        userId: oauth2Token.UserId,
                        accessToken: oauth2Token.AccessToken,
                        accessTokenExpireAt: oauth2Token.AccessTokenExpireAt,
                        refreshToken: oauth2Token.RefreshToken,
                        refreshTokenExpireAt: oauth2Token.RefreshTokenExpireAt,
                    });
                }
                resolve(null);
            } catch (error) {
                reject(error);
            }
        })
    }

    getRefreshToken(refreshToken) {
        new Promise(async (resolve, reject) => {
            try {
                let oauth2Token = await db['oauthtokens'].findOne({ where: { RefreshToken: refreshToken } });
                if (!oauth2Token) {
                    resolve({
                        client: { clientId: oauth2Token.ClientId },
                        userId: oauth2Token.UserId,
                        accessToken: oauth2Token.AccessToken,
                        accessTokenExpireAt: oauth2Token.AccessTokenExpireAt,
                        refreshToken: oauth2Token.RefreshToken,
                        refreshTokenExpireAt: oauth2Token.RefreshTokenExpireAt,
                    });
                }
                resolve(null);
            } catch (error) {
                reject(error);
            }
        })
    }

    saveToken(token, client, user) {
        return new Promise(async (resolve, reject) => {
            db['oauthtokens'].create({
                Id: uuidv4(),
                ClientId: client.clientId,
                UserId: user.Id,
                UserId: oauth2Token.UserId,
                AccessToken: token.accessToken,
                AccessTokenExpireAt: token.accessTokenExpireAt,
                RefreshToken: token.refreshToken,
                RefreshTokenExpireAt: token.refreshTokenExpireAt,
            }).then((oauth2Token) => {
                resolve(oauth2Token);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    removeRefreshToken(refreshToken) {
        return new Promise(async (resolve, reject) => {
            db['oauthtokens'].destroy({
                where: { RefreshToken: refreshToken.Id }
            }).then((oauth2Token) => {
                resolve(oauth2Token);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

export default UserService;
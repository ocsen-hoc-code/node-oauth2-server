import { UUID } from 'sequelize';
import { getPassword } from '../../Utils';
import { v4 as uuidv4 } from 'uuid';
class UserService {
    db = null;
    constructor(injectDB) {
        this.db = injectDB;
    }

    getClient(clientId, clientSecret) {
        return new Promise(async (resolve, reject) => {
            try {
                let client = await this.db.OauthClients.findOne({
                    where: {
                        ClientId: clientId,
                        ClientSecret: clientSecret
                    },
                    raw: true
                });

                if (client) {
                    let grants = client.Grants ? client.Grants.replaceAll(' ', '') : null;
                    grants = grants ? grants.split(',') : null;

                    resolve({
                        id: client.ClientId,
                        userId: client.UserId,
                        redirectUris: client.RedirectUris,
                        grants: grants,
                        accessTokenLifetime: client.AccessTokenLifetime,
                        refreshTokenLifetime: client.RefreshTokenLifetime
                    });
                } else {
                    resolve(false);
                }
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    getAuthorizationCode(authorizationCode) {
        return new Promise(async (resolve, reject) => {
            try {
                let oauthCode = await db.OauthorizationCodes.findOne({
                    where: {
                        Code: authorizationCode
                    },
                    raw: true
                });
                if (oauthCode) {
                    let result = await Promise.all([
                        db.Users.findOne({
                            where: { UserId: oauthCode.UserId },
                            attributes: [Id, UserName, Email, Scope],
                            raw: true
                        }),
                        db.OauthClients.findOne({ where: { ClientId: oauthCode.ClientId }, raw: true }),
                    ]);

                    let user = result[0] ? {
                        id: result[0].Id,
                        userName: result[0].UserName,
                        email: result[0].Email,
                        scope: result[0].Scope
                    } : null;
                    let client = result[1] ? { id: result[1].ClientId } : null;

                    resolve({
                        code: oauthCode.code,
                        expiresAt: code.ExpiresAt,
                        redirectUri: code.RedirectUri,
                        client: client,
                        user: user,
                        scope: user.scope
                    });
                } else {
                    resolve(false);
                }
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    getUser(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await this.db.Users.findOne({ where: { UserName: username }, raw: true });
                if (user) {
                    let currentPassword = await getPassword(password, user.Salt);

                    if (currentPassword == user.Password) {
                        resolve({
                            id: user.Id,
                            userName: user.UserName,
                            email: user.Email
                        });
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    getAccessToken(accessToken) {
        return new Promise(async (resolve, reject) => {
            try {
                let oauth2Token = await db.OAuthTokens.findOne({ where: { AccessToken: accessToken } });
                if (oauth2Token) {
                    let result = await Promise.all([
                        db.Users.findOne({
                            where: { UserId: oauth2Token.UserId },
                            attributes: [Id, UserName, Email, Scope],
                            raw: true
                        }),
                        db.OauthClients.findOne({ where: { ClientId: oauth2Token.ClientId }, raw: true }),
                    ]);

                    let user = result[0] ? {
                        id: result[0].Id,
                        userName: result[0].UserName,
                        email: result[0].Email,
                        scope: result[0].Scope
                    } : null;
                    let client = result[1] ? { id: result[1].ClientId } : null;
                    resolve({
                        client: client,
                        user: user,
                        scope: user.scope,
                        accessToken: oauth2Token.AccessToken,
                        accessTokenExpiresAt: oauth2Token.AccessTokenExpiresAt,
                        refreshToken: oauth2Token.RefreshToken,
                        refreshTokenExpiresAt: oauth2Token.RefreshTokenExpiresAt,
                    });
                } else {
                    resolve(false);
                }
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    getRefreshToken(refreshToken) {
        return new Promise(async (resolve, reject) => {
            try {
                let oauth2Token = await db.OAuthTokens.findOne({ where: { RefreshToken: refreshToken } });
                if (oauth2Token) {
                    let result = await Promise.all([
                        db.Users.findOne({
                            where: { UserId: oauth2Token.UserId, Scope },
                            attributes: [Id, UserName, Email],
                            raw: true
                        }),
                        db.OauthClients.findOne({ where: { ClientId: oauth2Token.ClientId }, raw: true }),
                    ]);

                    let user = result[0] ? {
                        id: result[0].Id,
                        userName: result[0].UserName,
                        email: result[0].Email,
                        scope: result[0].Scope
                    } : null;
                    let client = result[1] ? { id: result[1].ClientId } : null;
                    resolve({
                        client: client,
                        user: user,
                        scope: user.scope,
                        accessToken: oauth2Token.AccessToken,
                        accessTokenExpiresAt: oauth2Token.AccessTokenExpiresAt,
                        refreshToken: oauth2Token.RefreshToken,
                        refreshTokenExpiresAt: oauth2Token.RefreshTokenExpiresAt,
                    });
                } else {
                    resolve(false);
                }
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    getUserFromClient(client) {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await db.Users.findOne({ where: { Id: client.userId }, raw: true });
                if (user) {
                    resolve({
                        id: user.Id,
                        userName: user.UserName,
                        email: user.Email
                    });
                } else {
                    resolve(false);
                }
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    saveAuthorizationCode(code, client, user) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    ClientId: client.id,
                    UserId: user.id,
                    Code: code.code,
                    ExpiresAt: code.expiresAt,
                    RedirectUri: code.redirectUri,
                    updatedAt: new Date()
                };
                let oauthorizationCode = await db.OauthorizationCodes.findOne({
                    where: {
                        ClientId: client.id,
                        UserId: user.id,
                    }, raw: true
                });
                if (oauthorizationCode) {
                    await db.OauthorizationCodes.update(data, { Id: oauthorizationCode.Id });
                } else {
                    data.createdAt = data.updatedAt;
                    data.Id = uuidv4();
                    await db.OauthorizationCodes.create(data);
                }
                resolve({
                    authorizationCode: code.Code,
                    expiresAt: code.expiresAt,
                    redirectUri: code.redirectUri,
                    scope: user.scope,
                    client: client,
                    user: user
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    saveToken(token, client, user) {
        return new Promise(async (resolve, reject) => {
            try {

                let data = {
                    ClientId: client.id,
                    UserId: user.id,
                    AccessToken: token.accessToken,
                    AccessTokenExpiresAt: token.AccessTokenExpiresAt,
                    RefreshToken: token.refreshToken,
                    RefreshTokenExpiresAt: token.RefreshTokenExpiresAt,
                    updatedAt: new Date()
                };

                let oldToken = await this.db.OAuthTokens.findOne({
                    where: {
                        ClientId: client.id,
                        UserId: user.id,
                    }
                });

                if (oldToken) {
                    await this.db.OAuthTokens.update(data, { where: { Id: oldToken.Id } });
                } else {
                    data.createdAt = data.updatedAt;
                    data.Id = uuidv4();

                    await this.db.OAuthTokens.create(data);
                }

                resolve({
                    accessToken: token.accessToken,
                    accessTokenExpiresAt: token.accessTokenExpiresAt,
                    refreshToken: token.refreshToken,
                    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                    scope: user.scope,
                    client: client,
                    user: user
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    removeRefreshToken(token) {
        return new Promise(async (resolve, reject) => {
            this.db.Users.update({
                where: { RefreshToken: token.refreshToken }
            }).then((oauth2Token) => {
                if (oauth2Token) {
                    oauth2Token.AccessToken = null;
                    oauth2Token.RefreshToken = null;
                    oauth2Token.save().then(data => {
                        resolve(!!data);
                    }).catch(error => {
                        console.log(error);
                        reject(error);
                    });
                } else {
                    resolve(false);
                }
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    revokeAuthorizationCode(code) {
        return new Promise(async (resolve, reject) => {
            this.db.OauthorizationCodes.findOne({
                where: { Code: code.code }
            }).then((authorizationCode) => {
                if (authorizationCode) {
                    authorizationCode.Code = null;
                    authorizationCode.save().then(data => {
                        resolve(!!data);
                    }).catch(error => {
                        console.log(error);
                        reject(error);
                    });
                } else {
                    resolve(false);
                }
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    verifyScope(token, scope) {
        if (undefined == scope || 0 == scope.lenght) {
            return true;
        }

        if (!token.scope) {
            return false;
        }

        let requestedScopes = scope.replaceAll(' ', '');
        requestedScopes = scope.split(',');
        let authorizedScopes = token.scope.replaceAll(' ', '');
        authorizedScopes = token.scope.split(',');
        return requestedScopes.some(s => authorizedScopes.indexOf(s) >= 0);
    }
}

export default UserService;
let userService;
import { ClientAuthorization } from '../../Contants'

export const Oauth2Model = (userServ) => {
    userService = userServ;
    return {
        getClient,
        getAuthorizationCode,
        getUser,
        getUserFromClient,
        getAccessToken,
        getRefreshToken,
        saveAuthorizationCode,
        saveToken,
        revokeToken,
        revokeAuthorizationCode,
        verifyScope
    }
};

const getClient = (clientId, clientSecret, done) => {
    userService.getClient(clientId, clientSecret).then((client) => {
        done(client)
    }).catch((ex) => {
        done(ex.Error, null);
    });
}

const getAuthorizationCode = (authorizationCode, done) => {
    userService.getAuthorizationCode(authorizationCode).then((client) => {
        done(client)
    }).catch((ex) => {
        done(ex.Error, null);
    });
}

const getUser = (username, password, done) => {
    userService.getUser(username, password).then((user) => {
        done(null, user);
    }).catch((ex) => {
        done(ex.Error, null);
    });
}

const getUserFromClient = (client, done) => {
    userService.getUserFromClient(client).then((data) => {
        done(data)
    }).catch((ex) => {
        done(null);
    });
}

const getAccessToken = (accessToken, done) => {
    userService.getAccessToken(accessToken).then((oauthToken) => {
        done(null, oauthToken);
    }).catch((ex) => {
        done(ex.Error, null);
    });
}

const getRefreshToken = (refreshToken, done) => {
    userService.getAccessToken(refreshToken).then((oauthToken) => {
        done(null, oauthToken);
    }).catch((ex) => {
        done(ex.Error, null);
    });
}

const saveToken = (token, client, user, done) => {
    userService.saveToken(token, client, user).then((data) => {
        done(null, data);
    }).catch((ex) => {
        done(ex.Error, null);
    });
}

const saveAuthorizationCode = (code, client, user, done) => {
    userService.saveAuthorizationCode(code, client, user).then((data) => {
        done(null, data);
    }).catch((ex) => {
        done(ex.Error, null);
    });
}

const revokeToken = (token, done) => {
    userService.removeRefreshToken(token.refreshToken).then((data) => {
        done(null, data);
    }).catch((ex) => {
        done(ex.Error, null);
    });
}

const revokeAuthorizationCode = (code, done) => {
    userService.revokeAuthorizationCode(code).then((data) => {
        done(null, data);
    }).catch((ex) => {
        done(ex.Error, null);
    });
}

const verifyScope = (token, scope, done) => {
    userService.verifyScope(token, scope).then((data) => {
        done(null, data);
    }).catch((ex) => {
        done(ex.Error, null);
    });
}

let userService;
import { ClientAuthorization } from '../../Contants'

export const Oauth2Model = (userServ) => {
    userService = userServ;
    return {
        getClient,
        getUser,
        getAccessToken,
        getRefreshToken,
        saveToken,
        revokeToken
    }
};

const getClient = (clientId, clientSecret, done) => {
    userService.getClient(clientId, clientSecret).then((client) => {
        done(client)
    }).catch((ex) => {
        done(null);
    });
}

const getUser = (username, password, done) => {
    userService.getUser(username, password).then((user) => {
        done(null, user);
    }).catch((ex) => {
        done(ex.Error, null);
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

const revokeToken = (token, done) => {
    userService.removeRefreshToken(token.refreshToken).then((data) => {
        done(null, data);
    }).catch((ex) => {
        done(ex.Error, null);
    });
}
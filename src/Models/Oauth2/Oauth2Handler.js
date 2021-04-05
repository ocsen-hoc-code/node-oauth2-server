import OAuth2Server from 'oauth2-server';
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

export const oauth2Handler = (app, options) => {
    return (req, res, next) => {
        let request = new Request(req);
        let response = new Response(res);
        return app.oauth.authenticate(request, response, options)
            .then((token) => {
                next();
            })
            .catch((err) => {
                console.log(err);
                res.status(err.code || 400).json({ msg: "You don't have permision!" })
            });
    }
}
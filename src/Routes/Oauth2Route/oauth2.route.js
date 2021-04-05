import OAuth2Server from 'oauth2-server';
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const oauth2Route = (app) => {
    app.all('/oauth2/token', (req, res) => {
        const request = new Request(req);
        const response = new Response(res);
        app.oauth.token(request, response)
            .then((token) => {
                res.status(200).json(token);
            })
            .catch((err) => {
                res.status(err.code || 500).json(err);
            });
    });

    app.get('/test', (req, res) => {
        res.status(200).json('Test');
    });
}

export default oauth2Route;
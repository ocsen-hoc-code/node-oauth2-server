# node-oauth2-server

1. Install Docker and Docker Composer.
   - Run `docker-compose up -d` to start **Postgresql** and **PgAdmin**.
2. Run migrate command
   - Run `yarn sequelize-cli db:migrate` to create tables.
   - Run `yarn sequelize-cli db:seed:all` to create data.(User and OAuthorize Client).
3. Start OAuth2 Server
   - Run `yarn start`.
   - Open browser to link `http://127.0.0.1:8888`.
4. Login by OAuth2 by link `http://127.0.0.1:8888/oauth2/token`

Data request `Content-Type: application/x-www-form-urlencoded`

`{
   Authorization:Basic b2NzZW4tc2ltcGxlOm9jc2VuLWhvYy1jb2Rl
   username:dolambinhminh
   password:dolambinhminh
   grant_type:password
}`

or

`{
   Authorization:Basic b2NzZW4td2l0aC1wYXNzd29yZDpvY3Nlbi1ob2MtY29kZQ==
   username:dolambinhminh
   password:dolambinhminh
   grant_type:password
}`

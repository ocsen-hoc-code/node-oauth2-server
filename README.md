# node-oauth2-server

1. Install Docker and Docker Composer.
   - Run `docker-compose up -d` to start **Postgresql** and **PgAdmin**.
2. Run migrate command
   - Run `yarn sequelize-cli db:migrate` to create tables.
   - Run `yarn sequelize-cli db:seed:all` to create data.(User and OAuthorize Client).
3. Start OAuth2 Server
   - Run `yarn start`.
   - Open browser to link `http://127.0.0.1:8888`.

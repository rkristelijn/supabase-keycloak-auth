# Detailed documentation

## Set up Keycloak

Keycloak has been set up locally using docker and realm configured with client and user.

just run:

- `npm run start:keycloak` to start via npm
- or `docker-compose -f keycloak/docker-compose.yml up` - to start via console

### Using Keycloak

1. navigate to http://localhost:8080/
2. log in with `admin`/`admin`
3. find preconfigured:
  - realm: `Supabase`
  - client: `supabase`
  - user: `user`/`pass`

## Set up Supabase

### Set up a new project

1. go to https://supabase.com/dashboard/project and set up a new project
2. grab the `anon key` and `url` from the project API and set them in `.env.local`

### Set up the provider

1. go to https://supabase.com/dashboard/project/<projectid>/auth/providers
  - enable Keycloak
  - client ID: `supabase`
  - Secret: `myclientsecret`
  - Realm URL: `http://localhost:8080/realms/supabase` (this you can find in the realm in Keycloak, click the link 'OpenID Endpoint Configuration' at the bottom of the page, see 'issuer')

### Add Redirect URLs

1. go to https://supabase.com/dashboard/project/pdmjhuibertsbigbrgns/auth/url-configuration
  - Site URL: `http://localhost:3000`
  - Redirect URLs: `http://localhost:3000/callback/**` < unsure if ** need to be added
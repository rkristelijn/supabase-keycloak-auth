# Issue Description

Below is a descriptions of all the issues ran into and overcome

## Documentation issues

This is regarding https://supabase.com/docs/guides/auth/social-login/auth-keycloak?queryGroups=framework&framework=nextjs

1. nitpick: could provide a ready-made realm, just as in the [keycloak](../keycloak/README.md) folder.
2. nitpick: it is using an old keycloak GUI, this can lead to inconsistancies
3. nitpick: "Since Keycloak version 22, the openid scope must be passed. Add this to the supabase.auth.4.signInWithOAuth() method." > however the example is without { scopes: 'openid' }. 
4. documentation uses deprecated function:
```ts
/**
 * @deprecated Please specify `getAll` and `setAll` cookie methods instead of
 * the `get`, `set` and `remove`. These will not be supported in the next major
 * version.
 */
export declare function createServerClient...
```

## Log in flow issue

### Expectation

1. starting from NextJS; localhost:3000 - loads the page
2. clicking the login button - redirects to Supabase
3. Supabase redirectd to Keycloak to log in
4. User enters credential: `user`/`pass` in Keycloak
5. When successful, Keycloak redirects to Supabase
6. Supabase redirects to NextJS with code, code is used to get token?

### Actual

> projectid is replaced by <project>

1. works ok
2. https://<project>.supabase.co/auth/v1/authorize?provider=keycloak&redirect_to=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scopes=openid
3. http://localhost:8080/realms/supabase/protocol/openid-connect/auth?client_id=supabase&redirect_to=http%3A%2F%2Flocalhost%3A3000%2Fcallback&redirect_uri=https%3A%2F%2F<project>.supabase.co%2Fauth%2Fv1%2Fcallback&response_type=code&scope=profile+email+openid&state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjA1MTkzNzQsInNpdGVfdXJsIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJmdW5jdGlvbl9ob29rcyI6bnVsbCwicHJvdmlkZXIiOiJrZXljbG9hayIsInJlZmVycmVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL2NhbGxiYWNrIiwiZmxvd19zdGF0ZV9pZCI6IiJ9.FOxsoyQ3fI5re6GcIKeNs6Woa9xiQh6YfyuQJI1LdEw
4. 
http://localhost:8080/realms/supabase/login-actions/authenticate?session_code=MtLEGMniUWLpezkagUr5q7-SwMn8DhoTEPzNeMOcS5I&execution=4e519ebb-7d5c-4a87-aa00-85755940bd51&client_id=supabase&tab_id=XWnmK4stOBI&client_data=eyJydSI6Imh0dHBzOi8vcGRtamh1aWJlcnRzYmlnYnJnbnMuc3VwYWJhc2UuY28vYXV0aC92MS9jYWxsYmFjayIsInJ0IjoiY29kZSIsInN0IjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmxlSEFpT2pFM01qQTFNVGt6TnpRc0luTnBkR1ZmZFhKc0lqb2lhSFIwY0RvdkwyeHZZMkZzYUc5emREb3pNREF3SWl3aWFXUWlPaUl3TURBd01EQXdNQzB3TURBd0xUQXdNREF0TURBd01DMHdNREF3TURBd01EQXdNREFpTENKbWRXNWpkR2x2Ymw5b2IyOXJjeUk2Ym5Wc2JDd2ljSEp2ZG1sa1pYSWlPaUpyWlhsamJHOWhheUlzSW5KbFptVnljbVZ5SWpvaWFIUjBjRG92TDJ4dlkyRnNhRzl6ZERvek1EQXdMMk5oYkd4aVlXTnJJaXdpWm14dmQxOXpkR0YwWlY5cFpDSTZJaUo5LkZPeHNveVEzZkk1cmU2R2NJS2VOczZXb2E5eGlRaDZZZnl1UUpJMUxkRXcifQ
5. https://<project>.supabase.co/auth/v1/callback?state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjA1MTkzNzQsInNpdGVfdXJsIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJmdW5jdGlvbl9ob29rcyI6bnVsbCwicHJvdmlkZXIiOiJrZXljbG9hayIsInJlZmVycmVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL2NhbGxiYWNrIiwiZmxvd19zdGF0ZV9pZCI6IiJ9.FOxsoyQ3fI5re6GcIKeNs6Woa9xiQh6YfyuQJI1LdEw&session_state=44964766-0a70-463e-ab22-8803f87c980f&iss=http%3A%2F%2Flocalhost%3A8080%2Frealms%2Fsupabase&code=e0970b41-2a56-4206-8c25-c908e4ceef1f.44964766-0a70-463e-ab22-8803f87c980f.77b150f1-4898-4083-8e66-4944334b1185
6. http://localhost:3000/callback?error=server_error&error_code=500&error_description=Unable+to+exchange+external+code%3A+e0970b41-2a56-4206-8c25-c908e4ceef1f.44964766-0a70-463e-ab22-8803f87c980f.77b150f1-4898-4083-8e66-4944334b1185 < there is no info, no jwt... 
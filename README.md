Sails-OAuth2-API
----------------

Purposes
--------

Several purposes of this application:

* integrate OAuth2 to protect a REST API developped with sailsjs


Status
------

- Migrated to sails 0.11

- available flows
  * Authorization code
  * Resource owner password
  * Implicit flow (not functional yet)

- models implemented
  * User: resource owner
  * Client: application willing to use the user's resource
  * AccessToken: token used by the client each time the API is called with the user's identity
  * RefreshToken: token used to get a new AccessToken

- controllers
  * InfoController: a basic controller that will be called to test the OAuth mecanism
  * Client controller: used to manage client (only create and list). This controller will be used by administrators

- authentication
  * config/passport.js: defining passport strategy

- OAuth service
  * config/oauth2.js defining the OAuth server and the exchange strategy

Details
-------

When lifting the sails application, a default user and 2 defaults clients are created (among which one is trusted and the other is not).
In the console, the client_id and client_secret of each client are displayed and the default user credential as well.


**Resource owner password flow** (this flow is only available if the client is among the trusted clients)

Issue the following curl request to get an access token

```
curl -XPOST "http://localhost:1337/oauth/token" -d "grant_type=password&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&username=USERNAME&password=PASSWORD"
```

This returns an access token and a refresh token in a the following json format

```json
{
  "access_token":"UeCnysUiLLzxS6tCKkEeMnRxvTsyq5bri9AFUeQV4OEOqoketVZd7HVQpjOeWOLwBhwaWokFXdBsQ34oU0Kcafq8cHgS3lu2Si6I2xvKifo46F8HiU18aicWTzizNocfHVKYYFEhcYftEVEmyvrkcPt1loaAHcKAhY8IzobgkTiMh6ZTfAdQKWn7pM0iS1sojW8H0v6pL9xLNRj0lwbTNHcMDWwdfCCGEq9NuZAiFuKspOg5LeLYKSXxm0vQAHFr",
  "refresh_token":"zu1dbMCuP46NS2hqjmq1ZFPzNrVsSpM9BvFCOizo3GmrE9jRwrY26m1b6JK3Jbud4ejb2xw3MZZc56snT15Y9hWXsmvGSOyKufS0cu8ZKGfVwUjwBcyu7SkcZCcCLUDgq5BJzFJ9ZBv6TKwltdUb8LQAEcDSLLRAXbIHsorStKW0CXqNuL9iSVdKgTXMVkiT2ik8Z4PUMf3daLQSMvwPK69srvYttFNpM3mUMOC2Y2U0AmiRDLYIr3Nsid0hwGsi",
  "expires_in":3600,
  "token_type":"Bearer"
}
```

Note: if the curl command above is issued with the client_id of the untrusted client (third party client applications that require access to the resource), a 401 error is raised.

Once the access_token is retrieved, it needs to be passed in the Authorization header of each request to the API as in the following example:

```
curl -H 'Authorization: Bearer ACCESS_TOKEN' -GET "http://localhost:1337/api/info
```

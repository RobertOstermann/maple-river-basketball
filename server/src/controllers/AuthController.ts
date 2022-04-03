import "dotenv/config";

import * as Auth0 from "auth0";
import axios from "axios";
import Express from "express";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

export default class AuthController {
  static jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ["RS256"],
  });

  static getAccessToken = (): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const auth0 = new Auth0.AuthenticationClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_API_CLIENT_ID,
      clientSecret: process.env.AUTH0_API_CLIENT_SECRET
    });

    return new Promise((resolve, reject) => {
      auth0.clientCredentialsGrant({
        audience: process.env.AUTH0_AUDIENCE,
      }, (error: Error, res: Auth0.TokenResponse) => {
        if (error) {
          reject(error);
        } else {
          resolve(res.access_token);
        }
      });
    });
  };

  static getUserInformation = async (userId: string): Promise<Auth0.User> => {
    const auth0 = new Auth0.ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_API_CLIENT_ID,
      clientSecret: process.env.AUTH0_API_CLIENT_SECRET
    });

    const userObject: Auth0.ObjectWithId = {
      id: userId
    };

    const user: Auth0.User = await auth0.getUser(userObject);

    return user;
  };
}

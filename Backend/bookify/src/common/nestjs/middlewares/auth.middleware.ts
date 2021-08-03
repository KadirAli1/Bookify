import { Response, Request, NextFunction } from 'express';
import admin from 'firebase-admin';
import { HttpStatus } from '@nestjs/common';

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Request...`);
  let jwtToken = req.headers.authorization;

  if (jwtToken != null && jwtToken != '') {
    //  if token provided we verify it using the firebase service.
    if (jwtToken.startsWith('Bearer ')) {
      jwtToken = jwtToken.split(' ')[1];
    }
    admin
      .auth()
      .verifyIdToken(jwtToken)
      .then((decodedToken) => {
        const { sub, role } = decodedToken;
        req['firebase_user'] = {
          id: sub,
          role: role,
        };

        next();
      })
      .catch(() => {
        res.status(HttpStatus.FORBIDDEN).json({
          statusCode: HttpStatus.FORBIDDEN,
          timestamp: new Date().toISOString(),
          path: req.url,
          message: 'Access Denied!',
        });
      });
  } else {
    //  if no token provided we assume the user wants to reach a public route.
    //  GUARDS will stop the request if a user wants to reach a private route without token.
    next();
  }
}

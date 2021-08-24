import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import { ROLES } from '../../common/enums/index';

@Injectable()
export class AuthService {
  //  Create a new Firebase Authentication Account
  async createFirebaseAccount(
    email: string,
    password: string,
    name: string,
    emailVerified: boolean = false,
  ): Promise<admin.auth.UserRecord> {
    try {
      const firebaseAccount = await admin.auth().createUser({
        displayName: name,
        email,
        password,
        emailVerified: emailVerified,
      });

      if (!firebaseAccount)
        throw new HttpException(
          "Couldn't create a Firebase Account!",
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      return firebaseAccount;
    } catch (e) {
      throw new HttpException(
        "Couldn't create a Firebase Account!",
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
  //  Create a new Firebase Authentication Account
  async createAdminAccount(email: string, password: string, name: string) {
    try {
      const firebaseAccount = await this.createFirebaseAccount(
        email,
        password,
        name,
        true,
      );
      if (!firebaseAccount)
        throw new HttpException(
          "Couldn't create a Firebase Accoun1",
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      await admin
        .auth()
        .setCustomUserClaims(firebaseAccount.uid, { role: ROLES.ADMIN });

      return firebaseAccount;
    } catch (e) {
      throw new HttpException(
        "Couldn't create a Firebase Accoun1",
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
  //  Update an existing Firebase Account
  async updateFirebaseAccount(
    uid: string,
    name: string,
  ): Promise<admin.auth.UserRecord> {
    try {
      const firebaseAccount = await admin
        .auth()
        .updateUser(uid, { displayName: name });
      if (!firebaseAccount)
        throw new HttpException(
          "Couldn't update the Firebase Account ",
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      return firebaseAccount;
    } catch (e) {
      throw new HttpException(
        "Couldn't update the Firebase Account ",
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async deleteFiebasAccount(uid: string): Promise<void> {
    try {
      return await admin.auth().deleteUser(uid);
    } catch (error) {
      throw new HttpException(
        "Couldn't delete Firebase Account!",
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}

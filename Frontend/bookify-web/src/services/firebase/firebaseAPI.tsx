import firebase from "firebase/app";
import "firebase/auth";

const signUpWithEmailAndPassword = (
  email: string,
  password: string,
  onSucces: (response: firebase.auth.UserCredential) => void,
  onFailed: (response: any) => void
): void => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response: firebase.auth.UserCredential) => {
      if (response.user) {
        onSucces(response);
      } else {
        onFailed({
          code: "auth/sign-up-unsuccessful",
          message: "An error occurred!",
        });
      }
    })
    .catch((error) => {
      onFailed(error);
    });
};

const signInWithEmailAndPassword = (
  email: string,
  password: string,
  rememberMe: boolean,
  onSucces: (response: firebase.auth.UserCredential) => void,
  onFailed: (response: any) => void
): void => {
  //  Set Session Persistence
  let persistence = firebase.auth.Auth.Persistence.LOCAL;
  if (rememberMe === false)
    persistence = firebase.auth.Auth.Persistence.SESSION;
  firebase
    .auth()
    .setPersistence(persistence)
    .then(function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response: firebase.auth.UserCredential) => {
          onSucces(response);
        })
        .catch((error) => {
          onFailed(error);
        });
    })
    .catch(function (error) {
      onFailed(error);
    });
};

const signInWithFacebook = (
  onSucces: (response: firebase.auth.UserCredential) => void,
  onFailed: (response: any) => void
): void => {
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((res: firebase.auth.UserCredential) => {
      onSucces(res);
    })
    .catch((error) => {
      onFailed(error);
    });
};

const signInWithGoogle = (
  onSucces: (response: firebase.auth.UserCredential) => void,
  onFailed: (response: any) => void
): void => {
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then((res: firebase.auth.UserCredential) => {
      onSucces(res);
    })
    .catch((error) => {
      onFailed(error);
    });
};

const signOut = async () => {
  await firebase.auth().signOut();
};

const sendPasswordResetEmail = (
  email: string,
  onSucces: () => void,
  onFailed: (response: any) => void
): void => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      onSucces();
    })
    .catch((err) => {
      onFailed(err);
    });
};

const confirmPasswordReset = (
  code: string,
  password: string,
  onSucces: () => void,
  onFailed: (response: any) => void
): void => {
  firebase
    .auth()
    .confirmPasswordReset(code, password)
    .then(() => {
      onSucces();
    })
    .catch((err) => {
      onFailed(err);
    });
};

const linkWithEmailAndPassword = (
  email: string,
  password: string,
  onSucces: (response: firebase.auth.UserCredential) => void,
  onFailed: (response: any) => void
): void => {
  const user = firebase.auth().currentUser;

  if (user) {
    var credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    user
      .linkWithCredential(credential)
      .then((res) => {
        res.user?.getIdToken(true);
        onSucces(res);
      })
      .catch((err) => {
        onFailed(err);
      });
  }
};

const linkWithFacebookProvider = (
  onSucces: (response: firebase.auth.UserCredential) => void,
  onFailed: (response: any) => void
): void => {
  const user = firebase.auth().currentUser;
  if (user) {
    user
      .linkWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((res) => {
        onSucces(res);
      })
      .catch((err) => {
        onFailed(err);
      });
  }
};

const linkWithGoogleProvider = (
  onSucces: (response: firebase.auth.UserCredential) => void,
  onFailed: (response: any) => void
): void => {
  const user = firebase.auth().currentUser;
  if (user) {
    user
      .linkWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        onSucces(res);
      })
      .catch((err) => {
        onFailed(err);
      });
  }
};

const unLinkProvider = (
  provider_id: string,
  onSucces: (response: firebase.User) => void,
  onFailed: (response: any) => void
): void => {
  if (!provider_id) return;
  const user = firebase.auth().currentUser;
  if (user && user.providerData.length > 1) {
    user
      .unlink(provider_id)
      .then((res) => {
        res.getIdToken(true);
        onSucces(res);
      })
      .catch((err) => {
        onFailed(err);
      });
  } else {
    onFailed({ message: "You can't delete your only Provider!" });
  }
};

export const firebaseAPI = {
  signInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
  signUpWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  linkWithEmailAndPassword,
  linkWithFacebookProvider,
  linkWithGoogleProvider,
  unLinkProvider,
};

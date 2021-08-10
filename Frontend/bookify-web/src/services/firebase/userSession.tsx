import React, {
  useState,
  useEffect,
  createContext,
  useCallback,
  useMemo,
} from "react";
import firebase from "firebase/app";
import "firebase/auth";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  });
}

type SessionType = {
  user: firebase.User | null;
  initializing: boolean;
};

const SessionContext = createContext<SessionType>({
  user: null,
  initializing: false,
});

const SessionProvider = (props: any) => {
  const [state, setState] = useState(() => {
    const user = firebase.auth().currentUser;

    return { initializing: !user, user };
  });

  const value = useMemo(
    () => ({
      initializing: state.initializing,
      user: state.user,
    }),
    [state]
  );

  const onChange = useCallback((user: firebase.User | null) => {
    if (!user) {
      setState({ initializing: false, user: null });
    } else {
      setState({ initializing: false, user });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(onChange);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={value}>
      {props.children}
    </SessionContext.Provider>
  );
};
export { SessionContext, SessionProvider };

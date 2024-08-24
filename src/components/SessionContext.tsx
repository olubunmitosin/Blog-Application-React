import { createContext, useContext, useState } from "react";
import { initialSession, Session } from "../models/Session";
import { WithChildren } from "../models/Types";

export const SessionContext = createContext<[Session, (session: Session) => void]>([initialSession, () => {}]);
export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider: React.FC = ({children}: WithChildren) => {
  const [sessionState, setSessionState] = useState(initialSession);
  const defaultSessionContext: [Session, typeof setSessionState]  = [sessionState, setSessionState];

  return (
    <SessionContext.Provider value={defaultSessionContext}>
      {children}
    </SessionContext.Provider>
  );
}
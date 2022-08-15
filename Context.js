import { createContext, useEffect, useState, useRef } from "react";
export const AppStateContext = createContext();

const AppStateProvider = (props) => {
  const [user, setUser] = useState({});
  const [uid, setUid] = useState({});

  const [type, setType] = useState("student");
  const [account, setAccount] = useState({});
  const [university, setUniversity] = useState({});

  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log(account)
    setType(account.type)
    console.log("useEffect called");

  }, [account])

  return (
    <AppStateContext.Provider
      value={{
        user,
        setUser,
        uid,
        type,
        account,
        university,
        setUid,
        setType,
        setAccount,
        setUniversity,
      }}
    >
      {props.children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;

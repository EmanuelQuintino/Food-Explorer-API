import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";
import { API } from "../services/api";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

export type HandleLoginTypes = {
  email: string;
  password: string;
}

type UserAuth = {
  id?: string;
  isAdmin?: string;
}

type AuthContextTypes = {
  handleLogin: (params: HandleLoginTypes) => void;
  userAuth: UserAuth;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes);

export function AuthProvider({ children }: PropsWithChildren) {
  const [userAuth, setUserAuth] = useState({});

  function handleLogin({ email, password }: HandleLoginTypes) {
    if (!email || !password) return alert("Por favor preencha todos os campos");
    API.post("/login", { email, password })
      .then((res) => {
        if (res.data.token) {
          API.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
          localStorage.setItem("@FoodExplorer:token", `Bearer ${res.data.token}`);

          const userDecodedToken = jwt_decode(res.data.token) as string;
          setUserAuth(userDecodedToken);
        }
      })
      .catch((error) => toast.error(error.response.data.error || "Erro na autenticação do usuário"));
  };

  function handleLogout() {
    localStorage.removeItem("@FoodExplorer:token");
    setUserAuth({});
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("@FoodExplorer:token");

      if (token) {
        const userDecodedToken = jwt_decode(token) as { exp: number };
        const expirationTime = userDecodedToken.exp * 1000;

        if (Date.now() > expirationTime) return handleLogout();

        API.defaults.headers.common['Authorization'] = token;
        setUserAuth(userDecodedToken);
      }
    } catch (error) {
      console.error(error);
      return handleLogout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ handleLogin, userAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
};

export function useAuth() {
  return useContext(AuthContext);
};
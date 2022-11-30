import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";
import { useSelector } from "react-redux";

const initialState = {
    isInitialized: false,
    isAuthenticated: false,
    user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const reducer = (state, action) => {
    switch (action.type) {
        case INITIALIZE: 
            const { isAuthenticated, user } = action.payload;
            console.log(action.payload)
            return {
                ...state,
                isInitialized: true,
                isAuthenticated,
                user,
            };      
        case LOGIN_SUCCESS:
            console.log("action", action.payload)
            return {
                ...state,
                isAuthenticated:true,
                user: action.payload.users,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated:true,
                user: action.payload.users,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        case UPDATE_PROFILE:
            const {
                employeeId,
                name,
                email,
                avatarUrl,
                department,
                role,
                phone,
                tasks,
                commentCount,
                postCount } = action.payload;
            return {
                ...state,
                user: {
                ...state.user,
                employeeId,
                name,
                email,
                avatarUrl,
                department,
                role,
                phone,
                tasks,
                commentCount,
                postCount
                },
            };
        default:
            return state;
    } 
}

const AuthContext = createContext({ ...initialState });

const setSession = (accessToken) => {
    if(accessToken) {
        window.localStorage.setItem("accessToken", accessToken);
        apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        window.localStorage.removeItem("accessToken");
        delete apiService.defaults.headers.common.Authorization;
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const updatedProfile = useSelector((state) => state.user.updatedProfile);

    useEffect(() =>{
        const initialize = async () => {
            try {
                const accessToken = window.localStorage.getItem("accessToken");

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken);

                    const res = await apiService.get("/users/me");
                    console.log("resp",res)
                    const user = res;

                    dispatch({
                        type: INITIALIZE, 
                        payload: { isAuthenticated: true, user },
                    })
                } else {
                setSession(null);

                dispatch({
                    type: INITIALIZE,
                    payload: { isAuthenticated: false, user: null },
                })

                }
            } catch (error) {
                setSession(null);

                dispatch({
                    type: INITIALIZE,
                    payload: { isAuthenticated: false, user: null },
                })
            }
        }
        initialize();
    }, [])

    useEffect(() => {
        if (updatedProfile)
          dispatch({ type: UPDATE_PROFILE, payload: updatedProfile });
      }, [updatedProfile]);

    const login = async ({ email, password }, callback) => {
        const res = await apiService.post("/auth/login", { email, password });
        console.log("res",res);
        const { users, accessToken } = res;

        setSession(accessToken);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { users },
        });
        callback();
    };

    const register = async ({employeeId, department, role, name, email, password  }, callback) => {
        const res = await apiService.post("/users/me", { employeeId, department, role, name, email, password });
        const { users, accessToken } = res;
        setSession(accessToken);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: { users },
        });
        callback();
    };

    const logout = async (callback) => {
        setSession(null);
        dispatch({type: LOGOUT});
        callback();
    }

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
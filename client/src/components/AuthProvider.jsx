/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from '../config/axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthLoader = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/auth/me');
                    setUser(response.data);
                } catch (error) {
                    console.error('Auth check failed:', error);
                    localStorage.removeItem('token');
                }
            }
            setIsLoaded(true);
        };
        checkAuth();
    }, []);

    return children(user, setUser);
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            navigate('/dashboard', { replace: true });
            return { success: true, user };
        } catch (error) {
            localStorage.removeItem('token');
            console.log(error)
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('/auth/register', userData);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            navigate('/dashboard', { replace: true });
            return { success: true, user };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate('/login', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ login, register, logout }}>
            <AuthLoader>
                {(user, setUser) => (
                    <AuthContext.Provider value={{
                        user, setUser, login: async (...args) => {
                            const result = await login(...args);
                            if (result.success) setUser(result.user);
                            return result;
                        }, register: async (...args) => {
                            const result = await register(...args);
                            if (result.success) setUser(result.user);
                            return result;
                        }, logout
                    }}>
                        {children}
                    </AuthContext.Provider>
                )}
            </AuthLoader>
        </AuthContext.Provider>
    );
};

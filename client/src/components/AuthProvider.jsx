

import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import instance from '../config/axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthLoader = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const verifyToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            return tokenData.exp * 1000 > Date.now();
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            if (!verifyToken()) {
                setIsLoaded(true);
                return;
            }

            try {
                const response = await instance.get('/auth/me');
                setUser(response.data);
            } catch (error) {
                
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                }
            } finally {
                setIsLoaded(true);
            }
        };

        checkAuth();

        
        const tokenCheckInterval = setInterval(() => {
            if (!verifyToken()) {
                localStorage.clear();
                navigate('/login', { replace: true });
            }
        }, 60000);

        return () => clearInterval(tokenCheckInterval);
    }, [navigate]);

    
    if (!isLoaded) return null;

    return children(user, setUser);
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await instance.post('/auth/login', { email, password });
            const { token, user } = response.data;
            
            
            if (!token || typeof token !== 'string') {
                throw new Error('Invalid token received');
            }

            localStorage.setItem('token', token);
            navigate('/dashboard', { replace: true });
            return { success: true, user };
        } catch (error) {
            localStorage.removeItem('token');
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await instance.post('/auth/register', userData);
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

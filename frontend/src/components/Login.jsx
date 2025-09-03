import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { authStyles as styles } from '../assets/dummystyle';
import Input from './Inputs';

const Login = ({
    setCurrentPage
}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid Email");
            return;
        }
        if (!password) {
            setError("Please enter a valid Password");
            return;
        }
        setError("");

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            const { token } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data);
                navigate("/dashboard");
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    };

  return (
    <div className={styles.container}>
        <div className={styles.headerWrapper}>
            <h3 className={styles.title}>Welcome Back</h3>
            <p className={styles.subtitle}>Sign in to continue building amazing resumes</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className={styles.form}>
            <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            type="email"
            placeHolder="example@domain.com"
            />

            <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            type="password"
            placeHolder="Min 8 characters"
            />

            {error && <p className={styles.errorText}>{error}</p>}

            <button type='submit' className={styles.submitButton}>
                Sign In
            </button>

            <p className={styles.switchText}>
                Don't have an account{" "}
                <button type='button'
                onClick={() => setCurrentPage("signup")}
                className={styles.switchButton}>
                    Sign Up
                </button>
            </p>
        </form>
    </div>
  )
}

export default Login;
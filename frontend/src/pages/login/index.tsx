import axios from "axios";
import { useState } from "react";
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from "next/navigation";

interface LoginPayload {
    username: string;
    password: string;
}

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function login(payload: LoginPayload) {
        const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/login/';
        try {
            const { data } = await axios.post(url, payload);  // ✅ use `data`, not `response`
            console.log('----login---', data);

            if (data.hasOwnProperty('access')) {
                setCookie('access-token', String(data.access), {
                    maxAge: 60 * 60 * 24 * 100
                });
            }
            if (data.hasOwnProperty('refresh')) {
                setCookie('refresh-token', String(data.refresh), {
                    maxAge: 60 * 60 * 24 * 100
                });
            }
            router.push('/test');
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = () => {
        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }
        setLoading(true);
        login({ username, password });
        console.log('___login_call___');
    };

    console.log('__data___', { username, password })

    return (
        <div style={styles.root}>
            <div style={styles.card}>
                {/* Logo */}
                <div style={styles.logo}>
                    <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
                        <path d="M10 2L3 6V10C3 14.4 6.4 18.5 10 19C13.6 18.5 17 14.4 17 10V6L10 2Z" fill="white" fillOpacity="0.9" />
                        <path d="M7 10L9 12L13 8" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <h1 style={styles.title}>Welcome back</h1>
                <p style={styles.subtitle}>Sign in to continue to your account</p>

                {/* Username */}
                <div style={styles.field}>
                    <label style={styles.label}>Username</label>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div style={styles.field}>
                    <label style={styles.label}>Password</label>
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                </div>

                {/* Login Button */}
                <button
                    style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Signing in…" : "Sign in"}
                </button>

                {/* Divider */}
                <div style={styles.divider}>
                    <div style={styles.line} />
                    <span style={styles.dividerText}>or</span>
                    <div style={styles.line} />
                </div>

                {/* Register link */}
                <p style={styles.registerRow}>
                    Don't have an account?{" "}
                    <a href="/register" style={styles.link}>Create one</a>
                </p>
            </div>
        </div>
    );
}

const styles = {
    root: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f3",
        fontFamily: "'DM Sans', sans-serif",
        padding: "2rem",
    },
    card: {
        background: "#fff",
        border: "0.5px solid #e0e0da",
        borderRadius: 12,
        padding: "2.5rem 2.25rem 2rem",
        width: "100%",
        maxWidth: 380,
    },
    logo: {
        width: 36,
        height: 36,
        background: "#1D9E75",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.25rem",
    },
    title: {
        fontFamily: "Georgia, serif",
        fontSize: 22,
        fontWeight: 500,
        color: "#111",
        margin: "0 0 4px",
    },
    subtitle: {
        fontSize: 13,
        color: "#888",
        margin: "0 0 1.75rem",
        fontWeight: 300,
    },
    field: { marginBottom: "1.1rem" },
    label: {
        display: "block",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: "#666",
        marginBottom: 6,
    },
    input: {
        width: "100%",
        height: 40,
        boxSizing: "border-box",
        padding: "0 12px",
        fontSize: 14,
        background: "#fafaf8",
        border: "0.5px solid #d0d0c8",
        borderRadius: 8,
        color: "#111",
        outline: "none",
        fontFamily: "inherit",
    },
    btn: {
        width: "100%",
        height: 42,
        marginTop: "1.5rem",
        background: "#1D9E75",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "inherit",
    },
    divider: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "1.5rem 0 1rem",
    },
    line: { flex: 1, height: 0.5, background: "#e0e0da" },
    dividerText: { fontSize: 12, color: "#aaa" },
    registerRow: { textAlign: "center", fontSize: 13, color: "#666", margin: 0 },
    link: { color: "#1D9E75", fontWeight: 500, textDecoration: "none" },
};
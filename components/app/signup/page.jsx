"use client";
import { useState } from "react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage("Đăng ký thành công! Bạn có thể đăng nhập.");
            setEmail("");
            setPassword("");
        } else {
            setMessage(data.error || "Đăng ký thất bại");
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h1>Signup</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <br />
            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br />
            <button type="submit">Đăng ký</button>
            <p>{message}</p>
        </form>
    );
}

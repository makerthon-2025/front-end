export default function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;
        // Kiểm tra user trong mock DB
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            // Ở đây bạn có thể tạo JWT token để trả về
            return res.status(200).json({ message: "Đăng nhập thành công" });
        } else {
            return res.status(401).json({ error: "Email hoặc mật khẩu không đúng" });
        }
    }
    res.status(405).json({ error: "Phương thức không được hỗ trợ" });
}

// Đây là mock, bạn thay bằng lưu vào DB thật
let users = [];

export default function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email và mật khẩu là bắt buộc" });
        }
        const exists = users.find((u) => u.email === email);
        if (exists) {
            return res.status(400).json({ error: "Email đã được đăng ký" });
        }
        users.push({ email, password }); // Chú ý: KHÔNG lưu mật khẩu plaintext trong thực tế
        return res.status(201).json({ message: "Đăng ký thành công" });
    }
    res.status(405).json({ error: "Phương thức không được hỗ trợ" });
}

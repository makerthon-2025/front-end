import { bot } from "@/style/app/SecondGrid"

export default function foo({ children }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 25,
            position: 'relative'
        }}>
            <img src="https://cdn-icons-png.flaticon.com/128/9732/9732800.png" width={45} height={45} alt="" />

            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                {children}
            </div>
        </div>
    )
}
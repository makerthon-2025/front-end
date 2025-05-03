import { human } from "@/style/app/SecondGrid"

export default function foo({ children }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 25
        }}>
        <div style={human}>
            <span>{children}</span>
        </div>
        <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" width={45} height={45} alt="" />
    </div>
    )
}
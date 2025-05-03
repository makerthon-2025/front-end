import { layout, container, bot, human } from "@/style/app/SecondGrid"
import Conversation from "@/components/app/Conversation"

export default function foo({table}) {
    return (
        <div style={layout}>
            <div className="overflow-auto" style={container}>
                <Conversation table = {table}/>
            </div>
        </div>
    )
}
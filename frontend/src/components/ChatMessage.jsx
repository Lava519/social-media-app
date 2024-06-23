export default function ChatMessage({ sent, content }) {
    return (
        <div className={`w-full flex ${sent ? "justify-end" : "justify-start"}`} >
            <p className={`p-3 text-sm my-2 rounded-2xl ${sent ? "bg-blue-900" : "bg-dark-g "}`} >{content}</p>
        </div>
    )
}
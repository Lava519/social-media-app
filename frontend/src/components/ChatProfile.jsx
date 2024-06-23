export default function ChatProfile({ select ,active, name, online }) {
    return (
        <div onClick={select} className={`flex items-center justify-start gap-2 w-full bg-dark-g p-2 my-2 rounded-2xl cursor-pointer ${ active && "bg-blue-700"}`}>
            <div className="relative flex justify-center align-center rounded-full w-12 h-12 bg-light-b">
                <p className="m-auto">{name[0]}</p>
                <div className={`absolute bottom-0 right-0 rounded-full w-4 h-4 bg-light-g ${online && "bg-lime-500"}`}></div>
            </div>
            <p>{name}</p>
        </div>
    )
}
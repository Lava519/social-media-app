export default function Loading({display}) {
    if (display)
        return (
        <div className="w-20 h-10 flex justify-center items-center">
            <img
              className="animate-[rotate_0.5s_infinite] h-full"
              src="/loading.svg"
            />
        </div>
    )
    else
        return(<></>)
}
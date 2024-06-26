import Nav from "../components/Nav";
import UploadPost from "../components/UploadPost";

export default function Home() {
    return (
        <div className="relative h-screen">
            <Nav></Nav>
            <UploadPost></UploadPost>
        </div>
    )
}
import Nav from "../components/Nav";
import UploadPost from "../components/UploadPost";
import Feed from "../components/Feed";

export default function Home() {
    return (
        <div className="relative h-screen">
            <Nav></Nav>
            <Feed></Feed>
            <UploadPost></UploadPost>
        </div>
    )
}
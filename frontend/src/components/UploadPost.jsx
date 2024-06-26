import axios from 'axios';
import { useState } from "react";

export default function UploadPost() {
    const [visible, setVisible] = useState(false);
    const [uploadImage, setUploadImage] = useState(null);
    const [uploadImageName, setUploadImageName] = useState(null);
    const [uploadDescription, setUploadDescription] = useState(null);
    const upload = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:3000/post/upload', {image: uploadImage, description: uploadDescription}, {withCredentials: true});
        console.log(res);
    }

    const reader = (file) =>
        new Promise((resolve, reject) => {
          const fr = new FileReader();
          fr.onload = () => resolve(fr);
          fr.onerror = (err) => reject(err);
          fr.readAsDataURL(file);
        });

    const setFile = async (e) => {
        const data = await reader(e.target.files[0]);
        setUploadImage(data.result);
      };
    const toggle = () => {
        setUploadImage(null);
        setUploadDescription(null);
        setUploadImageName(null);
        if (visible)
            setVisible(false);
        else
            setVisible(true);
    }
    return (
        <>
            <div className={`fixed w-screen h-screen bg-light-b opacity-90 z-10 ${ !visible && "hidden"}`} ></div>
            <form onSubmit={upload} className={`fixed flex flex-col justify-around items-center gap-4 top-0 left-0 right-0 bottom-0 m-auto w-72 rounded-2xl h-fit bg-dark-g z-20 pt-12 p-4 ${ !visible && "hidden"}`} >
                <button onClick={toggle} type="button" className="absolute top-2 right-2 p-0 non-button bg-transparent m-2 w-5" ><img className="w-full" alt="close" src="close.svg" /></button>
                <p>Upload Image</p>
                <button className="relative m-4 flex bg-light-b rounded-xl border-2 non-button text-g border-dashed justify-center items-center text-2xl w-24 h-24">
                    +
                    <input onChange={setFile} className="cursor-pointer absolute opacity-0 top-0 left-0 w-full h-full" type="file" />
                </button>
                <p>Description</p>
                <textarea onChange={(e)=>{setUploadDescription(e.target.value)}} maxLength="80" className="w-full h-24 resize-none rounded-xl bg-light-b p-2" ></textarea>
                <button type="submit" className="mt-2" >Upload</button>
            </form> 
            <button role="button" onClick={toggle} className="fixed right-6 bottom-6 bg-dark-g w-20 h-20 rounded-full flex justify-center items-center text-2xl text-g">
                +
            </button>
        </>
    )

}
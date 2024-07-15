import axios from 'axios';
import { useState, useRef, useEffect } from "react";

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
        console.log(e.target.files[0]);
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
            <div onClick={toggle} className={`fixed w-screen h-screen bg-light-b opacity-90 z-10 ${ !visible ? "hidden" : ""}`} ></div>
            <ImageCanvas image={uploadImage}></ImageCanvas>
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
            <button role="button" onClick={toggle} className="fixed non-button right-6 bottom-6 bg-dark-g w-20 h-20 rounded-full flex justify-center items-center text-2xl text-g">
                +
            </button>
        </>
    )
}

function ImageCanvas({image}) {
    const canvasImage = useRef(null);
    const CANVAS = {
        w: 400,
        h: 600,
        zoom: 0.005,
    }
    const srcImage = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [scale, setScale] = useState(1);
    const [imageSize, setImageSize] = useState(null);
    const [imageLoc, setImageLoc] = useState({x: 0, y: 0});
    const [prevMouseLoc, setPrevMouseLoc] = useState(null);

    function moveY(pageY) {
        let temp =  imageLoc.y - (prevMouseLoc.y - pageY);
        if (temp > 0)
            temp = 0;
        else if (moveY < (Math.floor(imageSize.h*scale)-CANVAS.h)*-1 )
            temp = (Math.floor(imageSize.h*scale)-CANVAS.h)*-1;
        return temp;
    }

    function moveX(pageX) {
        let temp =  imageLoc.x - (prevMouseLoc.x - pageX);
        if (temp > 0)
            temp = 0;
        else if (temp < (Math.floor(imageSize.w*scale)-CANVAS.w)*-1 )
            temp = (Math.floor(imageSize.w*scale)-CANVAS.w)*-1
        return temp;
    }

    useEffect(()=>{
        if (image) {
            const canvasContext = canvasImage.current.getContext("2d");
            canvasContext.drawImage(srcImage.current, imageLoc.x, imageLoc.y);
            setImageSize({w: srcImage.current.width, h: srcImage.current.height});
        }
    },[image]);
    const handleScroll = (e) => {
        if (!dragging) {
            const canvasContext = canvasImage.current.getContext("2d");
            let tScale;
            if(e.deltaY > 0){
                tScale = scale+CANVAS.zoom;
            } else {
                tScale = scale-CANVAS.zoom;
            }
            if (tScale >= 0 && imageSize.w*tScale > CANVAS.w && imageSize.h*tScale > CANVAS.h ) {
                canvasContext.clearRect(0, 0, CANVAS.w, CANVAS.h);
                setScale(tScale);
                canvasContext.drawImage(srcImage.current, imageLoc.x, imageLoc.y, Math.floor(imageSize.w*tScale), Math.floor(imageSize.h*tScale));
            }
        }
    }
    const handleMouseDown = (e) => {
        setDragging(true);
    }
    const handleMouseUp = (e) => {
        setDragging(false);
    }
    const handleMouseMove = (e) => {
        console.log(dragging);
        setPrevMouseLoc({x: e.pageX, y: e.pageY});
        if(dragging) {
            let mX = moveX(e.pageX);
            let mY = moveY(e.pageY);
            const canvasContext = canvasImage.current.getContext("2d");
            console.log(imageLoc);
            canvasContext.drawImage(srcImage.current, mX, mY, Math.floor(imageSize.w*scale), Math.floor(imageSize.h*scale));
            setImageLoc({x:mX, y:mY});
            }
    }
    if (image)
        return (
            <div>
                <canvas
                    onWheel={handleScroll}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseDown={handleMouseDown}
                    className='top-0 right-0 left-0 bottom-0 absolute m-auto z-30 w-[400px] h-[500px]'
                    width={CANVAS.w}
                    height={CANVAS.h} ref={canvasImage}>
                </canvas>
                <img className='hidden' ref={srcImage} src={image}></img>
            </div>
    )
    return null
}
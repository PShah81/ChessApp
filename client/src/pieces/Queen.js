import {useState, useRef} from 'react';
import imageBlack from '../images/BlackQueen.png';
import imageWhite from '../images/WhiteQueen.png';
import "../style/Pieces.css";
function Queen(props){
    const [clicked, setClicked] = useState(false)
    const imgRef = useRef();

    let image = imageBlack
    if(props.color === 'white')
    {
        image = imageWhite
    }
    function handleMouseDown(e)
    {
        if(props.isGameOver)
        {
            return;
        }
        e.target.style.cursor = "grabbing";
        e.preventDefault();
        imgRef.current.style.zIndex = "2";
        if(clicked === false)
        {
            setClicked(true);
            imgRef.current.addEventListener('mousemove', handleMouseMove);
            imgRef.current.addEventListener('mouseup', handleMouseRelease);
        }
    }
    function handleMouseRelease(e)
    {
        e.preventDefault();
        e.target.style.cursor = "grab";
        imgRef.current.style.zIndex = "0";
        imgRef.current.removeEventListener('mousemove', handleMouseMove);
        imgRef.current.removeEventListener('mouseup', handleMouseRelease);
        setClicked(false);
        if(e.clientX < 0.25*document.documentElement.clientWidth || e.clientX > 0.75*document.documentElement.clientWidth  || 
            e.clientY < 0 || e.clientY > document.documentElement.clientWidth * 0.5)
        {
            return;
        }
        let originalLocation = props.moveMade({x: e.clientX -20, y: e.clientY-20}, 'Queen', props.loc, props.color);
        if(originalLocation)
        {
            imgRef.current.style.removeProperty('left');
            imgRef.current.style.removeProperty('top');
        }

    }
    function handleMouseMove(e)
    {

        e.preventDefault()
        e.target.style.cursor = "grabbing"
        if(e.clientX < 0.25*document.documentElement.clientWidth || e.clientX > 0.75*document.documentElement.clientWidth  || 
            e.clientY < 0 || e.clientY > document.documentElement.clientWidth * 0.5)
        {
            return;
        }
        imgRef.current.style.left = e.clientX - 20 + 'px';
        imgRef.current.style.top = e.clientY - 20 + 'px';
        
    }
    function handleHover(e)
    {
        e.preventDefault()
        if(clicked === false)
        {
            e.target.style.cursor = "grab"
        }
    }
    return(
            <img className = "Img" draggable="true" ref={imgRef} onMouseEnter={handleHover} onMouseDown={handleMouseDown}src={image} alt='queen'/>
    )
};
export default Queen
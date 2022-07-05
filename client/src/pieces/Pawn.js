import {useState, useRef, useEffect} from 'react';
import imageBlack from '../images/BlackPawn.png';
import imageWhite from '../images/WhitePawn.png';
function Pawn(props){
    const [clicked, setClicked] = useState(false)
    const imgRef = useRef();

    let image = imageBlack
    if(props.color === 'white')
    {
        image = imageWhite
    }
    function handleMouseDown(e)
    {
        e.target.style.cursor = "grabbing";
        e.preventDefault();
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
        e.target.style.cursor = "grab"
        imgRef.current.removeEventListener('mousemove', handleMouseMove);
        imgRef.current.removeEventListener('mouseup', handleMouseRelease);
        setClicked(false);
        if(e.clientX < 0.25*document.documentElement.clientWidth || e.clientX > 0.75*document.documentElement.clientWidth  || 
            e.clientY < 0 || e.clientY > document.documentElement.clientWidth * 0.5)
        {
            return;
        }
        let originalLocation = props.moveMade({x: e.clientX -20, y: e.clientY-20}, 'Pawn', props.loc, props.color);
        if(originalLocation !== undefined)
        {
            imgRef.current.style.left = originalLocation.x + 'px';
            imgRef.current.style.top = originalLocation.y  + 'px';
        }

    }
    function handleMouseMove(e)
    {

        e.preventDefault()
        e.target.style.cursor = "grabbing"
        if(e.clientX < 0.25*document.documentElement.clientWidth || e.clientX > 0.75*document.documentElement.clientWidth  || 
            e.clientY < 0 || e.clientY > document.documentElement.clientWidth * 0.5)
        {
            console.log('stopped')
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
            <img draggable="true" ref={imgRef} onMouseEnter={handleHover} onMouseDown={handleMouseDown} style={{height: '6vw', width: '6vw', position: 'absolute'}}src={image} alt='pawn'/>
    )
};
export default Pawn
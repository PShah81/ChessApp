import {useState} from 'react';
import imageBlack from '../images/BlackKnight.png';
import imageWhite from '../images/WhiteKnight.png';
function Knight(props){
    const [location, setLocation] = useState(props.loc)
    let image = imageBlack
    if(props.image === 'white')
    {
        image = imageWhite
    }
    return(
        <div>
            <img src={image} alt='black pawn'/>
        </div>
       
    )
}
export default Pawns
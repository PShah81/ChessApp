import Pawn from './pieces/Pawn.js';
import React, {useEffect, useState, useRef} from 'react';
function Game(props){
    const alphabetArray = ['a','b','c','d','e','f','g','h'];
    let boardArrRef = useRef([]);
    let boardArr;
    const [piecesInPlay, setPiecesInPlay] = useState(initializePieces)
    const [turn, setTurn] = useState('white')
    const [moved, setMoved] = useState(false)
    
    useEffect(()=>{
        console.log("rendered")
    })
    function initializePieces()
    {
        let piecesArr = [];
        for(let i=0; i<16; i++)
        {
            let color;
            let loc;
            if(i<8)
            {
                color = 'white';
                loc = alphabetArray[i]+'2';
            }
            else
            {
                color = 'black';
                loc = alphabetArray[i-8]+'7';
            }
            piecesArr.push({type: 'Pawn', key: i, loc: loc, color: color})
        }
        return piecesArr;
    }
    
    function moveMade(coords,pieceType, pieceLocation)
    {
        let nearestDivDistance;
        let nearestDivKey;
        for(let i=0; i<boardArrRef.current.length; i++)
        {
            let distance = Math.sqrt(Math.pow((coords.x - boardArrRef.current[i].getBoundingClientRect().x),2) +
            Math.pow((coords.y - boardArrRef.current[i].getBoundingClientRect().y),2))
            if(nearestDivKey === undefined || distance < nearestDivDistance)
            {
                let col = i % 8;
                let row = Math.floor(i/8) ;
                nearestDivDistance = distance
                nearestDivKey = boardArr[row].props.children[col].key
            }
        }
        setMoved(true)
        
        console.log(nearestDivKey)
        setPiecesInPlay(piecesInPlay.map((piece)=>{
            if(pieceType === piece.type && pieceLocation === piece.loc)
            {
                return {...piece, loc: nearestDivKey}
            }
            return {...piece}
        }))
    }
    function createBoardArr()
    {
        let boardArr = [];
        for (let i=1; i<9; i++)
        {
            let rowArr = [];
            for(let j=0; j<8; j++)
            {
               let colorName = 'white';
               let potentialPiece;
               if((i+j) % 2 === 0)
               {
                     colorName = 'green';
               }
               for(let k=0; k<piecesInPlay.length; k++)
               {
                let piece = piecesInPlay[k];
                let row = parseInt(piece.loc[1]); 
                let col = alphabetArray.indexOf(piece.loc[0]);
                if(row === i && col === j)
                {
                    if(piece.type === 'Pawn')
                    {
                        potentialPiece = <Pawn key={piece.key} moveMade={moveMade} color={piece.color} loc= {piece.loc}/>;
                    }
                }
               }
               rowArr.push(<div key= {alphabetArray[j] + String(i)} ref= {(element) => {boardArrRef.current[j+(i-1)*8] = element}} 
               style={{backgroundColor: colorName, height: '100%' , width: '50px', display:'flex', 
               justifyContent:'center', alignItems:'center', flexGrow: 1}}>{potentialPiece}</div>)
            }
            boardArr.push(<div key= {i} style={{display: "flex", flexDirection: "row", height: '12.5%'}}>{rowArr}</div>);
        }
        return boardArr;
    }
    boardArr = createBoardArr();
    return (
        <div style={{borderStyle: 'solid', height: '100%'}}>
            {boardArr}
        </div>
    )
}

export default Game
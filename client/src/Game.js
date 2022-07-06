import Pawn from './pieces/Pawn.js';
import Bishop from './pieces/Bishop.js';
import React, {useEffect, useState, useRef} from 'react';
import './style/Game.css';
import {validateMove} from './movement functions/validateMove.js';
import {processMove} from './movement functions/processMove.js';
function Game(props){
    const alphabetArray = ['h','g','f','e','d','c','b', 'a'];
    let boardArrRef = useRef([]);
    let boardArr;
    const [moves, setMoves] = useState([])
    const [piecesInPlay, setPiecesInPlay] = useState(initializePieces)
    const [turn, setTurn] = useState('white');
    
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
            piecesArr.push({type: 'Pawn', key: 'Pawn' + i, loc: loc, color: color})
        }
        for(let i=0; i<4; i++)
        {
            let color;
            let loc;
            if(i<2)
            {
                color = 'white';
                if(i%2 === 1)
                {
                    loc = 'c1';
                }
                else
                {
                    loc = 'f1';
                }
                
            }
            else
            {
                color = 'black';
                if(i%2 === 1)
                {
                    loc = 'c8';
                }
                else
                {
                    loc = 'f8';
                }
                
            }
            piecesArr.push({type: 'Bishop', key: 'Bishop' + i, loc: loc, color: color})
        }
        return piecesArr;
    }
    function moveMade(coords,pieceType, pieceLocation, pieceColor)
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
        let valid = validateMove(pieceType, pieceLocation, nearestDivKey, pieceColor, 
            alphabetArray, turn, piecesInPlay, moves, processMove, setTurn, setMoves, setPiecesInPlay);
        if(!valid)
        {
            return true;
        }
        else
        {
            return false;
        }
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
                    else if(piece.type === 'Bishop')
                    {
                        potentialPiece = <Bishop key={piece.key} moveMade={moveMade} color={piece.color} loc= {piece.loc}/>;
                    }
                }
               }
               rowArr.push(<div className = "Square" key= {alphabetArray[j] + String(i)} ref= {(element) => {boardArrRef.current[j+(i-1)*8] = element}} 
               style={{backgroundColor: colorName}}>{potentialPiece}</div>)
            }
            boardArr.push(<div className = "Row" key= {i} >{rowArr}</div>);
        }
        return boardArr;
    }
    boardArr = createBoardArr();
    return (
        <div className='Board'>
            {boardArr}
        </div>
    )
}

export default Game
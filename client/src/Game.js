import Pawn from './pieces/Pawn.js';
import React, {useEffect, useState, useRef} from 'react';
import './style/Game.css';
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
            piecesArr.push({type: 'Pawn', key: i, loc: loc, color: color})
        }
        return piecesArr;
    }
    function findLocationOfSquare(location)
    {
       return boardArrRef.current[alphabetArray.indexOf(location[0]) + 8*(parseInt(location[1])-1)].getBoundingClientRect();
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
        let valid = validateMove(pieceType, pieceLocation, nearestDivKey, pieceColor);
        if(!valid)
        {
            return findLocationOfSquare(pieceLocation)
        }
        else
        {
            return;
        }
    }

    function validateMove(pieceType, pieceLocationStart, pieceLocationEnd, pieceColor)
    {
        let typeOfMove;
        let pieceCaptured;
        let moveValid = false;
        if(pieceColor !== turn)
        {
            return false;
        }
        if(pieceLocationStart === pieceLocationEnd)
        {
            return false;
        }
        switch (pieceType) {
            case 'Pawn':
                //still have to check if move leaves king checked
                let difference;
                let take = false;
                let straightMove = false;
                if(pieceColor === "black")
                {
                    difference = parseInt(pieceLocationStart[1])- parseInt(pieceLocationEnd[1])
                } 
                else{
                    difference = parseInt(pieceLocationEnd[1])- parseInt(pieceLocationStart[1])
                }
                if(Math.abs(alphabetArray.indexOf(pieceLocationStart[0]) - alphabetArray.indexOf(pieceLocationEnd[0])) === 1 && difference === 1)
                {
                    take = true;
                }
                //test if the move is going straight and if moving 2 squares is valid
                else if(pieceLocationStart[0] === pieceLocationEnd[0])
                {
                    if(pieceColor === "black" && difference === 2 && pieceLocationStart[1] !== "7")
                    {
                        break;
                    }
                    else if(pieceColor === "white" && difference === 2 && pieceLocationStart[1] !== "2")
                    { 
                        break;
                    }
                    else if(difference>2 || difference < 0)
                    {
                        break;
                    }
                    straightMove = true
                }
                
                let straightMoveValid = true;
                let wasPieceCaptured = false;
                for(let i=0; i<piecesInPlay.length; i++)
                {
                    //piece to be captured
                    //check for en pessant
                    if(take && piecesInPlay[i].loc === pieceLocationEnd)
                    {
                        if(piecesInPlay[i].color === pieceColor)
                        {
                            console.log("same color");
                            break;
                        }
                        else
                        {
                            console.log("valid capture")
                            wasPieceCaptured = true;
                            pieceCaptured = piecesInPlay[i];
                            moveValid = true;
                            typeOfMove = "take";
                            break;
                        }
                    }
                    //piece in the way of movement
                    else if(straightMove)
                    {
                        //find the square in the middle of start and end in case of a 2 move 
                        if(pieceColor=== "black")
                        {
                            if(difference === 1 && piecesInPlay[i].loc === pieceLocationEnd)
                            {
                                console.log("piece in the way");
                                straightMoveValid = false;
                                break;
                            }
                            else if(difference === 2 && (piecesInPlay[i].loc === pieceLocationEnd ||  piecesInPlay[i].loc === pieceLocationEnd[0] + (parseInt(pieceLocationEnd[1]) + 1)))
                            {
                                console.log("piece in the way");
                                straightMoveValid = false;
                                break;
                            }
                        }
                        else 
                        {
                            if(difference === 1 && piecesInPlay[i].loc === pieceLocationEnd)
                            {
                                console.log("piece in the way");
                                straightMoveValid = false;
                                break;
                            }
                            else if(difference === 2 && (piecesInPlay[i].loc === pieceLocationEnd ||  piecesInPlay[i].loc === pieceLocationEnd[0] + (parseInt(pieceLocationEnd[1]) - 1)))
                            {
                                console.log("piece in the way");
                                straightMoveValid = false;
                                break;
                            }
                        }
                    }
                }
                if(straightMoveValid && straightMove)
                {
                    moveValid = true;
                    typeOfMove = "straight";
                }
                //en passant
                // if(take && !wasPieceCaptured &&)
                // {
                //     let file = pieceLocationEnd[0];
                    
                // }
                break;
        
            default:
                break;
        }
        if(moveValid)
        {
            processMove(pieceType,pieceLocationStart, pieceLocationEnd, pieceCaptured, typeOfMove)
            return true;
        }
        else
        {
            return false;
        }
    }
    function checkForChecks()
    {
        return "";
        //check if a king is being checked
    }
    function notate(pieceType, pieceLocationEnd, typeOfMove)
    {
        let notationObject = {Pawn: "P", Bishop: "B", Knight: "N", Queen: "Q", King: "K", Rook: "R"}
        let notation = "";
        notation += notationObject[pieceType] + (typeOfMove === "take" ? "X" : "") + pieceLocationEnd
        return notation;
    }
    function processMove(pieceType, pieceLocationStart, pieceLocationEnd, pieceCaptured, typeOfMove)
    {
        //still have to check for stalemate
        let notation = notate(pieceType, pieceLocationEnd, typeOfMove);
        console.log(notation)
        if(checkForChecks() === "check")
        {
            notation += "+"
        }
        if(checkForChecks() === "checkmate")
        {
            notation += "#"
        }
        if(turn === "white")
        {
            setTurn("black");
            let newMovesArr = [];
            for(let i=0; i<moves.length; i++)
            {
                newMovesArr.push(moves[i])
            }
            newMovesArr.push({w: notation, b: ""})
            setMoves(newMovesArr)
        }
        else
        {
            setTurn("white");
            let newMovesArr = [];
            for(let i=0; i<moves.length; i++)
            {
                if(i+1 === moves.length)
                {
                    console.log({...moves[i], b: notation})
                    newMovesArr.push({...moves[i], b: notation})
                }
                else
                {
                    newMovesArr.push(moves[i])
                }
                
            }
            setMoves(newMovesArr)
        }
        console.log(moves)
        if(typeOfMove === "take")
        {
            let newPiecesInPlay = [];
            let piece;
            for(let i=0; i< piecesInPlay.length; i++)
            {
                piece = piecesInPlay[i];
                if(pieceType === piece.type && pieceLocationStart === piece.loc)
                {
                    newPiecesInPlay.push({...piece, loc: pieceLocationEnd})
                }
                else if(pieceCaptured.type === piece.type && pieceCaptured.loc === piece.loc && pieceCaptured.key === piece.key)
                {
                    
                }
                else
                {
                    newPiecesInPlay.push({...piece})
                }
            }
            setPiecesInPlay(newPiecesInPlay)
        }
        else if(typeOfMove === "straight")
        {
            setPiecesInPlay(piecesInPlay.map((piece)=>{
                if(pieceType === piece.type && pieceLocationStart === piece.loc)
                {
                    return {...piece, loc: pieceLocationEnd}
                }
                return {...piece}
            }))
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
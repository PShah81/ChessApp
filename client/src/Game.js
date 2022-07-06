import Pawn from './pieces/Pawn.js';
import Bishop from './pieces/Bishop.js';
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
        let valid = validateMove(pieceType, pieceLocation, nearestDivKey, pieceColor);
        if(!valid)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function validateMove(pieceType, pieceLocationStart, pieceLocationEnd, pieceColor)
    {
        let typeOfMove;
        let pieceCaptured;
        let moveValid = true;
        let captureMove = false;
        let capturelessMove = false;
        let differenceX;
        if(pieceColor === "black")
        {
            differenceX = alphabetArray.indexOf(pieceLocationEnd[0]) - alphabetArray.indexOf(pieceLocationStart[0])
        } 
        else{
            differenceX = alphabetArray.indexOf(pieceLocationStart[0]) - alphabetArray.indexOf(pieceLocationEnd[0])
        }
        
        let differenceY;
        if(pieceColor === "black")
        {
            differenceY = parseInt(pieceLocationStart[1])- parseInt(pieceLocationEnd[1])
        } 
        else{
            differenceY = parseInt(pieceLocationEnd[1])- parseInt(pieceLocationStart[1])
        }


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
                if(Math.abs(differenceX) === 1 && differenceY === 1)
                {
                    captureMove = true;
                }
                //test if the move is going straight and if moving 2 squares is valid
                else if(differenceX === 0)
                {
                    if(pieceColor === "black" && differenceY === 2 && pieceLocationStart[1] !== "7")
                    {
                        break;
                    }
                    else if(pieceColor === "white" && differenceY === 2 && pieceLocationStart[1] !== "2")
                    { 
                        break;
                    }
                    else if(differenceY>2 || differenceY < 0)
                    {
                        break;
                    }
                    capturelessMove = true
                }
                let wasPieceCaptured = false;
                for(let i=0; i<piecesInPlay.length; i++)
                {
                    //piece to be captured
                    //check for en pessant
                    if(captureMove && piecesInPlay[i].loc === pieceLocationEnd)
                    {
                        if(piecesInPlay[i].color === pieceColor)
                        {
                            console.log("same color");
                            moveValid = false;
                            break;
                        }
                        else
                        {
                            console.log("valid capture")
                            wasPieceCaptured = true;
                            pieceCaptured = piecesInPlay[i];
                            typeOfMove = "captureMove";
                            break;
                        }
                    }
                    //piece in the way of movement
                    else if(capturelessMove)
                    {
                        //find the square in the middle of start and end in case of a 2 move 
                        if(pieceColor=== "black")
                        {
                            if(differenceY === 1 && piecesInPlay[i].loc === pieceLocationEnd)
                            {
                                console.log("piece in the way");
                                moveValid = false;
                                break;
                            }
                            else if(differenceY === 2 && (piecesInPlay[i].loc === pieceLocationEnd ||  piecesInPlay[i].loc === pieceLocationEnd[0] + (parseInt(pieceLocationEnd[1]) + 1)))
                            {
                                console.log("piece in the way");
                                moveValid = false;
                                break;
                            }
                        }
                        else 
                        {
                            if(differenceY === 1 && piecesInPlay[i].loc === pieceLocationEnd)
                            {
                                console.log("piece in the way");
                                moveValid = false;
                                break;
                            }
                            else if(differenceY === 2 && (piecesInPlay[i].loc === pieceLocationEnd ||  piecesInPlay[i].loc === pieceLocationEnd[0] + (parseInt(pieceLocationEnd[1]) - 1)))
                            {
                                console.log("piece in the way");
                                moveValid = false;
                                break;
                            }
                        }
                    }
                }
                if(moveValid && capturelessMove)
                {
                    typeOfMove = "capturelessMove";
                }
                //en passant
                if(captureMove && !wasPieceCaptured)
                {
                    let capturedPieceLoc;
                    if(pieceColor === "black")
                    {
                       capturedPieceLoc = pieceLocationEnd[0] + (parseInt(pieceLocationEnd[1])+1)
                    }
                    else
                    {
                        capturedPieceLoc = pieceLocationEnd[0] + (parseInt(pieceLocationEnd[1])-1)
                    }
                    console.log(capturedPieceLoc)
                    for(let i=0; i<piecesInPlay.length; i++)
                    {
                        if(piecesInPlay[i].loc === capturedPieceLoc)
                        {
                            let key;
                            if(pieceColor === "black")
                            {
                                key = "w"
                            }
                            else
                            {
                                key = "b"
                            }
                            if(moves[moves.length-1][key] === "P" + capturedPieceLoc)
                            {
                                let notATwoMove = false;
                                for(let i=0; i<moves.length; i++)
                                {
                                    if(moves[i][key] === pieceLocationEnd)
                                    {
                                        notATwoMove = true;
                                    }

                                }
                                if(notATwoMove === false)
                                {
                                    pieceCaptured = piecesInPlay[i];
                                    typeOfMove = "captureMove";
                                }
                            }
                            
                        }
                    }
                    
                }
                if(pieceCaptured === undefined && captureMove)
                {
                    moveValid = false;
                }
                break;
            case 'Bishop':
                if(Math.abs(differenceX) === Math.abs(differenceY))
                {
                    //in accordance with board where black is at the bottom and squares are loaded starting at the top left
                    if(pieceColor === "black")
                    {
                        differenceY *= -1
                    }
                    else if (pieceColor === "white")
                    {
                        differenceX *= -1
                    }
                    let unitsX = differenceX / Math.abs(differenceX);
                    let unitsY = differenceY / Math.abs(differenceY);
                    for(let i=1; i<(Math.abs(differenceX) + 1); i++)
                    {
                        let stringLocation = alphabetArray[alphabetArray.indexOf(pieceLocationStart[0]) + unitsX*i] + (parseInt(pieceLocationStart[1]) + i*unitsY)
                        console.log(stringLocation)
                        for(let j=0; j<piecesInPlay.length; j++)
                        {
                            if(piecesInPlay[j].loc === pieceLocationEnd)
                            {
                                captureMove = true;
                                typeOfMove = "captureMove";
                                pieceCaptured = piecesInPlay[j];
                            }
                            else if(piecesInPlay[j].loc === stringLocation)
                            {
                                moveValid = false;
                            }
                        }
                    }
                    if(moveValid && !captureMove)
                    {
                        capturelessMove = true;
                        typeOfMove = "capturelessMove";
                    }
                }
                else
                {
                    moveValid = false;
                }
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
        notation += notationObject[pieceType] + (typeOfMove === "captureMove" ? "X" : "") + pieceLocationEnd
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
        if(typeOfMove === "captureMove")
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
        else if(typeOfMove === "capturelessMove")
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
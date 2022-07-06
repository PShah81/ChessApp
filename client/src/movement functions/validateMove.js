function validateMove(pieceType, pieceLocationStart, pieceLocationEnd, pieceColor,alphabetArray, turn, piecesInPlay, moves, processMove, setTurn, setMoves, setPiecesInPlay)
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
                        moveValid = false;
                        break;
                    }
                    else if(pieceColor === "white" && differenceY === 2 && pieceLocationStart[1] !== "2")
                    { 
                        moveValid = false;
                        break;
                    }
                    else if(differenceY>2 || differenceY < 0)
                    {
                        moveValid = false;
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
            processMove(pieceType,pieceLocationStart, pieceLocationEnd, pieceCaptured, typeOfMove, alphabetArray, turn, piecesInPlay, moves, setTurn, setMoves, setPiecesInPlay)
            return true;
        }
        else
        {
            return false;
        }
    }

export {validateMove}
function pawnMoveValidity(differenceX, differenceY, pieceLocationStart, pieceLocationEnd, pieceColor, piecesInPlay, moves)
{
    let moveValid = true;
    let promotion = false;
    let typeOfMove;
    let pieceCaptured;
    let captureMove = false;
    let capturelessMove = false;
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
            return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured, promotion: promotion};
        }
        else if(pieceColor === "white" && differenceY === 2 && pieceLocationStart[1] !== "2")
        { 
            moveValid = false;
            return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured, promotion: promotion};
        }
        else if(differenceY>2 || differenceY < 0)
        {
            moveValid = false;
            return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured, promotion: promotion};
        }
        capturelessMove = true
    }
    else
    {
        moveValid = false;
        return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured, promotion: promotion};
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
                return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured, promotion: promotion};
            }
            else
            {
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
                    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured, promotion: promotion};
                }
                else if(differenceY === 2 && (piecesInPlay[i].loc === pieceLocationEnd ||  piecesInPlay[i].loc === pieceLocationEnd[0] + (parseInt(pieceLocationEnd[1]) + 1)))
                {
                    console.log("piece in the way");
                    moveValid = false;
                    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured, promotion: promotion};
                }
            }
            else 
            {
                if(differenceY === 1 && piecesInPlay[i].loc === pieceLocationEnd)
                {
                    console.log("piece in the way");
                    moveValid = false;
                    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured, promotion: promotion};
                }
                else if(differenceY === 2 && (piecesInPlay[i].loc === pieceLocationEnd ||  piecesInPlay[i].loc === pieceLocationEnd[0] + (parseInt(pieceLocationEnd[1]) - 1)))
                {
                    console.log("piece in the way");
                    moveValid = false;
                    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured, promotion: promotion};
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
        let key;
        if(pieceColor === "black")
        {
           capturedPieceLoc = pieceLocationEnd[0] + (parseInt(pieceLocationEnd[1])+1);
           key = "w"
        }
        else
        {
            capturedPieceLoc = pieceLocationEnd[0] + (parseInt(pieceLocationEnd[1])-1);
            key = "b"
        }
        for(let i=0; i<piecesInPlay.length; i++)
        {
            if(moves.length === 0)
            {
                break;
            }
            if(piecesInPlay[i].loc === capturedPieceLoc)
            {
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
        return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured, promotion: promotion}
    }
    //check for promotion
    if((pieceLocationEnd[1] === '8' && pieceColor === 'white') || (pieceLocationEnd[1] === '1' && pieceColor === 'black'))
    {
        promotion = true;
        console.log('promotion!')
    }
    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured, promotion: promotion}
}

export {pawnMoveValidity}
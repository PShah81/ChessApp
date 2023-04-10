function knightMoveValidity(differenceX, differenceY, pieceLocationStart, pieceLocationEnd, pieceColor, piecesInPlay)
{
    let moveValid = true;
    let typeOfMove;
    let pieceCaptured;
    let captureMove = false;
    let capturelessMove = false;
    if((Math.abs(differenceX) === 2 && Math.abs(differenceY) === 1 )||(Math.abs(differenceX) === 1 && Math.abs(differenceY) === 2 ))
    {
        for(let i=0; i<piecesInPlay.length; i++)
        {
            if(piecesInPlay[i].loc === pieceLocationEnd)
            {
                if(piecesInPlay[i].color === pieceColor)
                {
                    moveValid = false;
                    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
                }
                else
                {
                    captureMove = true;
                    typeOfMove = "captureMove";
                    pieceCaptured = piecesInPlay[i];
                }
            }
        }
        if(!captureMove)
        {
            capturelessMove = true;
            typeOfMove = "capturelessMove";
        }              
    }
    else
    {
        moveValid = false;
        return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
    }
    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
}

export {knightMoveValidity}
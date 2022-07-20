function bishopMoveValidity(differenceX, differenceY, pieceLocationStart, pieceLocationEnd, pieceColor, piecesInPlay, alphabetArray)
{
    let moveValid = true;
    let captureMove = false;
    let capturelessMove = false;
    let typeOfMove;
    let pieceCaptured;
    let stringLocation;

    if(Math.abs(differenceX) === Math.abs(differenceY))
    {
        let unitsX = differenceX / Math.abs(differenceX);
        let unitsY = differenceY / Math.abs(differenceY);
        for(let i=1; i<(Math.abs(differenceX) + 1); i++)
        {
            stringLocation = alphabetArray[alphabetArray.indexOf(pieceLocationStart[0]) + unitsX*i] + (parseInt(pieceLocationStart[1]) + i*unitsY)
            for(let j=0; j<piecesInPlay.length; j++)
            {
                if(piecesInPlay[j].loc === pieceLocationEnd)
                {
                    if(piecesInPlay[j].color === pieceColor)
                    {
                        moveValid = false;
                        return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
                    }
                    else
                    {
                        captureMove = true;
                        typeOfMove = "captureMove";
                        pieceCaptured = piecesInPlay[j];
                    }
                }
                else if(piecesInPlay[j].loc === stringLocation)
                {
                    moveValid = false;
                    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
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
        return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
    }
    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured}
}

export {bishopMoveValidity}
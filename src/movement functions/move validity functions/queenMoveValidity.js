function queenMoveValidity(differenceX, differenceY, pieceLocationStart, pieceLocationEnd, pieceColor, piecesInPlay, alphabetArray)
{
    let moveValid = true;
    let typeOfMove;
    let pieceCaptured;
    let captureMove = false;
    let capturelessMove = false;
    let stringLocation;
    
    let unitsX = differenceX / Math.abs(differenceX);
    let unitsY = differenceY / Math.abs(differenceY);
    if(Math.abs(differenceX) > 0 && Math.abs(differenceY)>0)
    {
        if(Math.abs(differenceX) === Math.abs(differenceY))
        {
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
    }
    else if(Math.abs(differenceY) > 0)
    {
        for(let i=1; i<(Math.abs(differenceY) + 1); i++)
        {
            let stringLocation = pieceLocationStart[0] + (parseInt(pieceLocationStart[1]) + i*unitsY)
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
    else if (Math.abs(differenceX) > 0)
    {
        for(let i=1; i<(Math.abs(differenceX) + 1); i++)
        {
            let stringLocation = alphabetArray[alphabetArray.indexOf(pieceLocationStart[0]) + unitsX*i] + pieceLocationStart[1]
            console.log(stringLocation)
            console.log(pieceLocationEnd)
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
    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
}

export {queenMoveValidity};
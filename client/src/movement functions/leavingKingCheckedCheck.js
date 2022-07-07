function leavingKingCheckedCheck(typeofMove, piecesInPlay, pieceType, pieceLocationEnd, pieceLocationStart, pieceCaptured, checkForChecks, simulateMove, alphabetArray, turn, promotion)
{
    let newPiecesArray = simulateMove(typeofMove, piecesInPlay, pieceType, pieceLocationEnd, pieceLocationStart, pieceCaptured, promotion);
    let blackKing;
    let whiteKing;
    let checkArr;
    for(let i=0; i< newPiecesArray.length; i++)
    {
        if(newPiecesArray[i].type === "King")
        {
            if(newPiecesArray[i].color === "black")
            {
                blackKing = newPiecesArray[i]
            }
            else
            {
                whiteKing = newPiecesArray[i]
            }
        }
    }
    checkArr = checkForChecks(newPiecesArray, blackKing, whiteKing, alphabetArray);
    if(checkArr[0] && turn === "white")
    {
        return true;
    }
    else if(checkArr[1] && turn === "black")
    {
        return true;
    }
    else
    {
        return false;
    }
}
export {leavingKingCheckedCheck}
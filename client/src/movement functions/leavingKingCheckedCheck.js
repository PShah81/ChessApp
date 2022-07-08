function leavingKingCheckedCheck(typeofMove, piecesInPlay, pieceType, pieceLocationEnd, pieceLocationStart, pieceCaptured, checkForChecks, simulateMove, alphabetArray, turn, promotion)
{
    let newPiecesArray = simulateMove(typeofMove, piecesInPlay, pieceType, pieceLocationEnd, pieceLocationStart, pieceCaptured, promotion, alphabetArray);
    let king;
    let checkArr;
    for(let i=0; i< newPiecesArray.length; i++)
    {
        if(newPiecesArray[i].type === "King" && newPiecesArray[i].color === turn)
        {
            king = newPiecesArray[i];
        }
    }
    checkArr = checkForChecks(newPiecesArray, king, alphabetArray);
    if(checkArr[0])
    {
        return true;
    }
    else
    {
        return false;
    }
}
export {leavingKingCheckedCheck}
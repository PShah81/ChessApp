import { checkForChecks } from "../processMove";

function kingMoveValidity(differenceX, differenceY, pieceLocationStart, pieceLocationEnd, pieceColor, piecesInPlay, moves, alphabetArray)
{
    let moveValid = true;
    let typeOfMove;
    let pieceCaptured;
    let captureMove = false;
    let capturelessMove = false;
    if((Math.abs(differenceX) <= 1 && Math.abs(differenceY) <= 1))
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
        if(moveValid && !captureMove)
        {
            capturelessMove = true;
            typeOfMove = "capturelessMove";
        }
    }
    else if(Math.abs(differenceX) > 1 && Math.abs(differenceX) < 3 && Math.abs(differenceY) === 0)
    {
        let kingMovedBefore = false;
        let rookMovedBefore = false;
        let isInCheck = false;
        let checkArr;
        let king;
        let squaresToCheck;
        let modifiedKingLocation;

        let unitsX = differenceX/Math.abs(differenceX);
        let unitsY = differenceY/Math.abs(differenceY);
        //this time checking if a check is being given
        for(let i=0; i< piecesInPlay.length; i++)
        {
            if(piecesInPlay[i].type === "King" && piecesInPlay[i].color === pieceColor)
            {
                    king = piecesInPlay[i];
            }
        }
        if(differenceX === -2)
        {
            //threatened square rule only appies to king
            squaresToCheck = (alphabetArray.indexOf(king.loc[0]) - 1) + 1;
            for(let i=0; i<(squaresToCheck); i++)
            {
                modifiedKingLocation = alphabetArray[alphabetArray.indexOf(king.loc[0]) + unitsX*i] + king.loc[1];
                checkArr = checkForChecks(piecesInPlay, {...king, loc: modifiedKingLocation} ,alphabetArray);
                if(checkArr[0])
                {
                    moveValid = false;
                    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
                }
            }
            let color = pieceColor === "white"? "w" : "b"
            for(let j=0; j<moves.length; j++)
            {
                if(moves[j][color].key === "h"+king.loc[1]+"Rook" || moves[j][color].key === "e"+king.loc[1]+"King")
                {
                    console.log("Already moved king/rook")
                    moveValid = false;
                    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
                }
            }
            moveValid = true;
            typeOfMove = "kingsideCastle";
        }
        else if(differenceX === 2)
        {
            //threatened square rule only appies to king
            squaresToCheck = (5 - alphabetArray.indexOf(king.loc[0])) + 1
            for(let i=0; i<(squaresToCheck); i++)
            {
                modifiedKingLocation = alphabetArray[alphabetArray.indexOf(king.loc[0]) + unitsX*i] + king.loc[1];
                checkArr = checkForChecks(piecesInPlay, {...king, loc: modifiedKingLocation} ,alphabetArray);
                if(checkArr[0])
                {
                    moveValid = false;
                    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
                }
            }
            let color = pieceColor === "white"? "w" : "b"
            for(let j=0; j<moves.length; j++)
            {
                if(moves[j][color].key  === "a"+king.loc[1]+"Rook" || moves[j][color].key  === "e"+king.loc[1]+"King")
                {
                    console.log("Already moved king/rook")
                    moveValid = false;
                    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
                }
            }
            moveValid = true;
            typeOfMove = "queensideCastle";
        }
        
    }
    else
    {
        moveValid = false;
        return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
    }
    return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured};
}

export {kingMoveValidity}
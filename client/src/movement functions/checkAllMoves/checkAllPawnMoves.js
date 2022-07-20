import { validateMove } from "../validateMove";

function checkAllPawnMoves(pawn, piecesInPlay, alphabetArray, turn, moves)
{
    let distanceX = -1;
    let distanceY = 1;
    let objectOfVals;
    let stringLocation;
    let actualTurn;
    let yMultiplier = 1;
    if(turn === "black")
    {
        actualTurn = "white";
    }
    else
    {
        yMultiplier = -1;
        actualTurn = "black";
    }
    for(let i=0; i<4; i++)
    {
        stringLocation = alphabetArray[alphabetArray.indexOf(pawn.loc[0]) + distanceX] + (parseInt(pawn.loc[1]) + distanceY * yMultiplier);
        objectOfVals = validateMove(pawn.type, pawn.loc, stringLocation, pawn.color, alphabetArray, actualTurn, piecesInPlay, moves);
        if(objectOfVals.moveValid)
        {
            return true;
        }
        if(i === 2)
        {
            distanceY = 2;
            distanceX = 0;
        }
        else
        {
            distanceX++;
        }
        
    }
    return false;
}

export {checkAllPawnMoves}
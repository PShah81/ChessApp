import { validateMove } from "../validateMove";

function checkAllRookMoves(rook, piecesInPlay, alphabetArray, turn, moves)
{
    let actualTurn;
    if(turn === "black")
    {
        actualTurn = "white";
    }
    else
    {
        actualTurn = "black";
    }
    let stringLocation;
    let objectOfVals;
    for(let i=1; i<9; i++)
    {
        stringLocation = rook.loc[0] + i;
        objectOfVals = validateMove(rook.type, rook.loc, stringLocation, rook.color, alphabetArray, actualTurn, piecesInPlay, moves);
        if(objectOfVals.moveValid)
        {
            return true;
        }
    }

    for(let i=0; i<8; i++)
    {
        stringLocation = alphabetArray[i] + rook.loc[1];
        objectOfVals = validateMove(rook.type, rook.loc, stringLocation, rook.color, alphabetArray, actualTurn, piecesInPlay, moves);
        if(objectOfVals.moveValid)
        {
            return true;
        }
    }
    return false;
}

export {checkAllRookMoves}
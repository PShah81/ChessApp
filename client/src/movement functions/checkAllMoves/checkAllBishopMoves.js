import { validateMove } from "../validateMove";

function checkAllBishopMoves(bishop, piecesInPlay, alphabetArray, turn, moves)
{
    let xMultiplier = 1;
    let yMultiplier = 1;
    let distanceRight = 7 - alphabetArray.indexOf(bishop.loc[0]);
    let distanceLeft = alphabetArray.indexOf(bishop.loc[0]) - 0;
    let distanceUp = parseInt(bishop.loc[1]) - 1;
    let distanceDown = 8 - parseInt(bishop.loc[1]);
    let objectOfVals;
    let distanceX = distanceRight;
    let distanceY = distanceUp;
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
    let squaresToCheck;
    for(let i=0; i<4; i++)
    {
        if(distanceX === distanceLeft)
        {
            xMultiplier = -1;
        }
        else
        {
            xMultiplier = 1;
        }
        if(distanceY === distanceUp)
        {
            yMultiplier = -1;
        }
        else
        {
            yMultiplier = 1;
        }
        squaresToCheck = distanceX > distanceY ? distanceY : distanceX;
        for(let i=1; i<squaresToCheck+1; i++)
        {
            stringLocation = alphabetArray[alphabetArray.indexOf(bishop.loc[0]) + xMultiplier*i] + (parseInt(bishop.loc[1]) + yMultiplier*i);
            objectOfVals = validateMove(bishop.type, bishop.loc, stringLocation, bishop.color, alphabetArray, actualTurn, piecesInPlay, moves);
            if(objectOfVals.moveValid)
            {
                return true;
            }
        }
        if(i%2 === 0)
        {
            if(distanceX === distanceRight)
            {
                distanceX = distanceLeft
            }
            else
            {
                distanceX = distanceRight
            }
        }
        if(i%2 === 1)
        {
            if(distanceY === distanceUp)
            {
                distanceY = distanceDown
            }
            else
            {
                distanceY = distanceUp
            }
        }
    }
    return false;
}
export {checkAllBishopMoves}
import { validateMove } from "../validateMove";

function checkAllQueenMoves(queen, piecesInPlay, alphabetArray, turn, moves)
{
    let xMultiplier = 1;
    let yMultiplier = 1;
    let distanceRight = 7 - alphabetArray.indexOf(queen.loc[0]);
    let distanceLeft = alphabetArray.indexOf(queen.loc[0]) - 0;
    let distanceUp = parseInt(queen.loc[1]) - 1;
    let distanceDown = 8 - parseInt(queen.loc[1]);
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
        console.log(distanceY);
        console.log(distanceX);
        console.log(squaresToCheck)
        for(let i=1; i<squaresToCheck+1; i++)
        {
            stringLocation =  alphabetArray[alphabetArray.indexOf(queen.loc[0]) + xMultiplier*i] + (parseInt(queen.loc[1]) + yMultiplier*i);
            objectOfVals = validateMove(queen.type, queen.loc, stringLocation, queen.color, alphabetArray, actualTurn, piecesInPlay, moves);
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

    for(let i=1; i<9; i++)
    {
        stringLocation = queen.loc[0] + i;
        objectOfVals = validateMove(queen.type, queen.loc, stringLocation, queen.color, alphabetArray, actualTurn, piecesInPlay, moves);
        if(objectOfVals.moveValid)
        {
            return true;
        }
    }

    for(let i=0; i<8; i++)
    {
        stringLocation = alphabetArray[i] + queen.loc[1];
        objectOfVals = validateMove(queen.type, queen.loc, stringLocation, queen.color, alphabetArray, actualTurn, piecesInPlay, moves);
        if(objectOfVals.moveValid)
        {
            return true;
        }
    }
    return false;
}

export {checkAllQueenMoves}
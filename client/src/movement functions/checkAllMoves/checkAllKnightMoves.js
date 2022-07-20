import { validateMove } from "../validateMove";

function checkAllKnightMoves(knight, piecesInPlay, alphabetArray, turn, moves)
{
    let distanceX = -1
    let distanceY = -2;
    let stringLocation;
    let objectOfVals;
    let actualTurn;
    if(turn === "black")
    {
        actualTurn = "white";
    }
    else
    {
        actualTurn = "black";
    }
    for(let i=0; i<8; i++)
    {
        distanceX *= -1;
        if(i%2 === 0 && i%4 !== 0 && i !== 0)
        {
            distanceY += 1;
            distanceX = 3 - Math.abs(distanceY);
        }
        else if(i%4 === 0 && i !== 0)
        {   
            distanceY +=2;
            distanceX = 3 - Math.abs(distanceY);
        }
        stringLocation = alphabetArray[alphabetArray.indexOf(knight.loc[0]) + distanceX] + (parseInt(knight.loc[1]) + distanceY);
        objectOfVals = validateMove(knight.type, knight.loc, stringLocation, knight.color, alphabetArray, actualTurn, piecesInPlay, moves);
        if(objectOfVals.moveValid)
        {
            return true;
        }
    }
    return false;
}
export {checkAllKnightMoves}
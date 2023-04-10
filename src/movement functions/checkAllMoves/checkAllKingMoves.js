import { validateMove } from "../validateMove";

function checkAllKingMoves(king, piecesInPlay, alphabetArray, turn, moves)
{
    let xChange = -1;
    let yChange = -1;
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
    for(let i=1; i<9; i++)
    {
        console.log(i)
        console.log(xChange)
        console.log(yChange)
        console.log(alphabetArray[alphabetArray.indexOf(king.loc[0]) +  xChange] + (parseInt(king.loc[1]) + yChange))
        if((alphabetArray.indexOf(king.loc[0]) +  xChange) < 8 && (alphabetArray.indexOf(king.loc[0]) +  xChange) >= 0 && (parseInt(king.loc[1]) + yChange) > 0 && (parseInt(king.loc[1]) + yChange) < 9)
        {
            stringLocation = alphabetArray[alphabetArray.indexOf(king.loc[0]) +  xChange] + (parseInt(king.loc[1]) + yChange);
            objectOfVals = validateMove(king.type, king.loc, stringLocation, king.color, alphabetArray, actualTurn, piecesInPlay, moves);
            if(objectOfVals.moveValid)
            {
                console.log('hi')
                return true;
            }
        }
        if(i % 3 === 0 && i !== 6)
        {
            xChange += 1;
            yChange = -1;
        }
        else if(i === 5)
        {
            xChange = 1;
            yChange = -1;
        }
        else
        {
            yChange+= 1;
        }

        if(xChange === 0 && yChange === 0)
        {
            yChange++;
        }
    }
    return false;
}

export {checkAllKingMoves}
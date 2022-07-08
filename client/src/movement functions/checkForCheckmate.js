import {checkForChecks, processMove} from './processMove.js';
import {pawnMoveValidity} from './move validity functions/pawnMoveValidity.js';
import {bishopMoveValidity} from './move validity functions/bishopMoveValidity.js';
import {knightMoveValidity} from './move validity functions/knightMoveValidity.js';
import {rookMoveValidity} from './move validity functions/rookMoveValidity.js';
import {queenMoveValidity} from './move validity functions/queenMoveValidity.js';
import {kingMoveValidity} from './move validity functions/kingMoveValidity.js';
import { validateMove } from './validateMove.js';
function checkForCheckmate(pieceChecking, blackKing, whiteKing, piecesInPlay, alphabetArray, turn, moves)
{
    console.log(pieceChecking)
    console.log(blackKing)
    console.log(whiteKing)
    let differenceXChecker;
    let differenceYChecker;
    let kingUsed;
    if(turn === "white")
    {
        kingUsed = blackKing;
    }
    else{
        kingUsed = whiteKing;
    }
    if(turn === "white")
    {
        differenceXChecker = alphabetArray.indexOf(pieceChecking.loc[0]) - alphabetArray.indexOf(blackKing.loc[0]);
    } 
    else{
        differenceXChecker = alphabetArray.indexOf(whiteKing.loc[0]) - alphabetArray.indexOf(pieceChecking.loc[0]);
    }
    
    if(turn === "white")
    {
        differenceYChecker = parseInt(blackKing.loc[1])- parseInt(pieceChecking.loc[1])
    } 
    else{
        differenceYChecker = parseInt(pieceChecking.loc[1])- parseInt(whiteKing.loc[1])
    }

    //adjustments to make for the board
    if(turn === "white")
    {
        differenceYChecker *= -1
    }
    else if (turn === "black")
    {
        differenceXChecker *= -1
    }
    let unitsX;
    let unitsY;
    let objectOfVals;
    let piece;
    let pieceLocationEnd;
    console.log(differenceXChecker);
    console.log(differenceYChecker);

    if(Math.abs(differenceXChecker) > 0 && Math.abs(differenceYChecker) > 0)
    {
        if(Math.abs(differenceXChecker) !== Math.abs(differenceYChecker))
        {
            pieceLocationEnd = pieceChecking.loc;
            for(let j=0; j<piecesInPlay.length; j++)
            {
                piece = piecesInPlay[j]
                if(piece.color === pieceChecking.color || piece.type === "King")
                {
                    continue;
                }
                else
                {
                    objectOfVals= validateMove(piece.type, piece.loc, pieceLocationEnd, piece.color, alphabetArray, piece.color, piecesInPlay, moves);
                    if(objectOfVals.moveValid)
                    {
                        return false;
                    }
                }
            }
        }
        else
        {
            console.log("here")
            unitsX = differenceXChecker/Math.abs(differenceXChecker);
            unitsY = differenceYChecker/Math.abs(differenceYChecker);
            for(let i=1; i<Math.abs(differenceXChecker) + 1; i++)
            {
                pieceLocationEnd = alphabetArray[alphabetArray.indexOf(kingUsed.loc[0]) + unitsX * i] + (parseInt(kingUsed.loc[1]) + unitsY*i);
                for(let j=0; j<piecesInPlay.length; j++)
                {
                    piece = piecesInPlay[j]
                    if(piece.color === pieceChecking.color || piece.type === "King")
                    {
                        continue;
                    }
                    else
                    {
                        objectOfVals= validateMove(piece.type, piece.loc, pieceLocationEnd, piece.color, alphabetArray, piece.color, piecesInPlay, moves);
                        console.log(objectOfVals)
                        if(objectOfVals.moveValid)
                        {
                            return false;
                        }
                    }
                }
                
            }
            
        }

    }
    else if(Math.abs(differenceXChecker) > 0)
    {
        unitsX = differenceXChecker/Math.abs(differenceXChecker);
        for(let i=1; i<Math.abs(differenceXChecker); i++)
        {
            pieceLocationEnd = alphabetArray[alphabetArray.indexOf(kingUsed.loc[0]) + unitsX * i] + kingUsed.loc[1];
            for(let j=0; j<piecesInPlay.length; j++)
            {
                piece = piecesInPlay[j];
                if(piece.color === pieceChecking.color || piece.type === "King")
                {
                    continue;
                }
                else
                {
                    objectOfVals= validateMove(piece.type, piece.loc, pieceLocationEnd, piece.color, alphabetArray, piece.color, piecesInPlay, moves);
                    console.log(objectOfVals)
                    if(objectOfVals.moveValid)
                    {
                        return false;
                    }
                }
            }
        }
    }
    else if(Math.abs(differenceYChecker) > 0)
    {
        unitsY = differenceYChecker/Math.abs(differenceYChecker);
        for(let i=1; i<Math.abs(differenceYChecker); i++)
        {
            pieceLocationEnd = kingUsed.loc[0] + (parseInt(kingUsed.loc[1]) + unitsY*i);
            for(let j=0; j<piecesInPlay.length; j++)
            {
                piece = piecesInPlay[j]
                if(piece.color === pieceChecking.color || piece.type === "King")
                {
                    continue;
                }
                else
                {
                    objectOfVals= validateMove(piece.type, piece.loc, pieceLocationEnd, piece.color, alphabetArray, piece.color, piecesInPlay, moves);
                    if(objectOfVals.moveValid)
                    {
                        return false;
                    }
                }
            }
            
        }
    }
    let xChange = -1;
    let yChange = -1;
    for(let i=1; i<9; i++)
    {
        if((alphabetArray.indexOf(kingUsed.loc[0]) +  xChange) < 8 && (alphabetArray.indexOf(kingUsed.loc[0]) +  xChange) >= 0 && (parseInt(kingUsed.loc[1]) + yChange) > 0 && (parseInt(kingUsed.loc[1]) + yChange) < 9)
        {
            pieceLocationEnd = alphabetArray[alphabetArray.indexOf(kingUsed.loc[0]) +  xChange] + (parseInt(kingUsed.loc[1]) + yChange);
        }
        else
        {
            continue;
        }
        objectOfVals = validateMove(kingUsed, kingUsed.loc, pieceLocationEnd, kingUsed.color, alphabetArray, piece.color, piecesInPlay, moves);
        if(objectOfVals.moveValid)
        {
            return false;
        }

        if(i % 3 === 0)
        {
            xChange += 1;
            yChange = -1;
        }
        else
        {
            yChange+= 1;
        }
        
        
    }
    console.log("true");
    return true;
}
export {checkForCheckmate}
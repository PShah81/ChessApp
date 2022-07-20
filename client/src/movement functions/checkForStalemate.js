import {checkAllPawnMoves} from './checkAllMoves/checkAllPawnMoves.js';
import {checkAllBishopMoves} from './checkAllMoves/checkAllBishopMoves.js';
import {checkAllKnightMoves} from './checkAllMoves/checkAllKnightMoves.js';
import {checkAllRookMoves} from './checkAllMoves/checkAllRookMoves.js';
import {checkAllQueenMoves} from './checkAllMoves/checkAllQueenMoves.js';
import {checkAllKingMoves} from './checkAllMoves/checkAllKingMoves.js';
import { kingMoveValidity } from './move validity functions/kingMoveValidity.js';
function checkForStalemate(piecesInPlay, alphabetArray, turn, moves, listOfPositions)
{
    let isValid;
    let getOutOfLoop = false;
    for(let i=0; i<piecesInPlay.length; i++)
    {
        if(piecesInPlay[i].color !== turn)
        {
            switch (piecesInPlay[i].type)
            {
                case 'Pawn':
                    if(checkAllPawnMoves(piecesInPlay[i],piecesInPlay,alphabetArray,turn, moves))
                    {
                        isValid = true;
                        getOutOfLoop = true;
                    }
                    break;
                case 'Bishop':
                    if(checkAllBishopMoves(piecesInPlay[i],piecesInPlay,alphabetArray,turn, moves))
                    {
                        isValid = true;
                        getOutOfLoop = true;
                    }
                    break;
                case "Knight":
                    if(checkAllKnightMoves(piecesInPlay[i],piecesInPlay,alphabetArray,turn, moves))
                    {
                        isValid = true;
                        getOutOfLoop = true;
                    }
                    break;
                case 'Rook':
                    if(checkAllRookMoves(piecesInPlay[i],piecesInPlay,alphabetArray,turn, moves))
                    {
                        isValid = true;
                        getOutOfLoop = true;
                    }
                    break;
                case 'Queen':
                    if(checkAllQueenMoves(piecesInPlay[i],piecesInPlay,alphabetArray,turn, moves))
                    {
                        isValid = true;
                        getOutOfLoop = true;
                    }
                    break;
                case 'King':
                    if(checkAllKingMoves(piecesInPlay[i],piecesInPlay,alphabetArray,turn, moves))
                    {
                        isValid = true;
                        getOutOfLoop = true;
                    }
                    break;
                default:
                    break;
            }

        }

        if(getOutOfLoop)
        {
            break;
        }
    }
    if(isValid === undefined)
    {
        console.log('true')
        return true;
    }

    if(piecesInPlay.length < 4)
    {
        let knightOrBishopCount = 0;
        for(let i=0; i<piecesInPlay.length; i++)
        {
            if(piecesInPlay[i].type === "Knight" || piecesInPlay[i].type === "Bishop")
            {
                knightOrBishopCount++;
            }
        }
        if(knightOrBishopCount < 2 && knightOrBishopCount + 2 === piecesInPlay.length)
        {
            return true;
        }
    }

    if(checkForThreeFoldRepetition(moves, listOfPositions) || checkForFiftyMovesStalemate(moves))
    {
        return true;
    }
}

function checkForThreeFoldRepetition(moves, listOfPositions)
{
    //must check rook didnt move if hasnt castled yet and rook hasnt moved yet and king hasnt moved yet
    //if king moved already rooks can go wherever
    //any pawn move changes position
    //if both rooks moved king can go wherever
    let currentPiecesObject = {white: {King: {}, Queen: {}, Knight: {}, Pawn: {}, Bishop: {}, Rook: {}}, black: {King: {}, Queen: {}, Knight: {}, Pawn: {}, Bishop: {}, Rook: {}}};
    let move;
    let colorOfMove;
    let currentPosition = listOfPositions[listOfPositions.length-1];
    let comparingPosition;
    let piece;
    let comparingPiece;
    let matchingLocation;
    let positionsMatch;
    let arrayOfKeys;
    let matchingPositionsCount = 1;
    let adjustedMove;
    for(let i=0; i<currentPosition.length; i++)
    {
        piece = currentPosition[i]
        currentPiecesObject[piece.color][piece.type][piece.key] = piece;
    }

    for(let i=listOfPositions.length-2; i > -1; i--)
    {
        comparingPosition = listOfPositions[i];
        move = Math.floor((i-1)/2);
        colorOfMove = i%2 === 0 ? "black" : "white";
        positionsMatch = true;
        console.log("this is the position #" + i)
        console.log(listOfPositions[i])
        for(let i=0; i<comparingPosition.length; i++)
        {
            matchingLocation = false;
            comparingPiece = comparingPosition[i];
            
            if(comparingPiece.color === "black" && colorOfMove === "white")
            {
                adjustedMove = move - 1;
            }
            else
            {
                adjustedMove = move;
            }
            if(comparingPiece.type === "Rook")
            {
                let colorMovesKey;
                let castledBefore = false;
                let castledAfter  = false;
                let kingMovedBefore = false;
                let aRookMovedBefore = false;
                let hRookMovedBefore = false;
                if(comparingPiece.color === "white")
                {
                    colorMovesKey = "w";
                }
                else
                {
                    colorMovesKey = "b";
                }
                //check if castled before
                for(let i=0; i<moves.length; i++)
                {
                    if(i+1 >= moves.length && colorMovesKey === "b" && moves[i].b.key === undefined)
                    {
                        break;
                    }
                    if(moves[i][colorMovesKey].notation === "O-O" || moves[i][colorMovesKey].notation === "O-O-O")
                    {
                        if(i > adjustedMove)
                        {
                            positionsMatch = false;
                            castledAfter = true;
                            break;
                        }
                        else
                        {
                            castledBefore = true;
                        }
                    }
                    if(moves[i][colorMovesKey].key[0] === "a" && moves[i][colorMovesKey].notation[0] === "R" && i <= adjustedMove)
                    {
                        aRookMovedBefore = true;
                    }
                    if(moves[i][colorMovesKey].key[0] === "h" && moves[i][colorMovesKey].notation[0] === "R" && i <= adjustedMove)
                    {
                        hRookMovedBefore = true;
                    }
                    if(moves[i][colorMovesKey].notation[0] === "K" && i <= adjustedMove)
                    {
                        kingMovedBefore = true;
                    }
                    if(moves[i][colorMovesKey].key[0] === "h" && moves[i][colorMovesKey].notation[0] === "R" &&  i > adjustedMove)
                    {

                        if(kingMovedBefore === false  && hRookMovedBefore === false && castledBefore === false)
                        {
                            positionsMatch = false;
                            break;
                        }
                        
                    }
                    if(moves[i][colorMovesKey].key[0] === "a" && moves[i][colorMovesKey].notation[0] === "R" &&  i > adjustedMove)
                    {
                        if(kingMovedBefore === false && aRookMovedBefore === false && castledBefore === false)
                        {
                            positionsMatch = false;
                            break;
                        }
                    }

                }
                if(!positionsMatch)
                {
                    break;
                }
                if(currentPiecesObject[comparingPiece.color][comparingPiece.type])
                {
                    arrayOfKeys = Object.keys(currentPiecesObject[comparingPiece.color][comparingPiece.type]);
                    for(let i=0; i<arrayOfKeys.length; i++)
                    {
                        if(currentPiecesObject[comparingPiece.color][comparingPiece.type][arrayOfKeys[i]].loc === comparingPiece.loc)
                        {
                            matchingLocation = true;
                            break;
                        }
                    }
                    if(matchingLocation !== true)
                    {
                        positionsMatch = false;
                        break;
                    }
                }
            }




            else if(comparingPiece.type === "King")
            {
                let colorMovesKey;
                let castledBefore = false;
                let castledAfter  = false;
                let bothRooksMovedBefore = false;
                let aRookMovedBefore = false;
                let hRookMovedBefore = false;
                let kingMovedBefore = false;
                if(comparingPiece.color === "white")
                {
                    colorMovesKey = "w";
                }
                else
                {
                    colorMovesKey = "b";
                }
                //check if castled before
                for(let i=0; i<moves.length; i++)
                {
                    if(i+1 >= moves.length && colorMovesKey === "b" && moves[i].b.key === undefined)
                    {
                        break;
                    }
                    if(moves[i][colorMovesKey].notation === "O-O" || moves[i][colorMovesKey].notation === "O-O-O")
                    {
                        if(i > adjustedMove)
                        {
                            console.log('castled after')
                            positionsMatch = false;
                            castledAfter = true;
                            break;
                        }
                        else
                        {
                            castledBefore = true;
                        }
                    }
                    if(moves[i][colorMovesKey].key[0] === "a" && moves[i][colorMovesKey].notation[0] === "R" && i <= adjustedMove)
                    {
                        aRookMovedBefore = true;
                    }
                    if(moves[i][colorMovesKey].key[0] === "h" && moves[i][colorMovesKey].notation[0] === "R" && i <= adjustedMove)
                    {
                        hRookMovedBefore = true;
                    }
                    if(aRookMovedBefore === true && hRookMovedBefore === true)
                    {
                        bothRooksMovedBefore = true;
                    }
                    if(moves[i][colorMovesKey].notation[0] === "K" && i <= adjustedMove)
                    {
                        kingMovedBefore = true;
                    }
                    if(moves[i][colorMovesKey].notation[0] === "K" && i > adjustedMove && kingMovedBefore === false && bothRooksMovedBefore === false && castledBefore === false)
                    {
                        
                        console.log('king moved after');
                        console.log(comparingPiece.color);

                        positionsMatch = false;
                        break;
                    }
                }
                if(!positionsMatch)
                {
                    break;
                }
                if(currentPiecesObject[comparingPiece.color][comparingPiece.type][Object.keys(currentPiecesObject[comparingPiece.color][comparingPiece.type])[0]].loc !== comparingPiece.loc)
                {
                    console.log(currentPiecesObject[comparingPiece.color][comparingPiece.type][Object.keys(currentPiecesObject[comparingPiece.color][comparingPiece.type])[0]].loc)
                    console.log(comparingPiece.loc)
                    console.log('heres');
                    matchingLocation = false;
                    positionsMatch = false;
                    break;
                }
            }




            else
            {
                if(currentPiecesObject[comparingPiece.color][comparingPiece.type])
                {
                    arrayOfKeys = Object.keys(currentPiecesObject[comparingPiece.color][comparingPiece.type]);
                    for(let i=0; i<arrayOfKeys.length; i++)
                    {
                        if(currentPiecesObject[comparingPiece.color][comparingPiece.type][arrayOfKeys[i]].loc === comparingPiece.loc)
                        {
                            matchingLocation = true;
                            break;
                        }
                    }
                    if(matchingLocation !== true)
                    {
                        positionsMatch = false;
                        break;
                    }
                }
            }
            
        }
        console.log(positionsMatch ? 'positionsMatch' : 'positionsDontMatch');
        if(positionsMatch)
        {
            console.log("position " + i);
            matchingPositionsCount++;
            console.log(matchingPositionsCount);
        }
    }

    if(matchingPositionsCount >= 3)
    {
        return true;
    }
    
}

function checkForFiftyMovesStalemate(moves)
{
    let moveCount = 0;
    for(let i=moves.length - 1; i > -1 ; i--)
    {
        if(moves[i][Object.keys(moves[i])[0]].notation[0] === "P" || moves[i][Object.keys(moves[i])[0]].notation[1] === "X")
        {
            return false;
        }
        else if(moves[i][Object.keys(moves[i])[1]].notation !== undefined  && (moves[i][Object.keys(moves[i])[1]].notation[0] === "P" || moves[i][Object.keys(moves[i])[1]].notation[1] === "X"))
        {
            return false;
        }
        else
        {
            moveCount++;
        }

        if(moveCount >= 50)
        {
            return true;
        }
    }
}
export {checkForStalemate}
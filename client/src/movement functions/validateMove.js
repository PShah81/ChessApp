import {simulateMove} from './simulateMove.js';
import {checkForChecks} from './processMove.js';
import {leavingKingCheckedCheck} from './leavingKingCheckedCheck.js';
import {pawnMoveValidity} from './move validity functions/pawnMoveValidity.js';
import {bishopMoveValidity} from './move validity functions/bishopMoveValidity.js';
import {knightMoveValidity} from './move validity functions/knightMoveValidity.js';
import {rookMoveValidity} from './move validity functions/rookMoveValidity.js';
import {queenMoveValidity} from './move validity functions/queenMoveValidity.js';
import {kingMoveValidity} from './move validity functions/kingMoveValidity.js';
function validateMove(pieceType, pieceLocationStart, pieceLocationEnd, pieceColor,alphabetArray, turn, piecesInPlay, moves)
    {
        let typeOfMove;
        let pieceCaptured;
        let moveValid = true;
        let promotion = false;
        let objectOfVals;

        let differenceX;
        let differenceY;
        differenceX = alphabetArray.indexOf(pieceLocationEnd[0]) - alphabetArray.indexOf(pieceLocationStart[0])
        differenceY = parseInt(pieceLocationEnd[1])- parseInt(pieceLocationStart[1])
        
        
        if(pieceColor !== turn)
        {
            return false;
        }
        if(pieceLocationStart === pieceLocationEnd)
        {
            return false;
        }
        switch (pieceType) {
            case 'Pawn':
                objectOfVals = pawnMoveValidity(differenceX, differenceY, pieceLocationStart, pieceLocationEnd, pieceColor, piecesInPlay, moves);
                moveValid = objectOfVals.moveValid;
                typeOfMove = objectOfVals.typeOfMove;
                pieceCaptured = objectOfVals.pieceCaptured;
                promotion = objectOfVals.promotion;
                break;
            case 'Bishop':
                objectOfVals = bishopMoveValidity(differenceX, differenceY, pieceLocationStart, pieceLocationEnd, pieceColor, piecesInPlay, alphabetArray);
                moveValid = objectOfVals.moveValid;
                typeOfMove = objectOfVals.typeOfMove;
                pieceCaptured = objectOfVals.pieceCaptured;
                break;
            case "Knight":
                objectOfVals = knightMoveValidity(differenceX, differenceY, pieceLocationStart, pieceLocationEnd, pieceColor, piecesInPlay);
                moveValid = objectOfVals.moveValid;
                typeOfMove = objectOfVals.typeOfMove;
                pieceCaptured = objectOfVals.pieceCaptured;
                break;
            case 'Rook':
                objectOfVals = rookMoveValidity(differenceX, differenceY, pieceLocationStart, pieceLocationEnd, pieceColor, piecesInPlay, alphabetArray);
                moveValid = objectOfVals.moveValid;
                typeOfMove = objectOfVals.typeOfMove;
                pieceCaptured = objectOfVals.pieceCaptured;
                break;
            case 'Queen':
                objectOfVals = queenMoveValidity(differenceX, differenceY, pieceLocationStart, pieceLocationEnd, pieceColor, piecesInPlay, alphabetArray);
                moveValid = objectOfVals.moveValid;
                typeOfMove = objectOfVals.typeOfMove;
                pieceCaptured = objectOfVals.pieceCaptured;
                break;
            case 'King':
                objectOfVals = kingMoveValidity(differenceX, differenceY, pieceLocationStart, pieceLocationEnd, pieceColor, piecesInPlay, moves, alphabetArray);
                moveValid = objectOfVals.moveValid;
                typeOfMove = objectOfVals.typeOfMove;
                pieceCaptured = objectOfVals.pieceCaptured;
                break;
            default:
                break;
        }
        if(moveValid)
        {
            if(leavingKingCheckedCheck(typeOfMove, piecesInPlay, pieceType, pieceLocationEnd, pieceLocationStart, pieceCaptured, checkForChecks, simulateMove, alphabetArray, turn, promotion))
            {
                moveValid = false;
            }
        }
        return {moveValid: moveValid, typeOfMove: typeOfMove, pieceCaptured: pieceCaptured, promotion: promotion}
    }


export {validateMove}
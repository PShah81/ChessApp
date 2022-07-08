    import { checkForCheckmate } from './checkForCheckmate.js';
    import {simulateMove} from './simulateMove.js';
    function processMove(pieceType, pieceLocationStart, pieceLocationEnd, pieceCaptured, typeOfMove, alphabetArray, turn, piecesInPlay, moves, setTurn, setMoves, setPiecesInPlay, promotion)
    {
        //still have to check for stalemate
        //still have to check for checkmate
        let notation = notate(pieceType, pieceLocationEnd, typeOfMove);
        let pieceKey;
        let piece;
        for(let i=0; i<piecesInPlay.length; i++)
        {
            piece = piecesInPlay[i];
            if(pieceType === piece.type && pieceLocationStart === piece.loc)
            {
                pieceKey = piece.key;
            }
        }
        let king;
        //this time checking if a check is being given
        for(let i=0; i< piecesInPlay.length; i++)
        {
            if(piecesInPlay[i].type === "King" && piecesInPlay[i].color !== turn)
            {
                    king = piecesInPlay[i];
            }
        }
        let newPiecesInPlay = simulateMove(typeOfMove,piecesInPlay,pieceType,pieceLocationEnd,pieceLocationStart, pieceCaptured, promotion, alphabetArray);
        setPiecesInPlay(newPiecesInPlay);
        let checkArr = checkForChecks(newPiecesInPlay, king, alphabetArray);
        if(promotion)
        {
            notation += "=Q"
        }
        else if(checkArr[0])
        {
            // checkForCheckmate(checkArr[2], blackKing, whiteKing, piecesInPlay, alphabetArray, turn, moves)
            notation += '+';
        }

        if(turn === "white")
        {
            setTurn("black");
            let newMovesArr = [];
            for(let i=0; i<moves.length; i++)
            {
                newMovesArr.push(moves[i])
            }
            newMovesArr.push({w: {notation: notation, key: pieceKey}, b: {}})
            setMoves(newMovesArr)
        }
        else
        {
            setTurn("white");
            let newMovesArr = [];
            for(let i=0; i<moves.length; i++)
            {
                if(i+1 === moves.length)
                {
                    newMovesArr.push({...moves[i], b: {notation: notation, key: pieceKey}})
                }
                else
                {
                    newMovesArr.push(moves[i])
                }
                
            }
            setMoves(newMovesArr)
        }
        console.log(moves)
        
    }
    function checkForChecks(piecesInPlay, king, alphabetArray)
    {
        //MAKE SURE PIECESINPLAY UPDATES WITH MOVE
        //start with black king


        if(king.color === "black")
        {
            let blackKingFile = king.loc[0];
            let blackKingRank = king.loc[1];
            let downDistanceBlack = 8 - parseInt(blackKingRank);
            let upDistanceBlack = parseInt(blackKingRank) - 1;
            let leftDistanceBlack = alphabetArray.indexOf(blackKingFile) ;
            let rightDistanceBlack = 7 - alphabetArray.indexOf(blackKingFile);
            let blackKingCheck = false;
            let blackCheckArr = [];
            let blackPieceChecking;


            blackCheckArr.push(checkVerticalForChecks("down", "black", downDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray))
            blackCheckArr.push(checkVerticalForChecks("up", "black", upDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray))
            blackCheckArr.push(checkHorizontalForChecks("right", "black", rightDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray))
            blackCheckArr.push(checkHorizontalForChecks("left", "black", leftDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray))
            blackCheckArr.push(checkDiagonalsForChecks("up", "right", "black", (upDistanceBlack > rightDistanceBlack)? rightDistanceBlack : upDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray))
            blackCheckArr.push(checkDiagonalsForChecks("down", "right", "black", (downDistanceBlack > rightDistanceBlack)? rightDistanceBlack : downDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray))
            blackCheckArr.push(checkDiagonalsForChecks("up", "left", "black", (upDistanceBlack > leftDistanceBlack)? leftDistanceBlack: upDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray))
            blackCheckArr.push(checkDiagonalsForChecks("down", "left", "black", (downDistanceBlack > leftDistanceBlack)? leftDistanceBlack: downDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray))
            blackCheckArr.push(checkKnightForChecks("black", blackKingFile, blackKingRank, piecesInPlay, alphabetArray))

            for(let i=0; i<blackCheckArr.length; i++)
            {
                if(blackCheckArr[i].check === true)
                {
                    blackKingCheck = true;
                    blackPieceChecking = blackCheckArr[i].pieceChecking;
                }
            }
            return [blackKingCheck, blackPieceChecking];
        }
        
        if(king.color === "white")
        {
            let whiteKingFile = king.loc[0];
            let whiteKingRank = king.loc[1];
            let downDistanceWhite = parseInt(whiteKingRank) - 1;
            let upDistanceWhite = 8 - parseInt(whiteKingRank);
            let leftDistanceWhite = 7 - alphabetArray.indexOf(whiteKingFile);
            let rightDistanceWhite = alphabetArray.indexOf(whiteKingFile);
            let whiteKingCheck = false;
            let whiteCheckArr = [];
            let whitePieceChecking;


            whiteCheckArr.push(checkVerticalForChecks("down", "white", downDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray))
            whiteCheckArr.push(checkVerticalForChecks("up", "white", upDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray))
            whiteCheckArr.push(checkHorizontalForChecks("right", "white", rightDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray))
            whiteCheckArr.push(checkHorizontalForChecks("left", "white", leftDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray))
            whiteCheckArr.push(checkDiagonalsForChecks("up", "right", "white", (upDistanceWhite > rightDistanceWhite)? rightDistanceWhite : upDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray))
            whiteCheckArr.push(checkDiagonalsForChecks("down", "right", "white", (downDistanceWhite > rightDistanceWhite)? rightDistanceWhite : downDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray))
            whiteCheckArr.push(checkDiagonalsForChecks("up", "left", "white", (upDistanceWhite > leftDistanceWhite)? leftDistanceWhite: upDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray))
            whiteCheckArr.push(checkDiagonalsForChecks("down", "left", "white", (downDistanceWhite > leftDistanceWhite)? leftDistanceWhite: downDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray))
            whiteCheckArr.push(checkKnightForChecks("white", whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray))
            
            for(let i=0; i<whiteCheckArr.length; i++)
            {
                if(whiteCheckArr[i].check === true)
                {
                    whiteKingCheck = true;
                    whitePieceChecking = whiteCheckArr[i].pieceChecking;
                }
            }
            return [whiteKingCheck, whitePieceChecking];
        }
    }
    function checkVerticalForChecks(direction, kingColor, squaresToCheck, kingFile, kingRank, piecesInPlay, alphabetArray)
    {
        let multiplier;
        let getOutOfLoop = false;
        let kingCheck = false;
        let stringLocation;
        let pieceChecking;
        if(direction === "up")
        {
            if(kingColor === "black")
            {
                multiplier = -1;
            }
            else
            {
                multiplier = 1;
            }
        }
        else if(direction === "down")
        {
            if(kingColor === "black")
            {
                multiplier = 1;
            }
            else
            {
                multiplier = -1;
            }
        }
        for(let i=1; i<squaresToCheck+1; i++)
        {
            stringLocation = kingFile + (parseInt(kingRank) + multiplier*i);
            for(let j=0; j<piecesInPlay.length; j++)
            {
                if(piecesInPlay[j].loc === stringLocation)
                {
                    if(piecesInPlay[j].color === kingColor)
                    {
                        getOutOfLoop = true;
                        break;
                    }
                    else if(piecesInPlay[j].type === "Rook" || piecesInPlay[j].type === "Queen")
                    {
                        pieceChecking = piecesInPlay[j]
                        kingCheck = true;
                        getOutOfLoop = true;
                        break;
                    }
                    else
                    {
                        getOutOfLoop = true;
                        break;
                    }
                }
            }
            if(getOutOfLoop)
            {
                getOutOfLoop = false;
                break;
            }
        }
        return {check: kingCheck, pieceChecking: pieceChecking};
    }
    function checkHorizontalForChecks(direction, kingColor, squaresToCheck, kingFile, kingRank, piecesInPlay, alphabetArray)
    {
        let multiplier;
        let getOutOfLoop = false;
        let kingCheck = false;
        let stringLocation;
        let pieceChecking;
        if(direction === "right")
        {
            if(kingColor === "black")
            {
                multiplier = 1;
            }
            else
            {
                multiplier = -1;
            }
        }
        else if(direction === "left")
        {
            if(kingColor === "black")
            {
                multiplier = -1;
            }
            else
            {
                multiplier = 1;
            }
        }
        for(let i=1; i<squaresToCheck+1; i++)
        {
            stringLocation = alphabetArray[alphabetArray.indexOf(kingFile) + multiplier*i] + kingRank;
            for(let j=0; j<piecesInPlay.length; j++)
            {
                if(piecesInPlay[j].loc === stringLocation)
                {
                    if(piecesInPlay[j].color === kingColor)
                    {
                        getOutOfLoop = true;
                        break;
                    }
                    else if(piecesInPlay[j].type === "Rook" || piecesInPlay[j].type === "Queen")
                    {
                        pieceChecking = piecesInPlay[j]
                        kingCheck = true;
                        getOutOfLoop = true;
                        break;
                    }
                    else
                    {
                        getOutOfLoop = true;
                        break;
                    }
                }
            }
            if(getOutOfLoop)
            {
                getOutOfLoop = false;
                break;
            }
        }
        return {checK: kingCheck, pieceChecking: pieceChecking};
    }
    function checkDiagonalsForChecks(directionY, directionX, kingColor, squaresToCheck, kingFile, kingRank, piecesInPlay, alphabetArray)
    {
        let stringLocation;
        let xMultiplier;
        let yMultiplier;
        let getOutOfLoop;
        let kingCheck;
        let pieceChecking;
        if(directionX === "right")
        {
            if(kingColor === "black")
            {
                xMultiplier = 1;
            }
            else
            {
                xMultiplier = -1;
            }
        }
        else if(directionX === "left")
        {
            if(kingColor === "black")
            {
                xMultiplier = -1;
            }
            else
            {
                xMultiplier = 1;
            }
        }
        if(directionY === "up")
        {
            if(kingColor === "black")
            {
                yMultiplier = -1;
            }
            else
            {
                yMultiplier = 1;
            }
        }
        else if(directionY === "down")
        {
            if(kingColor === "black")
            {
                yMultiplier = 1;
            }
            else
            {
                yMultiplier = -1;
            }
        }
        for(let i=1; i<squaresToCheck+1; i++)
        {
            stringLocation = alphabetArray[alphabetArray.indexOf(kingFile) + xMultiplier*i] + (parseInt(kingRank) + yMultiplier*i);
            for(let j=0; j<piecesInPlay.length; j++)
            {
                if(piecesInPlay[j].loc === stringLocation)
                {
                    if(piecesInPlay[j].color === kingColor)
                    {
                        getOutOfLoop = true;
                        break;
                    }
                    else if(piecesInPlay[j].type === "Pawn" && i === 1)
                    {
                        pieceChecking = piecesInPlay[j]
                        kingCheck = true;
                        getOutOfLoop = true;
                        break;
                    }
                    else if(piecesInPlay[j].type === "Bishop" || piecesInPlay[j].type === "Queen")
                    {
                        pieceChecking = piecesInPlay[j]
                        kingCheck = true;
                        getOutOfLoop = true;
                        break;
                    }
                    else
                    {
                        getOutOfLoop = true;
                        break;
                    }
                }
            }
            if(getOutOfLoop)
            {
                getOutOfLoop = false;
                break;
            }
        }
        return {check: kingCheck, pieceChecking: pieceChecking};
        
    }
    function checkKnightForChecks(kingColor, kingFile, kingRank, piecesInPlay, alphabetArray)
    {
        let distanceX = -1
        let distanceY = -2;
        let kingCheck = false;
        let getOutOfLoop = false;
        let stringLocation;
        let pieceChecking;

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
            stringLocation = alphabetArray[alphabetArray.indexOf(kingFile) + distanceX] + (parseInt(kingRank) + distanceY);
            for(let j=0; j<piecesInPlay.length; j++)
            {
                if(piecesInPlay[j].loc === stringLocation)
                {
                    if(piecesInPlay[j].type === "Knight" && piecesInPlay[j].color !== kingColor)
                    {
                        pieceChecking = "Knight";
                        kingCheck = true;
                        getOutOfLoop = true;
                        break;
                    }
                }
            }
            if(getOutOfLoop)
            {
                break;
            }
        }
        return {check: kingCheck, pieceChecking: pieceChecking};
    }
    function notate(pieceType, pieceLocationEnd, typeOfMove)
    {
        let notationObject = {Pawn: "P", Bishop: "B", Knight: "N", Queen: "Q", King: "K", Rook: "R"}
        let notation = "";
        notation += notationObject[pieceType] + (typeOfMove === "captureMove" ? "X" : "") + pieceLocationEnd
        return notation;
    }

    export {processMove, notate,checkForChecks}
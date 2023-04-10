    import { checkForCheckmate } from './checkForCheckmate.js';
import { checkForStalemate } from './checkForStalemate.js';
    import {simulateMove} from './simulateMove.js';
    function processMove(pieceType, pieceLocationStart, pieceLocationEnd, pieceCaptured, typeOfMove, alphabetArray, turn, piecesInPlay, moves, setTurn, setMoves, setPiecesInPlay, promotion, listOfPositions, setListOfPositions, setGameOver)
    {
        //still have to check for stalemate
        //still have to check for checkmate
        let notation = notate(pieceType, pieceLocationEnd, typeOfMove);
        let pieceKey;
        let piece;
        let checkmate = false;
        let stalemate = false;
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
        let positionsArr = listOfPositions.map((pos)=>{
            return pos
        });
        positionsArr.push(newPiecesInPlay);
        setListOfPositions(positionsArr);

        let checkArr = checkForChecks(newPiecesInPlay, king, alphabetArray);
        if(promotion)
        {
            notation += "=Q"
        }
        if(typeOfMove === "kingsideCastle")
        {
            notation = "O-O";
        }
        if(typeOfMove === "queensideCastle")
        {
            notation = "O-O-O";
        }
        if(checkArr[0])
        {
            checkmate = checkForCheckmate(newPiecesInPlay, alphabetArray, turn, moves);
            if(checkmate)
            {
                notation += "#";
                setGameOver(true);
            }
            else
            {
                notation += '+';
            }   
        }
        if(!checkmate)
        {
            stalemate = checkForStalemate(piecesInPlay, alphabetArray, turn, moves, positionsArr);
            if(stalemate)
            {
                setGameOver(true);
            }
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

            let kingFile = king.loc[0];
            let kingRank = king.loc[1];
            let kingColor = king.color
            let downDistance = 8 - parseInt(kingRank);
            let upDistance = parseInt(kingRank) - 1;
            let leftDistance = alphabetArray.indexOf(kingFile);
            let rightDistance = 7 - alphabetArray.indexOf(kingFile);
            let kingCheck = false;
            let checkArr = [];
            let pieceChecking;


            checkArr.push(checkVerticalForChecks("down", kingColor, downDistance, kingFile, kingRank, piecesInPlay, alphabetArray))
            checkArr.push(checkVerticalForChecks("up", kingColor, upDistance, kingFile, kingRank, piecesInPlay, alphabetArray))
            checkArr.push(checkHorizontalForChecks("right", kingColor, rightDistance, kingFile, kingRank, piecesInPlay, alphabetArray))
            checkArr.push(checkHorizontalForChecks("left", kingColor, leftDistance, kingFile, kingRank, piecesInPlay, alphabetArray))
            checkArr.push(checkDiagonalsForChecks("up", "right", kingColor, (upDistance > rightDistance)? rightDistance : upDistance, kingFile, kingRank, piecesInPlay, alphabetArray))
            checkArr.push(checkDiagonalsForChecks("down", "right", kingColor, (downDistance > rightDistance)? rightDistance : downDistance, kingFile, kingRank, piecesInPlay, alphabetArray))
            checkArr.push(checkDiagonalsForChecks("up", "left", kingColor, (upDistance > leftDistance)? leftDistance: upDistance, kingFile, kingRank, piecesInPlay, alphabetArray))
            checkArr.push(checkDiagonalsForChecks("down", "left", kingColor, (downDistance > leftDistance)? leftDistance: downDistance, kingFile, kingRank, piecesInPlay, alphabetArray))
            checkArr.push(checkKnightForChecks(kingColor, kingFile, kingRank, piecesInPlay, alphabetArray))

            for(let i=0; i<checkArr.length; i++)
            {
                if(checkArr[i].check === true)
                {
                    kingCheck = true;
                    pieceChecking = checkArr[i].pieceChecking;
                }
            }

            return [kingCheck, pieceChecking]
            
    }
    function checkVerticalForChecks(direction, kingColor, squaresToCheck, kingFile, kingRank, piecesInPlay, alphabetArray)
    {
        let multiplier = 1;
        let getOutOfLoop = false;
        let kingCheck = false;
        let stringLocation;
        let pieceChecking;
        if(direction === "up")
        {
            multiplier = -1
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
        let multiplier = 1;
        let getOutOfLoop = false;
        let kingCheck = false;
        let stringLocation;
        let pieceChecking;
        if(direction === "left")
        {
            multiplier = -1;
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
        return {check: kingCheck, pieceChecking: pieceChecking};
    }
    function checkDiagonalsForChecks(directionY, directionX, kingColor, squaresToCheck, kingFile, kingRank, piecesInPlay, alphabetArray)
    {
        let stringLocation;
        let xMultiplier = 1;
        let yMultiplier = 1;
        let getOutOfLoop;
        let kingCheck;
        let pieceChecking;
        if(directionX === "left")
        {
            xMultiplier = -1;
        }
        if(directionY === "up")
        {
            yMultiplier = -1;
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
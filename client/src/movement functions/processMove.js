    function processMove(pieceType, pieceLocationStart, pieceLocationEnd, pieceCaptured, typeOfMove, alphabetArray, turn, piecesInPlay, moves, setTurn, setMoves, setPiecesInPlay)
    {
        //still have to check for stalemate
        //still have to check for checkmate
        let notation = notate(pieceType, pieceLocationEnd, typeOfMove);
        console.log(notation);
        let blackKing;
        let whiteKing;
        let newPiecesInPlay = [];
        for(let i=0; i<piecesInPlay.length; i++)
        {
            if(piecesInPlay[i].type === "King")
            {
                if(piecesInPlay[i].color === "black")
                {
                    blackKing = piecesInPlay[i];
                }
                else
                {
                    whiteKing = piecesInPlay[i];
                }
            }
        }
        if(typeOfMove === "captureMove")
        {
            let piece;
            for(let i=0; i< piecesInPlay.length; i++)
            {
                piece = piecesInPlay[i];
                if(pieceType === piece.type && pieceLocationStart === piece.loc)
                {
                    newPiecesInPlay.push({...piece, loc: pieceLocationEnd})
                }
                else if(pieceCaptured.type === piece.type && pieceCaptured.loc === piece.loc && pieceCaptured.key === piece.key)
                {
                    
                }
                else
                {
                    newPiecesInPlay.push({...piece})
                }
            }
        }
        else if(typeOfMove === "capturelessMove")
        {
            newPiecesInPlay = piecesInPlay.map((piece)=>{
                if(pieceType === piece.type && pieceLocationStart === piece.loc)
                {
                    return {...piece, loc: pieceLocationEnd}
                }
                return {...piece}
            })
        }
        setPiecesInPlay(newPiecesInPlay);
        let checkArr = checkForChecks(newPiecesInPlay,blackKing, whiteKing, alphabetArray);
        if(checkArr[0] && turn === "white")
        {
            console.log('error')
        }
        else if(checkArr[0] && turn === "black")
        {
            notation += '+';
        }
        else if(checkArr[1] && turn === "white")
        {
            notation += '+';
        }
        else if(checkArr[1] && turn === "black")
        {
            console.log('error');
        }

        if(turn === "white")
        {
            setTurn("black");
            let newMovesArr = [];
            for(let i=0; i<moves.length; i++)
            {
                newMovesArr.push(moves[i])
            }
            newMovesArr.push({w: notation, b: ""})
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
                    console.log({...moves[i], b: notation})
                    newMovesArr.push({...moves[i], b: notation})
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
    function checkForChecks(piecesInPlay, blackKing, whiteKing, alphabetArray)
    {
        //MAKE SURE PIECESINPLAY UPDATES WITH MOVE
        //start with black king

        let blackKingFile = blackKing.loc[0];
        let blackKingRank = blackKing.loc[1];
        let downDistanceBlack = 8 - parseInt(blackKingRank);
        let upDistanceBlack = parseInt(blackKingRank) - 1;
        let leftDistanceBlack = alphabetArray.indexOf(blackKingFile) ;
        let rightDistanceBlack = 7 - alphabetArray.indexOf(blackKingFile);
        let blackKingCheck = false;

        let whiteKingFile = whiteKing.loc[0];
        let whiteKingRank = whiteKing.loc[1];
        let downDistanceWhite = parseInt(whiteKingRank) - 1;
        let upDistanceWhite = 8 - parseInt(whiteKingRank);
        let leftDistanceWhite = 7 - alphabetArray.indexOf(whiteKingFile);
        let rightDistanceWhite = alphabetArray.indexOf(whiteKingFile);
        let whiteKingCheck = false;
        
        if(checkVerticalForChecks("down", "black", downDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray)|| 
        checkVerticalForChecks("up", "black", upDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray)||
        checkHorizontalForChecks("right", "black", rightDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray)||
        checkHorizontalForChecks("left", "black", leftDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray)||
        checkDiagonalsForChecks("up", "right", "black", (upDistanceBlack > rightDistanceBlack)? rightDistanceBlack : upDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray)||
        checkDiagonalsForChecks("down", "right", "black", (downDistanceBlack > rightDistanceBlack)? rightDistanceBlack : downDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray)||
        checkDiagonalsForChecks("up", "left", "black", (upDistanceBlack > leftDistanceBlack)? leftDistanceBlack: upDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray)||
        checkDiagonalsForChecks("down", "left", "black", (downDistanceBlack > leftDistanceBlack)? leftDistanceBlack: downDistanceBlack, blackKingFile, blackKingRank, piecesInPlay, alphabetArray)||
        checkKnightForChecks("black", blackKingFile, blackKingRank, piecesInPlay, alphabetArray))
        {
            blackKingCheck = true;
        }
        if(checkVerticalForChecks("down", "white", downDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray)|| 
        checkVerticalForChecks("up", "white", upDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray)||
        checkHorizontalForChecks("right", "white", rightDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray)||
        checkHorizontalForChecks("left", "white", leftDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray)||
        checkDiagonalsForChecks("up", "right", "white", (upDistanceWhite > rightDistanceWhite)? rightDistanceWhite : upDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray)||
        checkDiagonalsForChecks("down", "right", "white", (downDistanceWhite > rightDistanceWhite)? rightDistanceWhite : downDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray)||
        checkDiagonalsForChecks("up", "left", "white", (upDistanceWhite > leftDistanceWhite)? leftDistanceWhite: upDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray)||
        checkDiagonalsForChecks("down", "left", "white", (downDistanceWhite > leftDistanceWhite)? leftDistanceWhite: downDistanceWhite, whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray)||
        checkKnightForChecks("white", whiteKingFile, whiteKingRank, piecesInPlay, alphabetArray))
        {
            whiteKingCheck = true;
        }


        

        return [whiteKingCheck,blackKingCheck];
        //check if a king is being checked
    }
    function checkVerticalForChecks(direction, kingColor, squaresToCheck, kingFile, kingRank, piecesInPlay, alphabetArray)
    {
        let multiplier;
        let getOutOfLoop = false;
        let kingCheck = false;
        let stringLocation;
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
                        console.log('hey')
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
        return kingCheck;
    }
    function checkHorizontalForChecks(direction, kingColor, squaresToCheck, kingFile, kingRank, piecesInPlay, alphabetArray)
    {
        let multiplier;
        let getOutOfLoop = false;
        let kingCheck = false;
        let stringLocation;
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
                        console.log('hey')
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
        return kingCheck;
    }
    function checkDiagonalsForChecks(directionY, directionX, kingColor, squaresToCheck, kingFile, kingRank, piecesInPlay, alphabetArray)
    {
        let stringLocation;
        let xMultiplier;
        let yMultiplier;
        let getOutOfLoop;
        let kingCheck;
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
                        kingCheck = true;
                        getOutOfLoop = true;
                        break;
                    }
                    else if(piecesInPlay[j].type === "Bishop" || piecesInPlay[j].type === "Queen")
                    {
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
        return kingCheck;
        
    }
    function checkKnightForChecks(kingColor, kingFile, kingRank, piecesInPlay, alphabetArray)
    {
        let distanceX = -1
        let distanceY = -2;
        let kingCheck = false;
        let getOutOfLoop = false;
        let stringLocation;

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
        return kingCheck;
    }
    function notate(pieceType, pieceLocationEnd, typeOfMove)
    {
        let notationObject = {Pawn: "P", Bishop: "B", Knight: "N", Queen: "Q", King: "K", Rook: "R"}
        let notation = "";
        notation += notationObject[pieceType] + (typeOfMove === "captureMove" ? "X" : "") + pieceLocationEnd
        return notation;
    }

    export {processMove, notate,checkForChecks}
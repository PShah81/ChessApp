function processMove(pieceType, pieceLocationStart, pieceLocationEnd, pieceCaptured, typeOfMove, alphabetArray, turn, piecesInPlay, moves, setTurn, setMoves, setPiecesInPlay)
    {
        //still have to check for stalemate
        let notation = notate(pieceType, pieceLocationEnd, typeOfMove);
        console.log(notation)
        if(checkForChecks() === "check")
        {
            notation += "+"
        }
        if(checkForChecks() === "checkmate")
        {
            notation += "#"
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
        if(typeOfMove === "captureMove")
        {
            let newPiecesInPlay = [];
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
            setPiecesInPlay(newPiecesInPlay)
        }
        else if(typeOfMove === "capturelessMove")
        {
            setPiecesInPlay(piecesInPlay.map((piece)=>{
                if(pieceType === piece.type && pieceLocationStart === piece.loc)
                {
                    return {...piece, loc: pieceLocationEnd}
                }
                return {...piece}
            }))
        }
    }

    function checkForChecks()
    {
        return "";
        //check if a king is being checked
    }
    function notate(pieceType, pieceLocationEnd, typeOfMove)
    {
        let notationObject = {Pawn: "P", Bishop: "B", Knight: "N", Queen: "Q", King: "K", Rook: "R"}
        let notation = "";
        notation += notationObject[pieceType] + (typeOfMove === "captureMove" ? "X" : "") + pieceLocationEnd
        return notation;
    }

    export {processMove, notate,checkForChecks}
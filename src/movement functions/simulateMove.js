function simulateMove(typeOfMove, piecesInPlay, pieceType, pieceLocationEnd, pieceLocationStart, pieceCaptured, promotion, alphabetArray)
{
    let newPiecesInPlay = [];
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
    else if(typeOfMove === "kingsideCastle")
    {
        newPiecesInPlay = piecesInPlay.map((piece)=>{
            if(pieceType === piece.type && pieceLocationStart === piece.loc)
            {
                return {...piece, loc: pieceLocationEnd}
            }
            if(piece.key === "h"+pieceLocationStart[1]+"Rook")
            {
                return {...piece, loc: alphabetArray[alphabetArray.indexOf(piece.loc[0]) + 2] + piece.loc[1]}
            }
            return {...piece}
        })
    }
    else if(typeOfMove === "queensideCastle")
    {
        newPiecesInPlay = piecesInPlay.map((piece)=>{
            if(pieceType === piece.type && pieceLocationStart === piece.loc)
            {
                return {...piece, loc: pieceLocationEnd}
            }
            if(piece.key === "a"+pieceLocationStart[1]+"Rook")
            {
                return {...piece, loc: alphabetArray[alphabetArray.indexOf(piece.loc[0]) - 3] + piece.loc[1]}
            }
            return {...piece}
        })
    }

    if(promotion)
    {
        newPiecesInPlay = newPiecesInPlay.map((piece)=>{
            if(pieceType === piece.type && pieceLocationEnd === piece.loc)
            {
                return {...piece, type: 'Queen', key: 'promotedQueen' + piece.key}
            }
            return {...piece}
        })
    }
    return newPiecesInPlay
}
export {simulateMove}
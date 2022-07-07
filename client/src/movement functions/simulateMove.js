function simulateMove(typeOfMove, piecesInPlay, pieceType, pieceLocationEnd, pieceLocationStart, pieceCaptured, promotion)
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

    if(promotion)
    {
        let latestQueenKey;
        for(let i=0; i<newPiecesInPlay.length; i++)
        {
            if(newPiecesInPlay[i].type === "Queen")
            {
                if(latestQueenKey === undefined)
                {
                    latestQueenKey = newPiecesInPlay[i].key
                }
                if(newPiecesInPlay[i].key > latestQueenKey)
                {
                    latestQueenKey = newPiecesInPlay[i].key
                }
            }
        }
        newPiecesInPlay = newPiecesInPlay.map((piece)=>{
            if(pieceType === piece.type && pieceLocationEnd === piece.loc)
            {
                return {...piece, type: 'Queen', key: 'Queen' + (parseInt(latestQueenKey[latestQueenKey.length - 1]) + 1)}
            }
            return {...piece}
        })
    }
    return newPiecesInPlay
}
export {simulateMove}
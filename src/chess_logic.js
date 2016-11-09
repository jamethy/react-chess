
export function getAvailableMoves(teamwhite, teamblack, piece, isWhite) {

  if (piece == null || piece.position == null) {
    return [];
  }

  switch (piece.type.toUpperCase()) {
    case "PAWN":
      return getPawnMoves(teamwhite, teamblack, piece, isWhite);
    case "ROOK":
      return getRookMoves(teamwhite, teamblack, piece, isWhite);
    case "KNIGHT":
      return getKnightMoves(teamwhite, teamblack, piece, isWhite);
    case "BISHOP":
      return getBishopMoves(teamwhite, teamblack, piece, isWhite);
    case "QUEEN":
      return getQueenMoves(teamwhite, teamblack, piece, isWhite);
    case "KING":
      return getKingMoves(teamwhite, teamblack, piece, isWhite, false);
    default:
      return [];
  }
}

// don't call function within this file
export function getBoardPosition(i,j) {
  return ["a","b","c","d","e","f","g","h"][i] + (j+1);
}

var toColInt = function( colString ) {
  return colString.toLowerCase().codePointAt(0) - 'a'.codePointAt(0) + 1;
}

var toColString = function( colInt ) {
  return String.fromCharCode( colInt - 1 + 'a'.codePointAt(0) );
}

var isOnBoard = function( rowInt, colInt ) {
  return !(rowInt < 1 || rowInt > 8 || colInt < 1 || colInt > 8);
}


var hasPiece = function(pieces, rowInt, colInt) {
  for (var piece in pieces) {
    if (pieces[piece].position != null) {
      let pieceRow = parseInt(pieces[piece].position[1], 10);
      let pieceCol = toColInt(pieces[piece].position[0]);

      if (pieceRow === rowInt && pieceCol === colInt) {
        return true;
      }
    }
  }
  return false;
}

var hitPiece = function( rowInt, colInt, teamwhite, teamblack, isWhite, possibleMoves ) { 

  if (!isOnBoard(rowInt,colInt)) {
    return false;
  }

  // if blocked by team piece
  if ( hasPiece( (isWhite ? teamwhite : teamblack), rowInt, colInt ) ) {
    return true;
  }
  // if blocked by enemy piece
  else if ( hasPiece( (isWhite ? teamblack : teamwhite), rowInt, colInt ) ) {
    possibleMoves.push(toColString(colInt) + rowInt);
    return true;
  }
  else {
    possibleMoves.push(toColString(colInt) + rowInt);
    return false;
  }
}




export function getPawnMoves(teamwhite, teamblack, piece, isWhite) {

  let possibleMoves = [];

  if (piece.position == null) {
    return possibleMoves;
  }

  let forward = isWhite ? 1 : -1;
  let colInt = toColInt(piece.position[0]);
  let rowInt = parseInt(piece.position[1], 10);

  if (rowInt + forward > 0 && rowInt + forward < 9) {

    // one forward
    if (!hasPiece(teamwhite, rowInt+forward, colInt) && !hasPiece(teamblack, rowInt+forward, colInt)) {
      possibleMoves.push(toColString(colInt) + (rowInt+forward));

      // two forward
      if ((isWhite ? rowInt === 2 : rowInt === 7)) {
        if (!hasPiece(teamwhite, rowInt+2*forward, colInt) && !hasPiece(teamblack, rowInt+2*forward, colInt)) {
          possibleMoves.push(toColString(colInt) + (rowInt+2*forward));
        }
      }
    }

    // forward-left
    if (isOnBoard(rowInt, colInt)) {
      if ( hasPiece( (isWhite ? teamblack : teamwhite), rowInt+forward, colInt-1)) {
        possibleMoves.push(toColString(colInt-1) + (rowInt+forward));
      }
    }
    // forward-right
    if (isOnBoard(rowInt, colInt)) {
      if ( hasPiece( (isWhite ? teamblack : teamwhite), rowInt+forward, colInt+1)) {
        possibleMoves.push(toColString(colInt+1) + (rowInt+forward));
      }
    }

    // en passant.....
  }

  return possibleMoves;
}

export function getRookMoves(teamwhite, teamblack, piece, isWhite) {

  let possibleMoves = [];

  if (piece.position == null) {
    return possibleMoves;
  }

  let colInt = toColInt(piece.position[0]);
  let rowInt = parseInt(piece.position[1], 10);


  // iterate up
  for (let possibleRow = rowInt + 1; possibleRow <= 8; ++possibleRow) {
    if (hitPiece( possibleRow, colInt, teamwhite, teamblack, isWhite, possibleMoves) ) {
      break;
    }
  }
  // iterate down
  for (let possibleRow = rowInt - 1; possibleRow >= 1; --possibleRow) {
    if (hitPiece( possibleRow, colInt, teamwhite, teamblack, isWhite, possibleMoves) ) {
      break;
    }
  }
  // iterate left
  for (let possibleCol = colInt + 1; possibleCol <= 8; ++possibleCol) {
    if (hitPiece( rowInt, possibleCol, teamwhite, teamblack, isWhite, possibleMoves) ) {
      break;
    }
  }
  // iterate right
  for (let possibleCol = colInt - 1; possibleCol >= 1; --possibleCol) {
    if (hitPiece( rowInt, possibleCol, teamwhite, teamblack, isWhite, possibleMoves) ) {
      break;
    }
  }

  return possibleMoves;
}

export function getBishopMoves(teamwhite, teamblack, piece, isWhite) {

  let possibleMoves = [];

  if (piece.position == null) {
    return possibleMoves;
  }

  let colInt = toColInt(piece.position[0]);
  let rowInt = parseInt(piece.position[1], 10);

  // iterate up-left
  let possibleRow = rowInt + 1;
  let possibleCol = colInt - 1;
  while(isOnBoard(possibleRow, possibleCol)) {
    if (hitPiece( possibleRow, possibleCol, teamwhite, teamblack, isWhite, possibleMoves) ) {
      break;
    }
    possibleRow += 1;
    possibleCol -= 1;
  }
   
  // iterate down-left
  possibleRow = rowInt - 1;
  possibleCol = colInt - 1;
  while(isOnBoard(possibleRow, possibleCol)) {
    if (hitPiece( possibleRow, possibleCol, teamwhite, teamblack, isWhite, possibleMoves) ) {
      break;
    }
    possibleRow -= 1;
    possibleCol -= 1;
  }
   
  // iterate down-right
  possibleRow = rowInt - 1;
  possibleCol = colInt + 1;
  while(isOnBoard(possibleRow, possibleCol)) {
    if (hitPiece( possibleRow, possibleCol, teamwhite, teamblack, isWhite, possibleMoves) ) {
      break;
    }
    possibleRow -= 1;
    possibleCol += 1;
  }
   
  // iterate up-right
  possibleRow = rowInt + 1;
  possibleCol = colInt + 1;
  while(isOnBoard(possibleRow, possibleCol)) {
    if (hitPiece( possibleRow, possibleCol, teamwhite, teamblack, isWhite, possibleMoves) ) {
      break;
    }
    possibleRow += 1;
    possibleCol += 1;
  }

  return possibleMoves;
}

export function getQueenMoves(teamwhite, teamblack, piece, isWhite) {

  if (piece.position == null) {
    return [];
  }

  return getBishopMoves(teamwhite, teamblack, piece, isWhite)
    .concat( getRookMoves(teamwhite, teamblack, piece, isWhite) );

}
  
export function getKingMoves(teamwhite, teamblack, piece, isWhite, ignoreSafe) {

  let possibleMoves = [];

  if (piece.position == null) {
    return possibleMoves;
  }

  let colInt = toColInt(piece.position[0]);
  let rowInt = parseInt(piece.position[1], 10);

  const relativeMoves = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[-1,1],[1,1]];

  for (let move in relativeMoves) {
    if (move != null) {
      const newRow = rowInt + relativeMoves[move][0];
      const newCol = colInt + relativeMoves[move][1];

      if (!isOnBoard(newRow,newCol)) {
        continue;
      }
      // if blocked by team piece
      if ( hasPiece( (isWhite ? teamwhite : teamblack), newRow, newCol) ) {
        continue;
      }

      // pretend to move
      let isSafe = true;
      if (!ignoreSafe) {
        let kingteam = JSON.parse(JSON.stringify( isWhite ? teamwhite : teamblack ));
        let enemyteam = JSON.parse(JSON.stringify( isWhite ? teamblack : teamwhite ));
        const newPos = toColString(newCol) + newRow;

        Object.keys(kingteam).forEach((k) => {
          if (kingteam[k].id === piece.id) {
            kingteam[k].position = newPos;
          }
        });

        Object.keys(enemyteam).forEach((k) => {
          if (enemyteam[k].position === newPos) {
            enemyteam[k].position = null;
          }
        });

        isSafe = isKingInCheck(
          isWhite ? kingteam : enemyteam,
          isWhite ? enemyteam : kingteam,
          newPos, isWhite);
      }
      
      if (isSafe) {
        possibleMoves.push(toColString(newCol) + newRow);
      }
    }
  }

  return possibleMoves;
}

export function isKingInCheck(teamwhite, teamblack, kingPos, isWhite) {

  const enemyteam = isWhite ? teamblack : teamwhite;

  let isSafe = true;

  Object.keys(enemyteam).forEach((k) => {

    let enemyMoves = [];
    if (enemyteam[k].type.toUpperCase() === "KING") {
      enemyMoves = getKingMoves( teamwhite, teamblack, enemyteam[k], !isWhite, true);
    }
    else {
      enemyMoves = getAvailableMoves( teamwhite, teamblack, enemyteam[k], !isWhite);
    }
    for (const m in enemyMoves) {
      if (enemyMoves[m] === kingPos) {
        isSafe = false;
      }
    }
  });
  return isSafe;
}

export function getKnightMoves(teamwhite, teamblack, piece, isWhite) {

  let possibleMoves = [];

  if (piece.position == null) {
    return possibleMoves;
  }

  let colInt = toColInt(piece.position[0]);
  let rowInt = parseInt(piece.position[1], 10);

  hitPiece( rowInt+1, colInt+2 , teamwhite, teamblack, isWhite, possibleMoves);
  hitPiece( rowInt+2, colInt+1 , teamwhite, teamblack, isWhite, possibleMoves);
  hitPiece( rowInt+1, colInt-2 , teamwhite, teamblack, isWhite, possibleMoves);
  hitPiece( rowInt+2, colInt-1 , teamwhite, teamblack, isWhite, possibleMoves);

  hitPiece( rowInt-1, colInt+2 , teamwhite, teamblack, isWhite, possibleMoves);
  hitPiece( rowInt-2, colInt+1 , teamwhite, teamblack, isWhite, possibleMoves);
  hitPiece( rowInt-1, colInt-2 , teamwhite, teamblack, isWhite, possibleMoves);
  hitPiece( rowInt-2, colInt-1 , teamwhite, teamblack, isWhite, possibleMoves);

  return possibleMoves;
}


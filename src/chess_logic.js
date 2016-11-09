
export function getAvailableMoves(teamwhite, teamblack, piece, isWhite) {
  switch (type.toUpperCase()) {
    case "PAWN":
      return getPawnMoves(teamwhite, teamblack, piece, isWhite);
    case "ROOK":
      return getRookMoves(teamwhite, teamblack, piece, isWhite);
    default:
      return [];
  }
}

export function hasPiece(pieces, pos) {
  for (piece in pieces) {
    if (pos === pieces[piece].position) {
      return true;
    }
  }
  return false;
}


export function getPawnMoves(teamwhite, teamblack, piece, isWhite) {

  var possibleMoves = [];

  var forward = isWhite ? 1 : -1;
  var col = piece.position[0];
  var row = piece.position[1];
  var rowInt = parseInt(row);

  if (rowInt + forward > 0 && rowInt + forward < 9) {

    // one forward
    var oneForward = col + (rowInt + forward);
    if (!hasPiece(teamwhite, oneForward) && !hasPiece(teamblack, oneForward)) {
      possibleMoves.push(oneForward);

      // two forward
      if ((isWhite ? rowInt == 2 : rowInt == 7)) {
        var twoForward = col + (rowInt + 2*forward);
        if (!hasPiece(teamwhite, twoForward) && !hasPiece(teamblack, twoForward)) {
          possibleMoves.push(twoForward);
        }
      }
    }

    // forward-left
    if (col > 'a') {
      var forwardLeft = String.fromCharCode(col.codePointAt(0) - 1) + (rowInt + forward);
      if ( hasPiece( (isWhite ? teamblack : teamwhite), forwardLeft)) {
        possibleMoves.push(forwardLeft);
      }
    }
    // forward-right
    if (col < 'h') {
      var forwardRight = String.fromCharCode(col.codePointAt(0) + 1) + (rowInt + forward);
      if ( hasPiece( (isWhite ? teamblack : teamwhite), forwardRight)) {
        possibleMoves.push(forwardRight);
      }
    }

    // en passant.....
  }

}

export function testfunc() {
}

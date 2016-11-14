
export function isOnTeam(piece, team) {
  let thisTeam = false;
  Object.keys(team).forEach((k) => {
    if (team[k].id === piece.id) {
      thisTeam = true;
    }
  });
  return thisTeam;
}

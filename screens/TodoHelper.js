export function doFunStuff() {
  console.log("Fun stuff!");
}

export function sortByDone(a, b) {
  if (b.isdone) {
    return -1;
  }
  if (a.isdone) {
    return 1;
  }
  return 0;
}

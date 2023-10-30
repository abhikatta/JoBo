function timestampToDate(timeInSeconds) {
  const date = new Date(timeInSeconds * 1000)
    .toString()
    .split(" ")
    .splice(0, 5);
  return date.map((v, i) => {
    return v + " ";
  });
}
export { timestampToDate };

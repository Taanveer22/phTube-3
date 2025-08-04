let isVerified = true;
if (isVerified) {
  console.log("yes bro");
} else {
  console.log("no bro");
}
console.log(`${isVerified ? "yes" : "no"}`);

const getTimeString = (seconds) => {
  // console.log(seconds);
  let hours = parseInt(seconds / 3600);
  let remainingSeconds = seconds % 3600;
  let minutes = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  console.log(remainingSeconds);
  return `${hours} hours ${minutes} minutes ${remainingSeconds} seconds ago`;
};

console.log(getTimeString(7200));

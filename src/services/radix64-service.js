const ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

const CHAR_MAP = {};

ALPHABET.split("").forEach((ele, i) => {
  CHAR_MAP[ele] = i;
});

function int2radix64(num) {
  let chars = [];
  let q = num;
  while (q > 0) {
    let r = q % 64;
    chars.push(ALPHABET.charAt(r));
    q = parseInt(q / 64);
  }
  return chars.reverse().join("");
}

function radix64toint(str) {
  let chars = str.split("").reverse();
  let num = 0;
  for (let i = 0; i < chars.length; i++) {
    num += CHAR_MAP[chars[i]] * Math.pow(64, i);
  }
  return num;
}

module.exports = {
  int2radix64,
  radix64toint,
};
console.log(radix64toint("xdg_15"));
console.log(int2radix64("35656036421"));

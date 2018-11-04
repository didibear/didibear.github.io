
function generate(names, secret, notGood) {
  names = shuffle(names, hashCode(secret));

  // create a chain of names, the next one is the designed name of the current
  let chain = names.slice();
  
  do {
    // move the first to last
    chain.unshift(chain.pop());
  } while(notGood && notGood(chain));
 
  let maxNameLength = names.map(s => s.length).reduce(Math.max);
  chain = chain.map(s => s.padEnd(maxNameLength)).map(e => btoa(e));

  return names.map((e, i) => [e, chain[i]]);
}

///////////////
// Random 

function shuffle(array, seed) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random(seed) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

var globalSeed = 1;
const random = seed => {
  var x = Math.sin(seed + globalSeed++) * 10000;
  return x - Math.floor(x);
}
const resetRandom = () => globalSeed = 1;

const hashCode = s => charCodes(s).reduce((a, b) => { a = ((a<<5)-a) + b; return a & a}, 0);

//////////////
// Cypher

function crypt(input, key) {
  key = charCodes(key);

	var output = "";
	for (var i = 0, j = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		if (isUppercase(c)) {
			output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
			j++;
		} else if (isLowercase(c)) {
			output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
			j++;
		} else {
			output += input.charAt(i);
    }
	}
	return output;
}

function decrypt(input, key) {
  key = charCodes(key);
  console.log(key);
  for (var i = 0; i < key.length; i++){
    if (isUppercase(c)) {
			output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
      j++;
      key[i] = (26 - key[i]) % 26;
		} else if (isLowercase(c)) {
			output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
			j++;
    }
    key[i] = (26 - key[i]) % 26;
  }
  console.log(key);
  return crypt(input, toString(key));
}

const isUppercase = c => 65 <= c && c <= 90;
const isLowercase = c => 97 <= c && c <= 122;
const isLetter = c => isUppercase(c) || isLowercase(c);

const charCodes = string => Array.from(string).map(c => c.charCodeAt(0))
const toString = charCodes => charCodes.map(c => String.fromCharCode(c)).reduce(String.prototype.concat);


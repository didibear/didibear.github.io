
var names = ["Nikko", "Elodie", "Hugo", "Kevin", "Pierre", "Clemence", "Quentin", "Camille", "Joffrey", "Leonie", "Lucas", "Didi", "Mathieu", "Diane", "Manon"];

names = shuffle(names);
assos = names.slice()

assos.unshift(assos.pop());

while(not_good()){
  assos.unshift(assos.pop());
}
assos = assos.map(e => btoa(e));

var c = names.map(function(e, i) {
  return [e, assos[i]];
});
console.log(c);





function not_good(){
  var c = names.map(function(e, i) {
    return [e, assos[i]];
  });

  return c.includes(["Camille", "Lucas"]) || c.includes(["Lucas", "Camille"]);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

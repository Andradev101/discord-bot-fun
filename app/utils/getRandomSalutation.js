const salutations = ['Vai tomar no seu cu', 'Que tal você estudar', 'Morre logo', 'Já vai comer', 'Vai se foder'];

function getRandomSalutation() {
  let salutation = salutations[getRandomPosition(salutations)];
  return salutation;
}

function getRandomPosition(salutations) {
  let number = Math.floor(Math.random() * salutations.length);
  return number;
}

exports.getRandomSalutation = getRandomSalutation;
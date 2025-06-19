const player1 = {
  nome: "Mario",
  Velocidade: 4,
  Manobrabilidade: 3,
  Poder: 3,
  Pontos: 0,
};

const player2 = {
  nome: "Luigi",
  Velocidade: 3,
  Manobrabilidade: 4,
  Poder: 4,
  Pontos: 0,
};

const player3 = {
  nome: "Browser",
  Velocidade: 4,
  Manobrabilidade: 3,
  Poder: 3,
  Pontos: 0,
};

const player4 = {
  nome: "Yoshi",
  Velocidade: 3,
  Manobrabilidade: 4,
  Poder: 4,
  Pontos: 0,
};

const player5 = {
  nome: "Princes",
  Velocidade: 3,
  Manobrabilidade: 4,
  Poder: 4,
  Pontos: 0,
};

const player6 = {
  nome: "Donkey Kong",
  Velocidade: 3,
  Manobrabilidade: 4,
  Poder: 4,
  Pontos: 0,
};

async function logRollResult(characterName, block, diceResult, attribut) {
  console.log(
    `O ${characterName} rolou o 🎲 de ${block} ${diceResult} + ${attribut} = ${
      diceResult + attribut
    }`
  );
}

async function RollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRadonBlock() {
  let randon = Math.random();
  let result;

  switch (true) {
    case randon < 0.33:
      result = "Reta";
      break;
    case randon < 0.66:
      result = "Curva";
      break;
    default:
      result = "Confronto";
  }
  return result;
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Round : ${round}`);

    let block = await getRadonBlock();
    console.log(`Bloco = ${block}`);

    let diceResult1 = await RollDice();
    let diceResult2 = await RollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "Reta") {
      totalTestSkill1 = diceResult1 + character1.Velocidade;
      totalTestSkill2 = diceResult2 + character2.Velocidade;

      await logRollResult(
        character1.nome,
        "velocidade",
        diceResult1,
        character1.Velocidade
      );
      await logRollResult(
        character2.nome,
        "velocidade",
        diceResult2,
        character2.Velocidade
      );
    }
    if (block === "Curva") {
      totalTestSkill1 = diceResult1 + character1.Manobrabilidade;
      totalTestSkill2 = diceResult2 + character2.Manobrabilidade;

      await logRollResult(
        character1.nome,
        "manobrabilidade",
        diceResult1,
        character1.Manobrabilidade
      );
      await logRollResult(
        character2.nome,
        "manobrabilidade",
        diceResult2,
        character2.Manobrabilidade
      );
    }
    if (block === "Confronto") {
      let powerResult1 = diceResult1 + character1.Poder;
      let powerResult2 = diceResult2 + character2.Poder;
        
      await logRollResult(
        character1.nome,
        "confronto",
        diceResult1,
        character1.Poder
      );
      await logRollResult(
        character2.nome,
        "Confronto",
        diceResult2,
        character2.Poder
      );


      if(powerResult1 > powerResult2 && character2.Pontos > 0){
        console.log(`${character1.nome} venceu o combate! ${character2.nome} perdeu um ponto 🐢`)
        character2.Pontos--
      }

      if(powerResult2 > powerResult1 && character1.Pontos > 0){
        console.log(`${character2.nome} venceu o combate! ${character1.nome} perdeu um ponto 🐢`)
        character1.Pontos--
      }

      console.log(powerResult2 === powerResult1 ? "Confronto empatado, Nenhum jogador marcou ponto" : "")
    }

    if(totalTestSkill1 > totalTestSkill2){
        console.log(`${character1.nome} marcou um ponto`)
        character1.Pontos++
    } else if(totalTestSkill2 > totalTestSkill1){
        console.log(`${character2.nome} marcou um ponto`)
        character2.Pontos++
    }

  }
}

async function winnerGame(character1, character2) {
    console.log("Resultado da Partida:")
    console.log(`${character1.nome} : ${character1.Pontos} ponto(s)`)
    console.log(`${character2.nome} : ${character2.Pontos} ponto(s)`)

    if(character1.Pontos > character2.Pontos){
        console.log(`${character1.nome} venceu a corrida`)
    } else if(character2.Pontos > character1.Pontos){
        console.log(`${character2.nome} venceu a corrida`)
    } else {
        console.log("Fim da corrida, EMPATE")
    }
}

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando...\n`
  );

  await playRaceEngine(player1, player2);
  await winnerGame(player1, player2)
})();

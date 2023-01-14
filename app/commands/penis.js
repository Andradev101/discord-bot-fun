const { SlashCommandBuilder } = require('discord.js');

function getPenisSize() {
  return Math.floor(Math.random() * 20);
}

function drawPenis() {
  let size = getPenisSize();
  if(size < 1) {size = 1};

  let string = '';
  for(i = 0; i < size; i++) {
    string += '=';
  }
  return `8` + string + 'D';
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('penis')
    .setDescription('calculate your penis size'),
    async execute(interaction) {
      await interaction.reply(drawPenis());
    }
}
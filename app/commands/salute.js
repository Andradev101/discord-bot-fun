const { SlashCommandBuilder } = require('discord.js');
const { getRandomSalutation } = require('../utils/getRandomSalutation');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('salute')
      .setDescription('gets a reply from the bot'),
      async execute(interaction) {
        await interaction.reply(`${getRandomSalutation()}, ${interaction.user.username}`);
      }
}
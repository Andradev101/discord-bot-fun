const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

function getPost(link) {
  return axios.get(link)
    .then(res => {
      //console.log(res.data[0].data.children[0].data.url_overridden_by_dest);
      let imgLink = res.data[0].data.children[0].data.url_overridden_by_dest;
      console.log(imgLink);
      return imgLink;
    })
}

module.exports = {
  data: new SlashCommandBuilder()
  .setName('reddit')
  .setDescription('gets a reply from the bot')
  .addStringOption(option =>
    option.setName('input')
        .setDescription('The input to echo back')
        .setRequired(true)),

  async execute(interaction) {
    const input = interaction.options.getString("input");
    if(input.includes('https://www.reddit.com')) {
      getPost(input + '.json').then((res) => {
        interaction.reply(res);
      });
    } else {
      interaction.reply('You must paste a reddit link as an argument');
    }
  }
}
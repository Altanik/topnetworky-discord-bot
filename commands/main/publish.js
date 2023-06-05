const {
  ActionRowBuilder,
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("publish")
    .setDescription("Publier une opportunité"),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("mainModal")
      .setTitle("Publier une opportunité");

    const name = new TextInputBuilder()
      .setCustomId("name")
      .setLabel("Mission")
      .setPlaceholder("Développeur JavaScript")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const budget = new TextInputBuilder()
      .setCustomId("budget")
      .setLabel("TJM")
      .setPlaceholder("550 €")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const client = new TextInputBuilder()
      .setCustomId("client")
      .setLabel("Client")
      .setPlaceholder("LVMH - Luxury goods")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const localisation = new TextInputBuilder()
      .setCustomId("localisation")
      .setLabel("Localisation")
      .setPlaceholder("Paris, France")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const description = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("Description")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false);

    const firstRow = new ActionRowBuilder().addComponents(name);
    const secondRow = new ActionRowBuilder().addComponents(budget);
    const thirdRow = new ActionRowBuilder().addComponents(client);
    const forthRow = new ActionRowBuilder().addComponents(localisation);
    const fifthRow = new ActionRowBuilder().addComponents(description);

    modal.addComponents(firstRow, secondRow, thirdRow, forthRow, fifthRow);

    await interaction.showModal(modal);
  },
};

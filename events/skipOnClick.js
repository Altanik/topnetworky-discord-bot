const {
  bold,
  Events,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
} = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (
      (!interaction.isButton() || interaction.customId !== "skip") &&
      (!interaction.isModalSubmit() || interaction.customId !== "contactModal")
    )
      return;

    const fields = interaction.fields;
    if (fields) {
      interaction.client.data[interaction.user.id] = {
        ...interaction.client.data[interaction.user.id],
        contactName: fields.getTextInputValue("contactName"),
        contactEmail: fields.getTextInputValue("contactEmail"),
        contactLinkedIn: fields.getTextInputValue("contactLinkedIn"),
      };
    }

    const links = new ButtonBuilder()
      .setCustomId("links")
      .setLabel("Ajouter des liens pertinents")
      .setEmoji("🔗")
      .setStyle(ButtonStyle.Primary);
    const finish = new ButtonBuilder()
      .setCustomId("finish")
      .setLabel("Terminer")
      .setEmoji("🏁")
      .setStyle(ButtonStyle.Success);
    const row = new ActionRowBuilder().addComponents([links, finish]);

    try {
      await interaction.reply({
        content: bold("📝  Informations Supplémentaires :"),
        components: [row],
        ephemeral: true,
      });
    } catch (error) {
      console.error(`Error executing ${interaction.customId}`);
      console.error(error);
    }
  },
};

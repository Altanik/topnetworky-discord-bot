const {
  bold,
  Events,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (
      !interaction.isStringSelectMenu() ||
      interaction.customId !== "startDate"
    )
      return;

    interaction.client.data[interaction.user.id].startDate =
      interaction.component
        .toJSON()
        .options.find((el) => el.value === interaction.values[0]).label;

    const contactInfo = new ButtonBuilder()
      .setCustomId("contactInfo")
      .setLabel("Ajouter vos coordonnées de Contact")
      .setEmoji("📧")
      .setStyle(ButtonStyle.Primary);
    const next = new ButtonBuilder()
      .setCustomId("skip")
      .setLabel("Skip")
      .setEmoji("⏭")
      .setStyle(ButtonStyle.Secondary);
    const row = new ActionRowBuilder().addComponents([contactInfo, next]);

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

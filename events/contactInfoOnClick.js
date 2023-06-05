const {
  Events,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isButton() || interaction.customId !== "contactInfo")
      return;

    const contactModal = new ModalBuilder()
      .setCustomId("contactModal")
      .setTitle("Coordonnées de Contact :");

    const contactName = new TextInputBuilder()
      .setCustomId("contactName")
      .setLabel("Comment devrions-nous vous appeler ?")
      .setPlaceholder("Jean Dupont")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const contactEmail = new TextInputBuilder()
      .setCustomId("contactEmail")
      .setLabel("Partagez votre Email avec nous")
      .setPlaceholder("jean.dupont@example.com")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const contactLinkedIn = new TextInputBuilder()
      .setCustomId("contactLinkedIn")
      .setLabel("Partagez votre LinkedIn avec nous")
      .setPlaceholder("https://www.linkedin.com/in/jean-dupont/")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    contactModal.addComponents(
      new ActionRowBuilder().addComponents(contactName),
      new ActionRowBuilder().addComponents(contactEmail),
      new ActionRowBuilder().addComponents(contactLinkedIn)
    );

    try {
      await interaction.showModal(contactModal);
    } catch (error) {
      console.error(`Error executing ${interaction.customId}`);
      console.error(error);
    }
  },
};

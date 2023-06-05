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
    if (!interaction.isButton() || interaction.customId !== "links") return;

    const linksModal = new ModalBuilder()
      .setCustomId("linksModal")
      .setTitle("Liens Pertinents :");

    const publicationUrl = new TextInputBuilder()
      .setCustomId("publicationUrl")
      .setLabel("Y a-t-il un lien vers votre annonce ?")
      .setPlaceholder("https://www.example.com/votre-annonce")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const contactWebsite = new TextInputBuilder()
      .setCustomId("contactWebsite")
      .setLabel("Quelle est l'adresse de votre site web ?")
      .setPlaceholder("www.mon-site-web.com")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    linksModal.addComponents(
      new ActionRowBuilder().addComponents(publicationUrl),
      new ActionRowBuilder().addComponents(contactWebsite)
    );

    try {
      await interaction.showModal(linksModal);
    } catch (error) {
      console.error(`Error executing ${interaction.customId}`);
      console.error(error);
    }
  },
};

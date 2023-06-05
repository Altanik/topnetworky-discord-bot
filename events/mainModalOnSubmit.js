const {
  bold,
  Events,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit() || interaction.customId !== "mainModal")
      return;

    const fields = interaction.fields;
    if (fields) {
      interaction.client.data = {};
      interaction.client.data[interaction.user.id] = {
        name: fields.getTextInputValue("name"),
        budget: fields.getTextInputValue("budget"),
        client: fields.getTextInputValue("client"),
        localisation: fields.getTextInputValue("localisation"),
        description: fields.getTextInputValue("description"),
      };
    }

    try {
      await interaction.reply({
        content: bold("💪  Séniorité :"),
        components: [
          new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId("seniority")
              .addOptions(
                new StringSelectMenuOptionBuilder()
                  .setLabel("Junior")
                  .setDescription("< 3 ans")
                  .setValue("junior")
                  .setEmoji("🤓"),
                new StringSelectMenuOptionBuilder()
                  .setLabel("Confirmé")
                  .setDescription("3 - 5 ans")
                  .setValue("intermediate")
                  .setEmoji("🤠"),
                new StringSelectMenuOptionBuilder()
                  .setLabel("Senior")
                  .setDescription("5 ans +")
                  .setValue("senior")
                  .setEmoji("😎")
              )
          ),
        ],
        ephemeral: true,
      });
    } catch (error) {
      console.error(`Error executing ${interaction.customId}`);
      console.error(error);
    }
  },
};

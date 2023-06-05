const {
  bold,
  Events,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isStringSelectMenu() || interaction.customId !== "remote")
      return;

    interaction.client.data[interaction.user.id].remote = interaction.component
      .toJSON()
      .options.find((el) => el.value === interaction.values[0]).label;

    try {
      await interaction.reply({
        content: bold("⏳  Durée :"),
        components: [
          new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId("duration")
              .addOptions(
                new StringSelectMenuOptionBuilder()
                  .setLabel("6 mois +")
                  .setValue("6m+")
                  .setEmoji("🤩"),
                new StringSelectMenuOptionBuilder()
                  .setLabel("3 - 6 mois")
                  .setValue("3To6m")
                  .setEmoji("😌"),
                new StringSelectMenuOptionBuilder()
                  .setLabel("1 - 3 mois")
                  .setValue("1To3m")
                  .setEmoji("🙂")
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

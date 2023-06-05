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
    if (
      !interaction.isStringSelectMenu() ||
      interaction.customId !== "frequence"
    )
      return;

    interaction.client.data[interaction.user.id].frequence =
      interaction.component
        .toJSON()
        .options.find((el) => el.value === interaction.values[0]).label;

    try {
      await interaction.reply({
        content: bold("💻  Télétravail :"),
        components: [
          new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId("remote")
              .addOptions(
                new StringSelectMenuOptionBuilder()
                  .setLabel("Full remote")
                  .setValue("5d")
                  .setEmoji("🤩"),
                new StringSelectMenuOptionBuilder()
                  .setLabel("4j / semaine")
                  .setValue("4d")
                  .setEmoji("😌"),
                new StringSelectMenuOptionBuilder()
                  .setLabel("3j / semaine")
                  .setValue("3d")
                  .setEmoji("😁"),
                new StringSelectMenuOptionBuilder()
                  .setLabel("2j / semaine")
                  .setValue("2d")
                  .setEmoji("🙂"),
                new StringSelectMenuOptionBuilder()
                  .setLabel("1j / semaine")
                  .setValue("1d")
                  .setEmoji("🥲")
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

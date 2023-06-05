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
      interaction.customId !== "duration"
    )
      return;

    interaction.client.data[interaction.user.id].duration =
      interaction.component
        .toJSON()
        .options.find((el) => el.value === interaction.values[0]).label;

    const monthsPicklist = {
      Janvier: "❄️",
      Février: "💘",
      Mars: "🌱",
      Avril: "🌷",
      Mai: "🌼",
      Juin: "☀️",
      Juillet: "🌻",
      Août: "⛱️",
      Septembre: "🍂",
      Octobre: "🎃",
      Novembre: "🍁",
      Décembre: "🎄",
    };
    const months = Object.keys(monthsPicklist);
    const orderedMonths = [
      ...months
        .slice(new Date().getMonth())
        .map((month) => `${month} ${new Date().getFullYear()}`),
      ...months
        .slice(0, new Date().getMonth())
        .map((month) => `${month} ${new Date().getFullYear() + 1}`),
    ];
    try {
      await interaction.reply({
        content: bold("📅  Début :"),
        components: [
          new ActionRowBuilder().addComponents(
            (picklistCmp = new StringSelectMenuBuilder()
              .setCustomId("startDate")
              .addOptions(
                orderedMonths.map((el, index) => {
                  return new StringSelectMenuOptionBuilder()
                    .setLabel(el)
                    .setValue(`${index + 1}`)
                    .setEmoji(monthsPicklist[el.split(" ")[0]]);
                })
              ))
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

const { bold, Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (
      (!interaction.isButton() || interaction.customId !== "finish") &&
      (!interaction.isModalSubmit() || interaction.customId !== "linksModal")
    )
      return;

    const fields = interaction.fields;
    if (fields) {
      interaction.client.data[interaction.user.id] = {
        ...interaction.client.data[interaction.user.id],
        publicationUrl: fields.getTextInputValue("publicationUrl"),
        contactWebsite: fields.getTextInputValue("contactWebsite"),
      };
    }

    const data = interaction.client.data[interaction.user.id];
    console.log(data);

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`⚡ ${data.name} ⚡`)
      // .setThumbnail("https://i.imgur.com/AfFp7pu.png")
      .addFields(
        { name: "💼  Client", value: data.client, inline: true },
        { name: "\u200B", value: "\u200B", inline: true },
        { name: "💰  Budget", value: data.budget, inline: true }
      )
      .addFields(
        { name: "🌍  Lieu", value: data.localisation, inline: true },
        { name: "\u200B", value: "\u200B", inline: true },
        { name: "🖥️  Télétravail", value: data.remote, inline: true }
      )
      .addFields(
        { name: "🔄  Fréquence", value: data.frequence, inline: true },
        { name: "\u200B", value: "\u200B", inline: true },
        { name: "💪  Séniorité", value: data.seniority, inline: true }
      )
      .addFields(
        { name: "⏳  Durée", value: data.duration, inline: true },
        { name: "\u200B", value: "\u200B", inline: true },
        { name: "📅  Début", value: data.startDate, inline: true }
      )
      // .setImage("https://i.imgur.com/AfFp7pu.png")
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    if (data.contactName && data.contactName.trim() !== "") {
      const author = {
        name: data.contactName,
        iconURL:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png",
      };
      if (
        data.contactLinkedIn &&
        data.contactLinkedIn.trim() !== "" &&
        isValidUrl(data.contactLinkedIn)
      ) {
        author.url = data.contactLinkedIn;
      }
      embed.setAuthor(author);
    }

    if (data.description && data.description.trim() !== "") {
      embed.setDescription(data.description);
    }

    if (
      data.publicationUrl &&
      data.publicationUrl.trim() !== "" &&
      isValidUrl(data.publicationUrl)
    ) {
      embed.setURL(data.publicationUrl);
    }

    try {
      await interaction.reply({
        content: bold("📢 🚨  Une Nouvelle Mission vous Attend!  🚀 🎯"),
        embeds: [embed],
      });
    } catch (error) {
      console.error(`Error executing ${interaction.customId}`);
      console.error(error);
    }
  },
};

function isValidUrl(string) {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "(www\\.)?" + // www.
      "([a-z\\d-]+\\.)+[a-z]{2,6}" + // domain name and extension
      "(\\:[0-9]{1,5})?" + // port
      "(\\/[a-zA-Z\\d%_.~+=-]*)*" + // path
      "(\\?[\\=&a-zA-Z\\d%_.~+=-]*)?" + // query string
      "(\\#[a-zA-Z\\d_]*)?$",
    "i"
  ); // fragment locator
  return urlPattern.test(string);
}

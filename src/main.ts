import { Client, EmbedBuilder, Events, IntentsBitField } from 'discord.js';
import { createWorker } from 'tesseract.js';
import z from 'zod'
import { scoreText } from './score';
import { SCORE_THRESHOLD } from './rule';

const envSchema = z.object({
  DISCORD_TOKEN: z.string().min(1),
  // GUILD_ID: z.string().min(1),
  LOG_CHANNEL_ID: z.string().min(1),
});
const env = envSchema.parse(process.env);

const worker = await createWorker('eng');

const counter = new Map<string, number>();

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent],
});

client.on(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  let totalScore = 0;
  const images: Buffer[] = [];
  for (const attachment of message.attachments.values()) {

    if (!attachment.contentType?.startsWith('image/')) continue;

    const image = await fetchImage(attachment.url);
    const text = await recognizeImage(image);

    // console.log('認識結果', text);
    const score = scoreText(text.toLowerCase());
    console.log(`- ${attachment.name}: ${score}`);

    totalScore += score;
    images.push(image);
  }

  if (totalScore >= SCORE_THRESHOLD) {
    console.log(`[${message.author.username}] spam threshold exceeded. total=${totalScore}`);

    const userId = message.author.id;
    counter.set(userId, (counter.get(userId) ?? 0) + 1);

    try {
      await message.delete();
    } catch {
      console.error('failed to delete message');
    }

    const logChannel = await client.channels.fetch(env.LOG_CHANNEL_ID);
    if (!logChannel?.isTextBased() || !logChannel.isSendable()) return;

    const embed = new EmbedBuilder()
      .setColor('Yellow')
      .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
      .setDescription('怪しい画像付きメッセージを検知')
      .setFooter({ text: `スコア: ${totalScore}/${SCORE_THRESHOLD} | 連続検知数: ${counter.get(userId) ?? 0}` });

    await logChannel.send({
      embeds: [embed],
      files: images,
    }).catch(console.error);

    if (counter.get(userId)! >= 3) {
      console.log(`[${message.author.username}] timeout!`);
      await message.member?.timeout(null);
      counter.delete(userId);

      const embed = new EmbedBuilder()
        .setColor('Red')
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
        .setTitle('タイムアウトしました');

      await logChannel.send({ embeds: [embed] }).catch(console.error);
    }
  }
});

await client.login(env.DISCORD_TOKEN);

async function fetchImage(url: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
}

async function recognizeImage(image: Buffer) {
  const { data: { text } } = await worker.recognize(image);
  return text;
}

process.on('unhandledRejection', (reason) => console.error(reason));
process.on('uncaughtException', (error) => console.error(error));


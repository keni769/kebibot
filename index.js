const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/keni-hi", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Hello There!\nLatency: ${latency}ms` });
});

app.command("/keni-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/keni-hi : Makes a greeting
/keni-catfact : Tells a fact about cats
/keni-coinflip : Heads or tails idk
/keni-dice : Rolls a dice`
  });
});

app.command("/keni-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/keni-coinflip", async ({ack, respond }) => {
  await ack();
  const result = Math.random() < 0.5 ? "Heads" : "Tails";
  await respond(`The coin landed on ${result}!`);
  });

app.command("/keni-dice", async ({ ack, respond }) => { 
  await ack();
  const roll= Math.floor(Math.random() *6)+1;
  await respond(`I rolled a ${roll}!`);
});

app.command("/keni-pick", async ({command, ack, respond }) => {
  await ack();
  

});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
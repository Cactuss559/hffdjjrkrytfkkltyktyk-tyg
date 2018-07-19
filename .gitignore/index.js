const Discord = require("discord.js");
const fs = require('fs');
const JsonDB = require('node-json-db');
const bot = new Discord.Client();

const prefix = ("/");
const embedcolor = 0xe54242;

var cooldown = new Set();

const db = new JsonDB("./files/config", false);
var config = fs.readFileSync("./files/config.json", "utf8");
config = JSON.parse(config)

bot.login (process.env.TOKEN); //process.env.TOKEN
bot.on("ready", () => {
    bot.user.setActivity(prefix+"help | "+bot.guilds.size+" serveurs | "+bot.users.size+" utilisateurs");
    bot.user.setStatus("dnd"); //online away dnd invisible
    console.log(bot.user.username+" ON -  - Slurath#7651");
})

bot.on('guildCreate', guild => {
    guild.createChannel("cpub");
    var embed = new Discord.RichEmbed()
        .setColor(embedcolor)
        .setAuthor("Merci de m'avoir ajouté à ton serveur !", bot.user.avatarURL)
        .setDescription("Merci de m'avoir invité. Je viens de créer le channel **cpub**, vous pouvez le mettre où vous voulez mais ne pas changer le nom. Pour faire ta pub, tu devras utiliser la commmande **/pub <Pub>** pour la partager sur tout les serveurs ayant le bot.\nÀ bientôt !\n\nLien du support: https://discord.gg/t5mnecq")
        .setFooter(bot.user.username+" - Slurath#7651 - ")
    guild.owner.sendEmbed(embed);
})

bot.on('guildMemberAdd', member => {
    var embed = new Discord.RichEmbed()
        .setColor(embedcolor)
        .setAuthor("Bienvenue !", bot.user.avatarURL)
        .setDescription("Bienvenue sur **"+member.guild.name+"** ! Je suis le bot **ChatPubing** et grâce à moi, vous n'aurez plus besoin de rejoindre plein de serveurs différents pour partager votre pub. En allant dans le channel **#cpub**, vous pourrez utiliser la commande **/pub** et votre pub sera envoyée dans tout les serveurs ayant le bot et le channel **#cpub**\n\nSi vous voulez nous aider, invitez le bot sur votre serveur et créez un channel **#cpub**: https://discordapp.com/oauth2/authorize?client_id=469435207762706452&scope=bot&permissions=8\nLien du support: https://discord.gg/t5mnecq")
        .setFooter(bot.user.username+" - Slurath#7651")
    member.user.sendEmbed(embed);
})

bot.on("message", message => {
    if(message.author.equals(bot.user)) return;
    if(!message.content.startsWith(prefix)) return;
    if(message.channel.type === "dm") return;

    var args = message.content.substring(prefix.length).split(" ");

    switch(args[0].toLowerCase()){

        case "help":
            if(!args[1]){
                var embed = new Discord.RichEmbed()
                    .setColor(embedcolor)
                    .setAuthor("Aide", bot.user.avatarURL)
                    .setDescription(":pushpin: **/help:** Afficher l'aide\n"+
                    ":wrench: **/help bot :** Afficher les commandes utiles\n"+
                    ":pencil2: **/help pub:** Afficher les commandes utiles pour faire ta pub\n"+
                    ":mouse_three_button: **/support:** Accès au support du bot")
                    .setFooter(bot.user.username+" - Slurath#7651")
                message.channel.sendEmbed(embed);
            }else if(args[1]==="bot"){
                var embed = new Discord.RichEmbed()
                    .setColor(embedcolor)
                    .setAuthor("Aide - Bot", bot.user.avatarURL)
                    .setDescription("**Utilitaires:**\n"+
                    ":envelope: **/invite:** Inviter ChatPubing sur votre serveur\n"+
                    ":pushpin: **/news:** Nouveautés du bot\n\n"+
                    "**Bot:**\n"+
                    ":page_facing_up: **/infos:** Informations à propos du bot ChatPubing\n"+
                    ":ping_pong: **/ping:** Voir la latance du bot en MS\n"+
                    ":paperclip: **/suggestions:** Proposer une suggestion pour le bot\n"+
                    ":crossed_swords: **/report:** Signaler un membre qui a fait une pub innapropriée")
                    .setFooter(bot.user.username+" - Slurath#7651")
                message.channel.sendEmbed(embed);
            }else if(args[1]==="pub"){
                var embed = new Discord.RichEmbed()
                    .setColor(embedcolor)
                    .setAuthor("Aide - Outils", bot.user.avatarURL)
                    .setDescription(":pencil2: **/pub:** Envoyer votre publicitée dans les channels **#cpub**\n"+
                    ":wrench: **/cpubwork:** Comprendre le foncionnement de ChatPubing\n"+
                    ":pen_ballpoint: **/partenariats:** Liste de nos partenariats")
                    .setFooter(bot.user.username+" - Slurath#7651")
                message.channel.sendEmbed(embed);
            }
            break;

        //!!!!!!!!!Outils!!!!!!!!!//
        case "news":
            var embed = new Discord.RichEmbed()
                .setColor(embedcolor)
                .setAuthor("Nouveautés", bot.user.avatarURL)
                .setDescription("Blacklist ajoutée au bot,\n Partenariats ouverts\n Message de bienvenue uniquement dans les channels nommés `général`\n Ajout d'un serveur list (/serveurs). ")
                .setFooter(bot.user.username+" - Slurath#7651")
            message.channel.sendEmbed(embed);
            break;

        case "ping":
            var embed = new Discord.RichEmbed()
                .setColor(embedcolor)
                .setAuthor("Ping", bot.user.avatarURL)
                .setDescription(":alarm_clock: **Temps de réponse:** "+bot.ping+"ms")
                .setFooter(bot.user.username+" - Slurath#7651")
            message.channel.sendEmbed(embed);
            break;

        case "info":
            var embed = new Discord.RichEmbed()
                .setColor(embedcolor)
                .setAuthor("Informations", bot.user.avatarURL)
                .setDescription(":crown: **Créateur:** Slurath#7651 \n:floppy_disk: **Version:** 1.0.0\n:desktop: **Serveurs:** "+bot.guilds.size+"\n:bust_in_silhouette: **Utilisateurs:** "+bot.users.size)
                .setThumbnail(bot.user.avatarURL)
                .setFooter(bot.user.username+" - Slurath#7651")
            message.channel.sendEmbed(embed);
            break;

        case "support":
            var embed = new Discord.RichEmbed()
                .setColor(embedcolor)
                .setAuthor("Support", bot.user.avatarURL)
                .setDescription(":mouse_three_button: Pour rejoindre mon support, [**cliquez ici**](https://discord.gg/t5mnecq)")
                .setFooter(bot.user.username+" - Slurath#7651")
            message.channel.sendEmbed(embed);
            break;


        case "invite":
            var embed = new Discord.RichEmbed()
                .setColor(embedcolor)
                .setAuthor("Invite", bot.user.avatarURL)
                .setDescription(":envelope: Si vous souhaitez m'inviter, [**cliquez ici**]https://discordapp.com/oauth2/authorize?client_id=469435207762706452&scope=bot&permissions=8)")
                .setFooter(bot.user.username+" - Slurath#7651")
            message.channel.sendEmbed(embed);
            break;

        case "suggestions":
            var temp = message.content.split(" ").slice(1);
            var longargs = temp.join(" ")
            if(!longargs){
                var embed = new Discord.RichEmbed()
                    .setColor(embedcolor)
                    .setAuthor("Erreur", bot.user.avatarURL)
                    .setDescription(":no_entry_sign: Vous devez mettre votre suggestion à la suite")
                    .setFooter(bot.user.username+" - Slurath#7651")
                message.channel.sendEmbed(embed);
            }else{
                var embed = new Discord.RichEmbed()
                    .setColor(embedcolor)
                    .setAuthor("Suggestions", bot.user.avatarURL)
                    .setDescription(":paperclip: **Vous avez envoyé votre suggestion:**\n*"+longargs+"*")
                    .setFooter(bot.user.username+" - Slurath#7651")
                message.channel.sendEmbed(embed);
                //
                var embed = new Discord.RichEmbed()
                    .setColor(embedcolor)
                    .setAuthor("Suggestion de "+message.author.username, message.author.avatarURL)
                    .setDescription(":paperclip: **Suggestion:**\n*"+longargs+"*")
                    .setFooter(bot.user.username+" - Slurath#7651")
                bot.channels.findAll("name", "cpubing-suggestions").map(channel => channel.send(embed))
            }
            break;

        case "report":
            var temp = message.content.split(" ").slice(1);
            var longargs = temp.join(" ")
            if(!longargs){
                var embed = new Discord.RichEmbed()
                    .setColor(embedcolor)
                    .setAuthor("Erreur", bot.user.avatarURL)
                    .setDescription(":no_entry_sign: Vous devez mettre votre report avec une image comme quoi qu'il ne repecte pas les règles. (lien) (L'ID du membre doit être visible sur la photo)")
                    .setFooter(bot.user.username+" - Slurath#7651")
                message.channel.sendEmbed(embed);
            }else{
                var embed = new Discord.RichEmbed()
                    .setColor(embedcolor)
                    .setAuthor("Report", bot.user.avatarURL)
                    .setDescription(":crossed_swords:  **Vous avez envoyé votre report:**\n*"+longargs+"*")
                    .setFooter(bot.user.username+" - Slurath#7651")
                message.channel.sendEmbed(embed);
                //
                var embed = new Discord.RichEmbed()
                    .setColor(embedcolor)
                    .setAuthor("Report de "+message.author.username, message.author.avatarURL)
                    .setDescription(":crossed_swords:  **Report:**\n*"+longargs+"*")
                    .setFooter(bot.user.username+" - Slurath#7651")
                bot.channels.findAll("name", "cpubing-reports").map(channel => channel.send(embed))
            }
            break;

        case "partenariats":
            if(!args[1]){
                var embed = new Discord.RichEmbed()
                    .setColor(embedcolor)
                    .setAuthor("Partenariats", bot.user.avatarURL)
                    .setDescription(":pen_ballpoint: Nous n'avons pas encore de partenariats. Rejoignez le serveur de support pour + d'informations")
                    .setFooter(bot.user.username+" - Slurath#7651")
                message.channel.sendEmbed(embed);
            }
            break;

        case "cpubwork":
            var embed = new Discord.RichEmbed()
                .setColor(embedcolor)
                .setAuthor("Fonctionnement de ChatPubing", bot.user.avatarURL)
                .setDescription(":wrench: Dans ce serveur, vous devriez voir un channel: **#cpub**. Dans ce channel même, utilisez la commande: **/pub** pour envoyer votre pub dans tout les serveurs ayant le bot.")
                .setFooter(bot.user.username+" - Slurath#7651")
            message.channel.sendEmbed(embed);
            break;

        case "pub":
            if(cooldown.has(message.author.id)){
                message.delete();
                var embed = new Discord.RichEmbed()
                    .setColor(embedcolor)
                    .setAuthor("Erreur", bot.user.avatarURL)
                    .setDescription(":no_entry_sign: Vous devez attendre 2 heures avant d'envoyer à nouveau votre publicitée")
                    .setFooter(bot.user.username+" - Slurath#7651")
                message.channel.sendEmbed(embed);
                break;
            }else{
                if(message.channel.name === "cpub"){
                    if(message.author.username==="MEE6"){
                        var embed = new Discord.RichEmbed()
                            .setColor(embedcolor)
                            .setAuthor("Erreur", bot.user.avatarURL)
                            .setDescription(":no_entry_sign: Vous ne pouvez pas utiliser un bot pour envoyer vos publicités")
                            .setFooter(bot.user.username+" - Slurath#7651")
                        message.channel.sendEmbed(embed);
                        return;
                    }
                    if(message.author.id==="446272477350330368"||message.author.id==="274636300332695562"||message.author.id==="347043099010269184"||message.author.id==="317221808405348364"||message.author.id==="394787892351991808"||message.author.id==="296357024864665605"||message.author.id==="398096736880427018"){
                        var embed = new Discord.RichEmbed()
                            .setColor(embedcolor)
                            .setAuthor("Erreur", bot.user.avatarURL)
                            .setDescription(":no_entry_sign: Vous êtes banni, pour être débanni, rendez-vous sur le [**support**](https://discord.gg/t5mnecq)")
                            .setFooter(bot.user.username+" - Slurath#7651")
                        message.channel.sendEmbed(embed);
                        return;
                    }
                        message.delete();
                        var temp = message.content.split(" ").slice(1);
                        var longargs = temp.join(" ")
                        if(!longargs){
                            var embed = new Discord.RichEmbed()
                                .setColor(embedcolor)
                                .setAuthor("Envoyer une pub", bot.user.avatarURL)
                                .setDescription(":no_entry_sign: Vous devez mettre votre pub à la suite, exemple: `/pub Salut !`")
                                .setFooter(bot.user.username+" - Slurath#7651")
                            message.channel.sendEmbed(embed);
                        }else{
                            var embed = new Discord.RichEmbed()
                                .setColor(embedcolor)
                                .setAuthor(message.author.username+" - "+message.author.id, message.author.avatarURL)
                                .setDescription(longargs)
                                .setFooter(bot.user.username+" - Slurath#7651")
                                .setTimestamp()
                            bot.channels.findAll("name", "cpub").map(channel => channel.send(embed))
                            
                            cooldown.add(message.author.id)

                            setTimeout(() => {
                                cooldown.delete(message.author.id)
                            }, 7200000)
                        }
                    break;
                }else{
                    var embed = new Discord.RichEmbed()
                        .setColor(embedcolor)
                        .setAuthor("Erreur", bot.user.avatarURL)
                        .setDescription(":no_entry_sign: Vous devez éxécuter cette commande dans le channel **#cpub**")
                        .setFooter(bot.user.username+" - Slurath#7651")
                    message.channel.sendEmbed(embed);
                }
            }
            break;

        case "adminpub":
            if(message.channel.name === "cpub"){
                if(!message.author.id==="308146369745518602"||!message.author.id==="466535873287028737"|!message.author.id==="422353090667347968"){
                    var embed = new Discord.RichEmbed()
                        .setColor(embedcolor)
                        .setAuthor("Erreur", bot.user.avatarURL)
                        .setDescription(":no_entry_sign: Vous n'avez pas la permission")
                        .setFooter(bot.user.username+" - Slurath#7651")
                    message.channel.sendEmbed(embed);
                    return;
                }
                message.delete();
                var temp = message.content.split(" ").slice(1);
                var longargs = temp.join(" ")
                if(!longargs){
                    var embed = new Discord.RichEmbed()
                        .setColor(0xf4c31f)
                        .setAuthor("Envoyer une pub", bot.user.avatarURL)
                        .setDescription(":no_entry_sign: Vous devez mettre votre pub à la suite, exemple: `.adminpub Salut !`")
                        .setFooter(bot.user.username+" - Slurath#7651")
                    message.channel.sendEmbed(embed);
                }else{
                    var embed = new Discord.RichEmbed()
                        .setColor(0xf4c31f)
                        .setAuthor(message.author.username+" - Staff ChatPubing", message.author.avatarURL)
                        .setDescription(longargs)
                        .setFooter(bot.user.username+" - Slurath#7651")
                        .setTimestamp()
                    bot.channels.findAll("name", "cpub").map(channel => channel.send(embed))
                }
            }else{
                var embed = new Discord.RichEmbed()
                    .setColor(embedcolor)
                    .setAuthor("Erreur", bot.user.avatarURL)
                    .setDescription(":no_entry_sign: Vous devez éxécuter cette commande dans le channel **#cpub**")
                    .setFooter(bot.user.username+" - Slurat#7651")
            message.channel.sendEmbed(embed);
            }
            break;
            
        case "updategame":
            bot.user.setActivity(prefix+"help | "+bot.guilds.size+" serveurs | "+bot.users.size+" utilisateurs");
            bot.user.setStatus("dnd");
            var embed = new Discord.RichEmbed()
                .setColor(embedcolor)
                .setAuthor("UpdateGame", bot.user.avatarURL)
                .setDescription(":video_game: Merci de m'avoir rechargé.")
                .setFooter(bot.user.username+" - Slurath#7651")
            message.channel.sendEmbed(embed);
            break;
            
        case "serveurs":
        message.channel.send(bot.guilds.map(r => r.name + ` | **${r.memberCount}** membres`))
        break;
        }
}); 


bot.on("guildMemberAdd", member => {
    const embed = new Discord.RichEmbed()
      .setColor('#009114')
      .setAuthor(member.user.tag, member.user.avatarURL)
      .setTitle(`Bienvenue ${member.user.tag} passe faire un tour dans la catégorie IMPORTANT :wink:`)
     .setTimestamp()
member.guild.channels.find("name", "général").send({embed})
});

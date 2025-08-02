const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic01DU3JYQjdKWmd2b0JrbHlyT0RSMThkQkdyK0Z5R3Q0Q243MTV3WlYxZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWtlbUdiOERZOTBEWVpwUmcxOElCTnVQU0MvOUVwdzJlV3BsRlJZeEQyMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxR0RwdU0zZlo2RVVFdS9UOVBOVkNCa2hTRnpzb1MzYUVLdmUxbzZ2eG1zPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQbFFPYjBxek8rU0N2dmgzbkJhcjBHbHJIblRuekM2Q3JoanhadUhlcjNnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9KK0RjUG5hamhQNkJmQWNxUyt3NnJkSGxzVkgyMnpaY0l2Nkl2QUJsMkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFXbWNEcjMrVDdNVXVlQVRNNEdKNUJERzVIK0VIdEJrMHI1bVFwYzJLaWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUNIRVFqOXBreENmdnV0RERiOHR5UlliZXh2VEo2MHVmWVkrY0JYTjRYYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWNjNGlnSm52Y3YyemhJRmdIdFdXMlV1d2h4eHZuZTZZL0l1MHNoWEFVOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjllKzJCRzZ3NVdQcDBaeEZzTHAraW9CSkJXaU1UYXdacFBma0owNUM4TXJZQkFpbnJ6WFRTbUdMeTBST0gycXBQaUVYREN1S1JSU1BiNC9CM1dDbWdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE3LCJhZHZTZWNyZXRLZXkiOiJhb1BWVXJvZS9GY2pzM0ZlUDd2dkZRcERCSFcxMzlZNHh0ZXMxK0NNU0hNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDcwMzA2NzQwMDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRkUwMEU2NTdBRTA4RkYxQTQyRjY0NUQwMDY3RTEwOTIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDEzNDk3NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0NzAzMDY3NDAwOEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0MzVCQjg4NzE0ODEwRUM5NkQzNDVGRUM0QTczMzBENCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU0MTM0OTc3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ3MDMwNjc0MDA4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNEQzE2MUY2NzlBNjYzQjc1MTVGOEY3RTQ5Q0U5QTQ4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQxMzQ5ODl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNDcwMzA2NzQwMDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMDcyNUQwOTg1RUYxNkM4QTcyQUFBOUNBMjgwRjIyMTcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDEzNTAxM31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiSkRBWTM3U1ciLCJtZSI6eyJpZCI6IjIzNDcwMzA2NzQwMDg6MjZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiT3BlbWlwb+KBtyIsImxpZCI6IjEyMDMyODQ3NDg2MTU3ODoyNkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0k3dCtOc0dFSzN6dDhRR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkU0SUtWc0VYckhBVEVEREJtT2RJWGpFK0N1YkM3YXZ3Sk45bVg4dUtnUWM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjVLQ2kxV3ZWL21CZ1p5clB1eUwwbGY5bXdzUzc2UWFueTVyTlhkSlc1d01mekk4cS9Vam5LcmRRaUFPYmhYeWIrQ1BlRmFQUzlwakplaTEybytJVUN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJKaTdjQTU2T3BmTXF2bWpCUmV2WlROQzZYdVNUUjhadlM0RVZITHZGTnkrams2Sjhrcm9XNzVNL294N3pvL0xneGwyTlQxRm1BUTRBcWYwRTNxdU5nZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMzA2NzQwMDg6MjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUk9DQ2xiQkY2eHdFeEF3d1pqblNGNHhQZ3Jtd3UycjhDVGZabC9MaW9FSCJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU0MTM0OTcxLCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhteCJ9',
    PREFIXE: process.env.PREFIX || "@",
    OWNER_NAME: process.env.OWNER_NAME || "Arikeh",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2347030674008",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Mr b²',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


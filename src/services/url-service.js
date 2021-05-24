const { URLs } = require("../models/db");
const { int2radix64, radix64toint } = require("./radix64-service");

async function createRandomShortCode(link) {
  const id = parseInt(Math.random() * 999999999999);

  const exists = await URLs.findOne({
    where: { id },
  });

  if (exists) return await createRandomShortCode(link);
  return await URLs.create({
    id,
    code: int2radix64(id),
    link,
  });
}

const createCustomShortCode = (code, link) => {
const id = radix64toint(code);
  const exists = await URLs.findOne({
    where: { id },
  });
  if (exists) throw new Error("This shortcode [" + code + "] already exists");
  return await URLs.create({
    id,
    code,
    link,
  });
}

async function findLongURL(code) {
  const id = radix64toint(code);
  const exists = await URLs.findOne({
    where: { id },
  });
  return exists;
}
module.exports = {
  createRandomShortCode,
  createCustomShortCode,
  findLongURL,
};

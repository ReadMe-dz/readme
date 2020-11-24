const makeRandStr = (length) => {
  let str = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    str += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return str;
};

module.exports = { makeRandStr };

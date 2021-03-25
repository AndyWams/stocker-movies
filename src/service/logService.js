function init() {}

function log(error) {
  console.error(error);
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

const loger = {
  init,
  log,
};
export default loger;

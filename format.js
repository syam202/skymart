function formatMinutes(mins){
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const parts = [];
  if(h) parts.push(h + "h");
  if(m) parts.push(m + (m === 1 ? "min" : "mins"));
  if(!h && !m) parts.push("0min");
  return parts.join(" ");
}

module.exports = { formatMinutes };

function pad(n, len = 2){ return String(n).padStart(len, "0"); }

export const getESTString = (date) => {
  const estParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);

  const parts = Object.fromEntries(estParts.map(p => [p.type, p.value]));

  if (parts.hour === "24") {
    parts.hour = "00";

    const y = Number(parts.year);
    const m = Number(parts.month);
    const d = Number(parts.day);
    const nd = new Date(Date.UTC(y, m - 1, d));
    nd.setUTCDate(nd.getUTCDate() + 1);

    parts.year = String(nd.getUTCFullYear());
    parts.month = pad(nd.getUTCMonth() + 1);
    parts.day = pad(nd.getUTCDate());
  }

  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
}

import moment from "moment";

export function getCurrentDaytime() {
  const currentHour = moment().locale("id").hour();

  if (currentHour >= 4 && currentHour < 11) {
    return "Pagi";
  } else if (currentHour >= 11 && currentHour < 15) {
    return "Siang";
  } else if (currentHour >= 15 && currentHour < 19) {
    return "Sore";
  } else {
    return "Malam";
  }
}

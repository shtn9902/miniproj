const url =
  "https://api.thingspeak.com/channels/1738363/feeds.json?api_key=LZVFAQM1JOOGZF12&results=1";
//const url2 = "https://api.thingspeak.com/channels/1738363/fields/2?api_key=LZVFAQM1JOOGZF12";
async function fun() {
  return (await fetch(url)).json();
}
async function display() {
  const data = await fun();
  let l = data.feeds.length - 1;
  let volt = data.feeds[0].field1;
  let perc = data.feeds[0].field2;
  let v_field = document.getElementById("batt_v");
  let p_field = document.getElementById("batt_p");
  v_field.textContent = volt;
  p_field.textContent = perc;
  //  let dis_field = document.getElementById("dis");
  //  let p = parseFloat(perc) * 0.7;
  //  dis_field.innerText = p;
}

display();

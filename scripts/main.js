const coinList = document.getElementById("listaValute") // lista andamento valute
const loadingButton = document.getElementById("loadingButton") // bottone per fare la call
const searchBar = document.getElementById("searchBar") // una futura funzione di ricerca tra le valute fetchate o da fetchare
const dummyJson = document.getElementById("jsonContent") // per lavorare il "locale" col json
const datePicker = document.getElementById("datePicker") // per lavorare il "locale" col json
const access_key = "c2a1f5d7eb34b12151e8977153b80446" // apiKey

/*
todo: []    ricerca tramite tempo
      []    ricerca tramite nome valuta
      []    lista di tutte le valute
      []    focus con grafico per la valuta che si clicca/cerca
*/

//http://api.coinlayer.com/live?access_key=c2a1f5d7eb34b12151e8977153b80446 // live fetch
//http://api.coinlayer.com/2018-04-30?access_key=c2a1f5d7eb34b12151e8977153b80446 // time-specific fetch

const loadData = async () => {
  coinList.innerHTML = ""
  let searchTerm = searchBar.value
  // let data = await fetch(
  //   "http://api.coinlayer.com/live?access_key=" + access_key
  // ).then(response => response.json())
  // //fetch vera ^^^^^^^

  let data = JSON.parse(dummyJson.value)
  console.log(data)
  // per lavorare in locale col json, abbiamo 500 richieste mensili porca eva
  // una volta fatto dovremmo cambiarlo con la fetch vera, scritta sopra

  let time = convertTimestamp(data.timestamp)
  console.log(time)
  const li = document.createElement("li")
  li.innerHTML = "Analisi del " + time + " del fuso orario locale"
  coinList.appendChild(li)

  Object.keys(data.rates).forEach(function(key) {
    console.log(key, data.rates[key]) // key è il nome della cryptovaluta e data.rates[key] è il valore
    const li = document.createElement("li")
    //li.innerHTML = '<img src="' + element.urls.regular + '">' // giusto ma da rifare per le valute
    li.innerHTML = key + " vale: $" + data.rates[key] // printa tutte le valute
    coinList.appendChild(li)
  })

  // data.rates.forEach(element => {
  //   console.log(element)
  //   const li = document.createElement("li")
  //   //li.innerHTML = '<img src="' + element.urls.regular + '">' // giusto ma da rifare per le valute
  //   li.innerHTML = element.toString // boh
  //   coinList.appendChild(li)
  // })
}

loadingButton.onclick = loadData
searchBar.onchange = loadData

function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
    yyyy = d.getFullYear(),
    mm = ("0" + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
    dd = ("0" + d.getDate()).slice(-2), // Add leading 0.
    hh = d.getHours(),
    h = hh,
    min = ("0" + d.getMinutes()).slice(-2), // Add leading 0.
    ampm = "AM",
    time

  if (hh > 12) {
    h = hh - 12
    ampm = "PM"
  } else if (hh === 12) {
    h = 12
    ampm = "PM"
  } else if (hh == 0) {
    h = 12
  }

  // ie: 2013-02-18, 8:35 AM
  time = yyyy + "-" + mm + "-" + dd + ", " + h + ":" + min + " " + ampm

  return time
}

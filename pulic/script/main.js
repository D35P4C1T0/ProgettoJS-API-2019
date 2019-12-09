const coinList = document.getElementById("listaValute") // lista andamento valute
const loadingButton = document.getElementById("loadingButton") // bottone per fare la call
const searchBar = document.getElementById("searchBar") // una futura funzione di ricerca tra le valute fetchate o da fetchare
const dummyJson = document.getElementById("jsonContent") // per lavorare il "locale" col json
const datePicker = document.getElementById("datePicker") // per pickare la data precisa del valore assunto dalle valute
const dateCheckBox = document.getElementById("dateCheckBox") // per pickare la data precisa del valore assunto dalle valute
const message = document.getElementById("message") //
const sortButton = document.getElementById("sortButton") //
const access_key = "c2a1f5d7eb34b12151e8977153b80446" // apiKey

/*
todo: []    ricerca tramite tempo
      []    ricerca tramite nome valuta
      []    lista di tutte le valute
      []    focus con grafico per la valuta che si clicca/cerca
*/

// http://api.coinlayer.com/live?access_key=c2a1f5d7eb34b12151e8977153b80446 // live fetch
// http://api.coinlayer.com/2018-04-30?access_key=c2a1f5d7eb34b12151e8977153b80446 // time-specific fetch

let valuesMap = new Map() // todo: riscrivere un po' tutto in maniera tale che tutto gira con la mappa e non con l'array di stringa semplice
let cryptoCashList = []

const addToDisplayList = crypto => {
  console.log(
    "sono dentro a addToDisplayList e mi hanno detto di aggiungere " + crypto
  )
  const li = document.createElement("li")
  li.innerHTML = crypto // printa tutte le valute
  coinList.appendChild(li)
}

const UpdateList = filterPattern => {
  coinList.innerHTML = ""
  let toDisplay
  if (filterPattern === "") {
    toDisplay = cryptoCashList
  } else {
    toDisplay = cryptoCashList.filter(crypto => {
      //cryptoCashList.includes(filterPattern)
      return crypto.includes(filterPattern)
    })
  }
  toDisplay.forEach(crypto => addToDisplayList(crypto))
}

function sortMap() {
  valuesMap = new Map([...valuesMap.entries()].sort((a, b) => a[0] > b[0])) // non va, ordina le key e non le values
  let out =
    "dentro alla mappa ordinata ci ho trovato " + valuesMap.size + " robe: \n"

  for (let entry of valuesMap) {
    out += entry.toString() + "\n"
  }
  console.log(out)
}

const loadData = async () => {
  cryptoCashList = []
  valuesMap.clear()
  coinList.innerHTML = ""
  message.innerHTML = ""
  let searchTerm = searchBar.value.toUpperCase()
  let datePicked = datePicker.value
  // let data = await fetch(
  //   "http://api.coinlayer.com/live?access_key=" + access_key
  // ).then(response => response.json())
  // //fetch vera ^^^^^^^

  let content = JSON.parse(dummyJson.value)
  console.log(content)
  // per lavorare in locale col json, abbiamo 500 richieste mensili porca eva
  // una volta fatto dovremmo cambiarlo con la fetch vera, scritta sopra

  let time = convertTimestamp(content.timestamp)
  console.log(time)
  message.innerHTML = "Dati aggiornati al " + time + " del fuso orario locale."

  Object.keys(content.rates).forEach(function(key) {
    // scorro il json
    console.log(
      "voglio inserire " +
        key +
        " = $" +
        content.rates[key] +
        " dentro al mio array"
    )
    cryptoInfo = key + " = $" + content.rates[key]
    cryptoCashList.push(cryptoInfo)
    valuesMap.set(key, content.rates[key])

    // todo: fetch in base alla data, controllando che l'utente voglia
    //       davvero filtrare in base ad un giorno preciso

    //console.log(key, content.rates[key]) // key è il nome della cryptovaluta e content.rates[key] è il valore
    //const li = document.createElement("li")
    //li.innerHTML = key + " = $" + content.rates[key] // printa tutte le valute
    //coinList.appendChild(li)
  })

  console.log(
    "dentro all'array ci ho trovato " +
      cryptoCashList.length +
      " robe: \n" +
      cryptoCashList
  )

  let out = "dentro alla mappa ci ho trovato " + valuesMap.size + " robe: \n"

  for (let entry of valuesMap) {
    out += entry.toString() + "\n"
  }
  console.log(out)

  console.log("stai cercado " + searchTerm)
  // console.log(
  //   "mo cerco se il tuo termine ci sta dentro alla mia lista di valute.\n" +
  //     cryptoCashList.includes("ADA")
  // )

  UpdateList(searchTerm)

  // Object.keys(content.rates).forEach(function(key) {
  //   // scorro il json
  //   console.log(key, content.rates[key]) // key è il nome della cryptovaluta e content.rates[key] è il valore
  //   const li = document.createElement("li")
  //   li.innerHTML = key + " = $" + content.rates[key] // printa tutte le valute
  //   coinList.appendChild(li)
  // })

  // data.rates.forEach(element => {
  //   console.log(element)
  //   const li = document.createElement("li")
  //   //li.innerHTML = '<img src="' + element.urls.regular + '">' // giusto ma da rifare per le valute
  //   li.innerHTML = element.toString // boh
  //   coinList.appendChild(li)
  // })
  // console.log(datePicker.value) // risulta in un "2019-12-05"
}

loadingButton.onclick = loadData
//searchBar.onchange = loadData
sortButton.onclick = sortMap

searchBar.oninput = e => {
  const toMatch = e.target.value.toUpperCase()
  //console.log("change " + toMatch)
  UpdateList(toMatch)
}

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

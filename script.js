const coinList = document.getElementById("listaValute") // lista andamento valute
const loadingButton = document.getElementById("loadingButton")
const searchBar = document.getElementById("searchBar")

const access_key = "c2a1f5d7eb34b12151e8977153b80446"

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
  let data = await fetch(
    "http://api.coinlayer.com/live?access_key=" + access_key
  ).then(response => response.json())

  data.results.forEach(element => {
    console.log(element)
    const li = document.createElement("li")
    //li.innerHTML = '<img src="' + element.urls.regular + '">' // giusto ma da rifare per le valute
    coinList.appendChild(li)
  })
}

loadingButton.onclick = loadData
searchBar.onchange = loadData

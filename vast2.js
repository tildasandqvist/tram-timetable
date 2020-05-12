let hours = new Date().getHours() //Hämtar timmen
let minutes = new Date().getMinutes() //Hämtar minuten

fetch('https://api.vasttrafik.se/token', {
    body: 'grant_type=client_credentials&scope=0',
    headers: {
      Authorization: 'Basic bWsydE5peFBPUUt2cUJic0Q1c1JheXljZHpZYTpndkphUTR1WmhMbTZ3aUpKRklXRWphYTJLaHdh',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST'
  })

  .then(response => response.json())
  .then(result => {
    let accessToken = result.access_token

    fetch('https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id=9021014007270000&date=2020-01-21&time=' + hours + '%3A' + minutes + '&format=json', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      })

      .then(response => response.json())
      .then(result => {
        (result.DepartureBoard.Departure[0].name)




        for (let n = 0; n < result.DepartureBoard.Departure.length; n++) {
          console.log(result.DepartureBoard.Departure[n])

          let allinfo = document.createElement('div') //Stora diven där inforn ska ligga i 
          allinfo.setAttribute('class', 'content')
          document.querySelector('.box').appendChild(allinfo)



          let bilder = document.createElement('img') //bilder 
          bilder.className = 'nummerlogga'

          if (result.DepartureBoard.Departure[n].sname === '4') { //Bestämmer ifall bilden för spårvagn 4 eller 2 ska visas
            bilder.src = "spårvagn 4.JPG"
          } else {
            bilder.src = "spårvagn 2.JPG"
          }
          allinfo.appendChild(bilder)



          let vagnnummer = document.createElement('p') // Vilken spårvagn 
          vagnnummer.setAttribute('class', 'vagnclass')
          vagnnummer.innerHTML = result.DepartureBoard.Departure[n].name
          allinfo.appendChild(vagnnummer)

          let vagnriktning = document.createElement('p') //Spårvagnens destination
          vagnriktning.setAttribute('class', 'riktningclass')
          vagnriktning.innerHTML = result.DepartureBoard.Departure[n].direction
          allinfo.appendChild(vagnriktning)


          let vagntid = document.createElement('p') //avgångstid
          vagntid.setAttribute('class', 'tidclass')
          vagntid.textContent = (moment(moment(result.DepartureBoard.Departure[n].date + ' ' + result.DepartureBoard.Departure[n].time).diff(moment() - 60000)).format("m")) //Räknar ner minuter till avgång. (-60000 pga. det står 59 annars)



          if (moment(moment(result.DepartureBoard.Departure[n].date + ' ' + result.DepartureBoard.Departure[n].time).diff(moment() - 60000)).format("m") === '0') {
            vagntid.textContent = 'NU'
          } //Ifall det är 0 minuter kvar till avgång står det istället "NU".

          allinfo.appendChild(vagntid)

          let track = document.createElement('p') //track 
          track.setAttribute('class', 'trackclass')
          track.innerHTML = result.DepartureBoard.Departure[n].track
          allinfo.appendChild(track)
        }
      })
  })

setTimeout(() => {
  location.reload()
}, 60000) // Laddar om sidan efter 60 sekunder
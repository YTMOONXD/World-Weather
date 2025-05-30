document.addEventListener("DOMContentLoaded", function () {
  const allCountriesList = [];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.animate').forEach((el) => observer.observe(el));

  let bar = document.getElementById('bars');
  let links = document.getElementById('links');

  if (bar && links) {
    bar.addEventListener('click', () => {
      links.classList.toggle('show');
    });
  }

  const searchbtn = document.querySelectorAll('#searchbtn');
  const searchingbox = document.getElementById('searching');

  searchbtn.forEach(ele => {
    ele.addEventListener('click', () => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      searchingbox.classList.toggle('show');
    });
  });

  document.addEventListener('click', function (event) {
    if (searchingbox.classList.contains('show')) {
      if (event.target.tagName === 'DIV') {
        searchingbox.classList.toggle('show');
      }
    }
  });

  document.getElementById('enter').addEventListener('click', function () {
    document.getElementById("contaner").innerHTML = '';
    const searchyapping = document.getElementById('inputtext').value.trim();
    if (!allCountriesList.includes(searchyapping)) {
      alert("Please enter a valid city name");
      return;
    }

    
    if (!/^[a-zA-Z\u0600-\u06FF\s-]{2,50}$/.test(searchyapping)) {
      alert("Please enter a valid city name");
      return;
    }

    const main = document.querySelectorAll('main');
    main.forEach(mainele => mainele.classList.add('hide'));
    AboutusPage.classList.remove('show');
    Supportpage.classList.remove('show');
    document.getElementById('weatherStats').classList.add('show');
    searchingbox.classList.toggle('show');

    fetch('https://worldweatherbackend.onrender.com/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: searchyapping })
    })
      .then(res => res.json())
      .then(json => {
        document.getElementById('city').textContent = json.city;
        document.getElementById('feels_like').textContent = `${Math.round(json.feels_like)}°`;
        document.querySelectorAll('#temp').forEach(ele => {
          ele.textContent = `${Math.round(json.temp)}°`;
        });
        document.getElementById('humidity').textContent = json.humidity;
        document.getElementById('wind_speed').textContent = `${(json.wind_speed * 3.6).toFixed(1)} km/h`;
        document.getElementById('description').textContent = json.description;
        document.querySelectorAll('#weathericon').forEach(ele => {
          ele.src = json.icon;
        });
      })
      .catch(err => {
        console.log('Error: ' + err);
      });

    fetch('https://worldweatherbackend.onrender.com/forecast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: searchyapping })
    })
      .then(res => res.json())
      .then(json => {
        json.forEach(ele => {
          const newforcast = document.createElement('div');
          const day = document.createElement('p');
          day.textContent = ele.day;
          const img = document.createElement('img');
          img.id = 'weathericon';
          img.src = ele.icon;
          img.alt = '';
          const temp = document.createElement('p');
          temp.textContent = Math.round(ele.temp) + '°';
          newforcast.appendChild(day);
          newforcast.appendChild(img);
          newforcast.appendChild(temp);
          document.getElementById("contaner").appendChild(newforcast);
        });
      })
      .catch(err => {
        document.getElementById('error-message').textContent = 'خطأ: ' + err;
        document.getElementById('forecast').style.display = 'none';
      });
  });
  //steff was cooking here
  AboutusPage = document.getElementById('Aboutus');
  AboutusButton = document.getElementById('aboutusbtn');
  AboutusButton.addEventListener('click', function () {
    const main = document.querySelectorAll('main');
    main.forEach(mainele => mainele.classList.add('hide'));
    AboutusPage.classList.add('show');
    document.getElementById('weatherStats').classList.remove('show');
    Supportpage.classList.remove('show');
  });

  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      const countriesByRegion = {};
       

      data.forEach(country => {
        const region = country.region || 'Other';
        if (!countriesByRegion[region]) countriesByRegion[region] = [];

        const safeName = country.name.common.replace(/[^a-zA-Z\u0600-\u06FF\s-]/g, '');
        countriesByRegion[region].push(safeName);
        allCountriesList.push(safeName); 
      });

      const select = document.getElementById('cities');
      for (const region in countriesByRegion) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = region;
        countriesByRegion[region].sort().forEach(countryName => {
          const option = document.createElement('option');
          option.value = countryName;
          option.textContent = countryName;
          optgroup.appendChild(option);
        });
        select.appendChild(optgroup);
      }

      
    });
    Supportbtn = document.getElementById('supportbtn')
    Supportpage = document.getElementById('Support')
    Supportbtn.addEventListener('click', function () {
      const main = document.querySelectorAll('main');
      main.forEach(mainele => mainele.classList.add('hide'));
      AboutusPage.classList.remove('show');
      document.getElementById('weatherStats').classList.remove('show');
      Supportpage.classList.add('show');
  });
  instagramBtn = document.getElementsById('instgram_page_btn');
  const instagramPage = "https://www.instagram.com/moonxd122/"
  instagramBtn.addEventListener('click', function(){
    window.open(instagramPage,'_blank')
  });
});
/**
 * effects 
 * $('.demo').hide(2000) 
 *  $('.demo').show(2000) 
 *  $('.demo').toggle(2000) 
 * $('.demo').slideDown(2000) 
 *  $('.demo').slideUp(2000) 
 *  $('.demo').slideToggle(2000) 
 *  $('.demo').fadeIn(2000) 
 *  $('.demo').fadeOut(2000) 
 * $('.demo').fadeToggle(2000) 
 * $('.demo').fadeTo(2000,0) 
 */


function showCardInfo(){
    $('.overlay').show(2000)

}

// $('.item').mouseenter(showCardInfo)

let menu = document.querySelector('.menu')
let menuBtn = document.querySelector('.menu-btn')
let links = document.querySelectorAll('.links p')
let serchInput = document.querySelector('#search')

async function displayData() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=141f3214af9bc8da310d5cdd92c68b2e`);
    const myData = await response.json();
    console.log(myData);
    for (let i = 0; i < myData.results.length; i++) {
        let cartona = `
        
      <div class="col-md-4">
      <div class="item w-90 mx-auto position-relative">
        <div class="img-box rounded overflow-hidden">
          <img class="w-100" src="https://image.tmdb.org/t/p/w500${myData.results[i].poster_path}" alt="movie poster">
        </div>
        <div class="overlay">
          <h1 class=" title mb-5">${myData.results[i].title}</h1>    
               <p class=" desc">${myData.results[i].overview}</p>
               <p class=" date"><span class="fst-normal">Release Date<span> : ${myData.results[i].release_date}</span></span></p>
               <h3 class="rate "><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i></h3>
               <h3 class="rate  vote">${myData.results[i].vote_average.toFixed(1)}</h3>
               
        </div>
      </div>
    </div>

        `

        

        
        document.querySelector('.movies-list').innerHTML += cartona;
        
    }

}
displayData()


menuBtn.addEventListener('click', function(){
    if(menu.classList.contains('hide')){

        menu.classList.remove('hide')
        menu.classList.add('show')
        menuBtn.innerHTML='<i class="fa-solid fa-xmark"></i>';
    } else{

        menu.classList.remove('show')
        menu.classList.add('hide')
        menuBtn.innerHTML='<i class="fa-solid fa-bars"></i>';

    }
})

console.log(links );



for (let i = 0; i < links.length; i++) {
    
    links[i].addEventListener('click', function(e){
        var attr = e.target.getAttribute('attr')
        getData(attr)
        console.log(attr);
    })
    
}

async function getData(term) {
    if (term == 'trending' ) {
        APIsrc = `https://api.themoviedb.org/3/trending/movie/day?api_key=141f3214af9bc8da310d5cdd92c68b2e`
    }else{
        APIsrc = `https://api.themoviedb.org/3/movie/${term}?api_key=141f3214af9bc8da310d5cdd92c68b2e`
    }
    const response = await fetch(APIsrc);
    const myData = await response.json();


    document.querySelector('.movies-list').innerHTML = '';
    
    

    for (let i = 0; i < myData.results.length; i++) {
        let cartona = `
        
      <div class="col-md-4">
      <div class="item w-90 mx-auto position-relative">
        <div class="img-box rounded overflow-hidden">
          <img class="w-100" src="https://image.tmdb.org/t/p/w500${myData.results[i].poster_path}" alt="movie poster">
        </div>
        <div class="overlay">
          <h1 class=" title mb-5">${myData.results[i].title}</h1>    
               <p class=" desc">${myData.results[i].overview}</p>
               <p class=" date"><span class="fst-normal">Release Date<span> : ${myData.results[i].release_date}</span></span></p>
               <h3 class="rate "><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i></h3>
               <h3 class="rate  vote">${myData.results[i].vote_average.toFixed(1)}</h3>
               
        </div>
      </div>
    </div>

        `

        

        
        document.querySelector('.movies-list').innerHTML += cartona;

        
    }
    
}

async function serchMovie(term){
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=141f3214af9bc8da310d5cdd92c68b2e`);
    const myData = await response.json();

    document.querySelector('.movies-list').innerHTML = '';

    for (let i = 0; i < myData.results.length; i++) {
        let cartona = `
        
      <div class="col-md-4">
      <div class="item w-90 mx-auto position-relative">
        <div class="img-box rounded overflow-hidden">
          <img class="w-100" src="https://image.tmdb.org/t/p/w500${myData.results[i].poster_path}" alt="movie poster">
        </div>
        <div class="overlay">
          <h1 class=" title mb-5">${myData.results[i].title}</h1>    
               <p class=" desc">${myData.results[i].overview}</p>
               <p class=" date"><span class="fst-normal">Release Date<span> : ${myData.results[i].release_date}</span></span></p>
               <h3 class="rate "><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i><i class="fa-solid fa-star text-warning fs-6"></i></h3>
               <h3 class="rate  vote">${myData.results[i].vote_average.toFixed(1)}</h3>
               
        </div>
      </div>
    </div>

        `

        

        if(myData.results[i].poster_path == null && myData.results[i].backdrop_path == null)
    {
        //movieImage = `assets/images/default-movie.jpg`;
        console.log('imagen not found');
    }
        
        document.querySelector('.movies-list').innerHTML += cartona;
        
    }

}

serchInput.addEventListener('input', function(){
    
    if(serchInput.value.trim() !== ''){
        serchMovie(serchInput.value);
      

    } else {
        document.querySelector('.movies-list').innerHTML = '';
         displayData();
        console.log('its empty');
    }


})



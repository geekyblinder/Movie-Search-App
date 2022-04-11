const api='api_key=0388d3fc993b98910f3918d3d41bee01';
const baseurl='https://api.themoviedb.org/3';
const apiurl=baseurl+'/discover/movie?sort_by=popularity.desc&'+api;
const imgurl='https://image.tmdb.org/t/p/w500';
const main=document.getElementById('main');
const form=document.getElementById('form');
const searchurl=baseurl+"/search/movie?"+api;
const search=document.getElementById('search');
getmovies(apiurl);

function getmovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        showmovies(data.results);

    })}
    function showmovies(data)
    {
        main.innerHTML='';
        data.forEach(movie=>{
            const{title,poster_path,vote_average,overview}=movie;
            const movieel=document.createElement('div');
            movieel.classList.add('movie');
            movieel.innerHTML=`
            <img src="${imgurl+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getcolor(vote_average)}">${vote_average}</span>

            </div>
            <div class="overview">
                <h3>Overview</h3>
               ${overview}
            </div>
            `
            main.appendChild(movieel);
        })
    }
    function getcolor(vote){
        if(vote>=8)
        return "green";
        else if(vote>=5 )
        return "orange";
        else
        return "red";

    }

    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const searchterm=search.value;
        if(searchterm){
            getmovies(searchurl+'&query='+searchterm)
        }
        else{
            getmovies(apiurl);
        }
    }
    )
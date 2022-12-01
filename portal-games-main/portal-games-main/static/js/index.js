
const API_KEY  = 'a91e100ab6d044c58b8f9b91b217a887';
const BASE_API_URL = 'https://api.rawg.io/api/';


let listaGeneros = [];
let listaEmCartaz = [];

function carregaGeneros() {
	let selectGenero = document.getElementById("destaque-categorias")
	let resGeneros = JSON.parse(this.responseText);
	console.log(resGeneros);
	for (i = 0; i < resGeneros.results.length; i++) {
		let genero = resGeneros.results[i];
		listaGeneros[genero.id] = genero.name;
		selectGenero.innerHTML += `<option value="${genero.id}">${genero.name}</option>`;
	}
}

function exibeFilmesEmCartaz() {
	let carousel = document.querySelector('#carousel-lancamentos .carousel-inner');
	let texto = '';

	let dados = JSON.parse(this.responseText);
	
	for (i = 0; i < 10; i++) {
		let game = dados.results[i];
		

		let estreia = new Date(game.released);

		if (i == 0) {
			texto += `<div class="carousel-item active">`;
		} else {
			texto += `<div class="carousel-item">`;
		}
		
	

		texto += `
				<div class="container">
					<div class="row">
						<div class="col-lg-6 lancamento-poster">
							<a  class="text-info" href="./game.html?id=${game.id}">
								<img src="${game.background_image}" >
							</a>
						</div>
						<div class="col-lg-6">
							<h4>
								<strong>
									<a  class="text-info" href="./game.html?id=${game.id}">
										${game.name}
										<small class="text-info"><i class="fa fa-link" aria-hidden="true"></i></small>
									</a>
								</strong>
								<small class="text-info float-right">
									${game.rating} <i class="fa fa-star"></i>
								</small>
							</h4>
							<div class="row">
								<div class="col-12">
									<strong>Gêneros: </strong> ${game.genres.map(genre => genre.name).join(", ")}
								</div>
							</div>
							<div class="row">
								<div class="col-12">
									<strong>Estreia: </strong> ${estreia.toLocaleDateString()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

		acrescentaAvaliacoes(game);
	};
	
	
	carousel.innerHTML = texto;
}

function acrescentaAvaliacoes(game) {
	let destaque = document.querySelector('.cards-avaliacao');
	
	let texto = '';
	
		let rating = game.ratings;

		texto = `
			<div class="col-12 col-md-6 col-lg-4">
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-2">
								<i class="fa fa-user-circle fa-2x"></i>
							</div>
							<div class="col-10">
								<h5 class="card-title">${game.name}</h5>
								<ul>
									<li> Excepcional 	-  ${rating[0].percent} </li>
									<li> Recomendado 	-  ${rating[1].percent} </li>
									<li> Ruim 		 	-  ${rating[2].percent} </li>
									<li> Parei de jogar -  ${rating[3].percent} </li>

								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	

	destaque.innerHTML += texto;
}

function findInArray(array, id) {
	for (i = 0; i < array.length; i++) {
		if (array[i][0] === id){
			return array[i][1];
		}
	}
}

function exibeFilmesEmDestaque() {
	let destaque = document.querySelector('.filmes-destaque');
	let texto = '';

	let dados = JSON.parse(this.responseText);

	for (i = 0; i < 4; i++) {
		let filme = dados.results[i];
		if (filme.adult){
			i--;
			continue;
		}
		
		let estreia = new Date(filme.release_date);

		texto += `
			<div class="filme-destaque col-12 col-md-6 col-lg-3 thumbnail ">
				<a  href="./game.html?id=${filme.id}">
					<img src="${BASE_IMG_URL}${filme.poster_path}" alt="${filme.title}">
				</a>
				<p>
					<strong>${filme.title}</strong> (${estreia.getFullYear()})
					<small class="text-info float-right">
						${filme.vote_average} <i class="fa fa-star"></i>
					</small>
				</p>
			</div>
		`;
	};

	destaque.innerHTML = texto;
}




function buscaInformacoesIniciais() {
	let xhr = new XMLHttpRequest();
	xhr.onload = exibeFilmesEmCartaz;
	xhr.open("GET", `${BASE_API_URL}games?key=${API_KEY}`);
	xhr.send();

	let xhrGeneros = new XMLHttpRequest();
	xhrGeneros.onload = carregaGeneros;
	xhrGeneros.open("GET", `${BASE_API_URL}genres?key=${API_KEY}`);
	xhrGeneros.send();
	
}


document.getElementById("pesquisa-form").addEventListener("submit", function(e) {
	window.location.href = `pesquisa.html?query=${document.getElementById("input-search").value}`;
	e.preventDefault();
});

buscaInformacoesIniciais();

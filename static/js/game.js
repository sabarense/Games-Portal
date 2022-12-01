const API_KEY  = 'a91e100ab6d044c58b8f9b91b217a887';
const BASE_API_URL = 'https://api.rawg.io/api/';


function exibeJogo() {
	let game = JSON.parse(this.responseText);
	console.log('to dentro de exibeJogo', game);
	let sectionGame = document.getElementById("section-filme");

	if (game.status_code < 200 || game.status_code > 300) {
		sectionGame.innerHTML = `<i class="fa fa-warning"></i> O game não foi encontrado. Por favor, tente outro título.`;
		document.querySelector(".titulo-filme").innerText = `Game Não Encontrado`;
		return;
	}

	document.querySelector(".titulo-filme").innerText = game.name;

	let estreia = new Date(game.released);
	let generos = [];
	for (i = 0; i < game.genres.length; i++) {
		generos.push(game.genres[i].name);
	}
	
	
	let produtoras = '';
	for (i = 0; i < game.publishers.length; i++) {
		let produtora = game.publishers[i];
		produtoras+= produtora.name;
	}

	sectionGame.innerHTML = `
		<div class="d-block row">
			<div class="col-lg-5 lancamento-poster d-block">
				<img src="${game.background_image}">
			</div>
			<div class="col-lg-7">
				<h2>
					<strong class="text-info">${game.name}</strong>
					<small class="text-info float-right">
						${game.rating} <i class="fa fa-star"></i>
						<span class="votos">(${game.ratings_count} votos)</span>
					</small>
				</h2>
				<br>
				<div class="row">
					<div class="col-12">
						<strong>Título: </strong>${game.name_original}
					</div>
				</div>
				<div class="row">
					<div class="col-12 Game-sinopse">
						<strong>Sinopse: </strong>${game.description}
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-md-6">
						<strong>Gêneros: </strong>${generos.join(",")}
					</div>
					<div class="col-12 col-md-6">
						<strong>Data de Estreia: </strong>${estreia.toLocaleDateString()}
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-md-6">
						<strong>Site: </strong><a target="_blank" href="${game.metacritic_url}">${game.metacritic_url}</a>
					</div>
					<div class="col-12 col-md-6">
						<strong>Tempo de jogo: </strong>${game.playtime} horas
					</div>
					<div class="col-12 col-md-6">
						<strong>Editora: </strong>${produtoras} 
					</div>
				</div>
			</div>
		</div>
	`;
}

const urlParams = new URLSearchParams(window.location.search);
const idGame = urlParams.get('id');

let xhrGame = new XMLHttpRequest();
xhrGame.onload = exibeJogo;
xhrGame.open('GET', `${BASE_API_URL}games/${idGame}?key=${API_KEY}`);
xhrGame.send();

document.getElementById("pesquisa-form").addEventListener("submit", function(e) {
	window.location.href = `pesquisa.html?query=${document.getElementById("input-search").value}`;
	e.preventDefault();
});

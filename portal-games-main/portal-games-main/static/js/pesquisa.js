const API_KEY  = 'a91e100ab6d044c58b8f9b91b217a887';
const BASE_API_URL = 'https://api.rawg.io/api/';


const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');
const page = urlParams.get('page');

function exibeLista() {
	let lista = JSON.parse(this.responseText);
	console.log(lista);
	let sectionPesquisa = document.getElementById("section-pesquisa");

	if (lista.status_code < 200 || lista.status_code > 300) {
		document.querySelector(".titulo-pesquisa").innerText = `Conteúdo Não Encontrado`;
		sectionPesquisa.innerHTML = `<i class="fa fa-warning"></i> Não foi encontrado nenhum conteúdo correspondente à pesquisa. Por favor, tente com outros termos.`;
		return;
	}

	document.querySelector(".titulo-pesquisa").innerText = `Resultados para "${query}"`;

	let texto = `<div class="list-group">`;

	for (i = 0; i < lista.results.length; i++) {
		let registro = lista.results[i];
		
				var data = '';
				
					data = new Date(registro.released);
					data = `<small>${data.toLocaleString().substring(0,10)}</small>`;
				

				texto += `
					<a href="./game.html?id=${registro.id}" class="list-group-item list-group-item-action flex-column align-items-start">
						<div class="row">
							<div class="col-12 col-md-1">
								<img src="${registro.background_image?registro.background_image:DEFAULT_IMAGE}">
							</div>
							<div class="col-12 col-md-11">	
								<div class="d-flex w-100 justify-content-between">
									<h5 class="mb-1">${registro.name}</h5>
									${data}
								</div>
								<p class="mb-1">${registro.genres.map(genre => genre.name).join(",")}</p>
								<small>Game</small>
							</div>
						</div>
					</a>
				`;
		
	}

	let paginas = '';
	for (i = 1; i <= lista.total_pages; i++) {
		paginas += `
			<li class="page-item ${lista.page==i?"disabled":""}">
				<a class="page-link text-info" href="./pesquisa.html?query=${query}&page=${i}">${i}</a>
			</li>
		`;
	}

	texto += `
	</div>
	<div class="row">
		<div class="col-12 d-flex justify-content-center">
			<nav aria-label="Page navigation example">
				<ul class="pagination">
					${paginas}
				</ul>
			</nav>
		</div>
	</div>
	`;

	sectionPesquisa.innerHTML = texto;
	console.log(lista);
}

let xhrPesquisa = new XMLHttpRequest();
xhrPesquisa.onload = exibeLista;
xhrPesquisa.open('GET', `${BASE_API_URL}games?search=${query}&key=${API_KEY}&page_size=20`);
xhrPesquisa.send();


document.getElementById("pesquisa-form").addEventListener("submit", function(e) {
	window.location.href = `pesquisa.html?query=${document.getElementById("input-search").value}`;
	e.preventDefault();
});
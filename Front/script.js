const formCadastro = document.getElementById("cadastro-form");
const hotelApiURL = "http://localhost:5154/api/Hoteis";
const cardsContainer = document.getElementById("cards");

async function buscarHoteis() {
  try {
    const resposta = await fetch(hotelApiURL);
    if (!resposta.ok) {
      throw new Error("Erro ao buscar hotéis: " + resposta.status);
    }
    const dados = await resposta.json();
    cardsContainer.innerHTML = "";
    dados.forEach((dado) => {
      console.log(dado.nome);
      console.log(dado.qtdEstrelas);
      let hotelElement = document.createElement("div");

      hotelElement.innerHTML = `
                <h2>${dado.nome}</h2>
                <p>Estrelas: ${dado.qtdEstrelas}</p> 
                <button onclick="mostrarDetalhes(${dado.id})">Ver Detalhes</button>
                <div id="detalheshotel${dado.id}" style="display: none;">
                </div>
            `;
      cardsContainer.appendChild(hotelElement);
    });
  } catch (error) {
    console.log("Erro:", error);
  }
}
buscarHoteis();

async function cadastroHotel(event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const qtdEstrelas = parseFloat(document.getElementById("estrelas").value);

  try {
    const resposta = await fetch(hotelApiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        qtdEstrelas: qtdEstrelas,
      }),
    });
    if (!resposta.ok) {
      throw new Error("Erro ao cadastrar hotel: " + resposta.status);
    }
    const mensagem = await resposta.text();
    alert("Hotel cadastrado com sucesso: " + mensagem);

    formCadastro.reset();
    await buscarHoteis();
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao cadastrar hotel: " + error.message);
  }
}
async function mostrarDetalhes(hotelId){
const detalhesDiv = document.getElementById(`detalheshotel${hotelId}`);
if(detalhesDiv.style.display === "none"){
  detalhesDiv.style.display = "block";
    mostrarQuarto(hotelId)
}
else{
  detalhesDiv.style.display ="none";
  detalhesDiv.innerHTML =""; //Limpa os detalhes para evitar duplicação
}
}

async function mostrarQuarto(hotelId) {
  try
  {
    const response = await fetch(`${hotelApiURL}/${hotelId}`);
    if (response.ok){
      const dados = await response.json();
      console.log("quartos: ", dados.quartos);
      const detalhesDiv = document.getElementById(`detalheshotel${hotelId}`);
      let quartosHTML ="<h3>Quartos: </h3>";
      console.log("quartos:", dados.quartos);
      dados.quartos.forEach((quarto) => {
        quartosHTML += `<div>
          <h5>Tipo: ${quarto.tipo}</h5>
          <p>Preço: R$${quarto.preco}</p>
        </div>`;
              detalhesDiv.innerHTML += quartosHTML;
      });


    }
  }
   catch (error){
      console.log("Erro ao carregar quartos: ", error);
    }
}

formCadastro.addEventListener("submit", cadastroHotel);
buscarHoteis();

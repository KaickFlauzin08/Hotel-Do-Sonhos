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
  formCadastro.addEventListener("submit", cadastroHotel);
buscarHoteis();


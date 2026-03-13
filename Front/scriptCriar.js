
      const formCadastroQuarto = document.getElementById("Cadastrar-quarto");
      const quartoApiURL = "http://localhost:5154/api/Quartos";
      const cardsContainer = document.getElementById("cards");

      async function buscarQuartos() {
        try {
          const resposta = await fetch(quartoApiURL);
          if (!resposta.ok) {
            throw new Error("Erro ao buscar quartos: " + resposta.status);
          }
          const dados = await resposta.json();
          cardsContainer.innerHTML = "";
          dados.forEach((dado) => {
            console.log(dado.preco);
            console.log(dado.tipo);
            let quartoElement = document.createElement("div");

            quartoElement.innerHTML = `
                <h2>Tipo: ${dado.tipo}</h2>
                <p>Preço: R$ ${dado.preco}</p>
            `;
            cardsContainer.appendChild(quartoElement);
          });
        } catch (error) {
          console.log("Erro:", error);
        }
      }
      buscarQuartos();

      async function cadastroQuarto(event) {
        event.preventDefault();
        const tipo = document.getElementById("tipo").value;
        const preco = document.getElementById("preco").value;
        const hotelId = document.getElementById("hotelId").value;


        try {
          const resposta = await fetch(quartoApiURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tipo: tipo,
              preco: preco,
              hotelId: hotelId
            }),
          });
          if (!resposta.ok) {
            throw new Error("Erro ao cadastrar quarto: " + resposta.status);
          }
          const mensagem = await resposta.text();
          alert("Quarto criado com sucesso: " + mensagem);

          formCadastroQuarto.reset();
          await buscarQuartos();
        } catch (error) {
          console.log("error");
          alert("Deu erro");
        }
      }
      formCadastroQuarto.addEventListener("submit", cadastroQuarto);
      buscarQuartos();

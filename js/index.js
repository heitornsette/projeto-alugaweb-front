let imoveis = []

function abrirMenu() {
  let overlay = document.querySelector("#overlay")
  let menu = document.querySelector("#menu")

  overlay.classList.remove("invisible", "opacity-0")
  menu.classList.remove("-left-[80%]")
  menu.classList.add("left-0")
}

function fecharMenu() {
  let overlay = document.querySelector("#overlay")
  overlay.classList.add("invisible", "opacity-0")
  menu.classList.remove("left-0")
  menu.classList.add("-left-[80%]")
}

async function buscarImoveis() {
  try {
    const request = await fetch("http://localhost:3000/imoveis")

    if (!request.ok) {
      alert("Falha ao buscar imóveis")
      return
    }

    imoveis = await request.json()

    carregarImoveis(imoveis)
  } catch (error) {
    alert(`Aviso: ${error.message}`)
  }
}

buscarImoveis()

/**
 * Função para carregar os imoveis
 * @param {Array} listaDeImoveis array de imoveis
 */

function carregarImoveis(listaDeImoveis) {
  let cards = document.querySelector("#cards")
  cards.innerHTML = ""

  listaDeImoveis.map((imovel) => {
    cards.innerHTML += `
            <div class="border border-gray-300 rounded-2xl flex mb-4 flex-col md:flex-row overflow-hidden">
                <img src="${imovel.imagem}" alt="imagemCasa" class="w-100 h-72 object-cover">
                <div class="p-4 flex-1">
                    <div class="flex justify-between mb-8">
                        <div>
                            <h4 class="font-semibold text-[#595959]">${imovel.endereco}, ${imovel.numero} ${imovel.complemento}</h4>
                            <h4 class="font-semibold text-[#595959]">
                                ${imovel.bairro}, ${imovel.cidade}/${imovel.estado}
                            </h4>
                        </div>
                        <div class="bg-[#E04300]/20 w-14 h-14 rounded-lg flex items-center justify-center">
                            <box-icon name="heart" class="fill-laranja"></box-icon>
                        </div>
                    </div>
                    <div class="flex justify-between mb-8">
                        <div class="flex-1">
                            <h4 class="font-semibold text-[#595959]">${imovel.descricao}</h4>
                        </div>
                        <!-- escondido no mobile first -->
                        <h1 class="hidden md:block text-[#E04300] font-bold text-2xl">R$ ${imovel.valor}</h1>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex gap-5">
                            <h5 class="text-[#959595] text-sm">${imovel.metragem}m²</h5>
                            <h5 class="text-[#959595] text-sm">${imovel.quartos} Quartos</h5>
                            <h5 class="text-[#959595] text-sm">${imovel.garagens} Garagem</h5>
                            <h5 class="text-[#959595] text-sm">${imovel.banheiros} Banheiros</h5>
                        </div>
                        <div
                            class="hidden md:flex w-24 h-12 bg-[#E04300] text-white rounded-lg justify-center items-center">
                            Contatar
                        </div>
                    </div>
                    <div class="flex justify-between items-center mt-5">
                        <!-- existe no mobile! -->
                        <h1 class="md:hidden text-[#E04300] font-bold text-2xl">R$ 5.000</h1>
                        <div
                            class="md:hidden w-24 h-12 bg-[#E04300] text-white rounded-lg flex justify-center items-center">
                            Contatar
                        </div>
                    </div>
                </div>
            </div>
        `
  })
}

async function filtrarQuartos(quartos) {
  const request = await fetch("http://localhost:3000/imoveis")

  imoveis = await request.json()

  let imoveisFiltrados = imoveis.filter((imoveis) => imoveis.quartos == quartos)
  carregarImoveis(imoveisFiltrados)
}

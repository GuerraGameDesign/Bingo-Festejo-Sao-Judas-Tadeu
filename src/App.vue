<template>
  <div class="h-[80vh]">
    <!-- Header com os botões e o dropdown -->
    <header class="flex justify-end gap-2 p-4">
      <!--
      <Button
        label="Sortear Número"
        @click="
          sortearNumero(), (modalDoSorteio = true), (removerNumeroManualmente = false)
        "
      />
      -->
      <Button @click="info = true">
        <span class="border border-white rounded-full font-semibold px-2.5"> i </span>
      </Button>
      <Button
        label="Escolher Número"
        @click="(removerNumeroManualmente = true), (modalDoSorteio = true)"
      />
      <AutoComplete
        v-model="orientacao"
        :suggestions="orientacoes"
        field="icone"
        placeholder="Orientação"
        optionLabel="rotulo"
        dropdown
        @complete="buscarOrientacoes"
      >
        <template #option="slotProps">
          <div class="flex items-center gap-2">
            <div v-html="slotProps.option.icone" class="text-xl"></div>
            <div>{{ slotProps.option.rotulo }}</div>
          </div>
        </template>
      </AutoComplete>
    </header>
    <!-- bingo -->
    <main
      class="flex w-full justify-center p-0 m-0"
      :class="orientacao.id == 2 ? '' : ' h-full items-center'"
    >
      <div class="grid gap-2" :class="orientacao.id == 2 ? 'grid-cols-5' : 'grid-rows-5'">
        <div
          v-for="coluna in bingo"
          :key="coluna.letra"
          class="rounded-lg"
          :class="orientacao.id == 2 ? '' : 'flex'"
        >
          <h2
            class="flex items-center justify-center font-bold text-primary-500 w-14 h-14"
            :class="orientacao.id == 2 ? 'text-2xl' : 'text-4xl p-4'"
          >
            {{ coluna.letra }}
          </h2>
          <ul class="list-none p-0 m-0" :class="orientacao.id == 2 ? '' : 'flex'">
            <li
              v-for="numero in coluna.numeros"
              :key="numero"
              class="flex justify-center items-center mx-1 font-bold border-primary-100 p-1 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-500 text-primary-100 cursor-pointer hover:bg-primary-400 select-none"
              :class="
                orientacao.id == 2
                  ? 'text-xl md:text-2xl border-t-1 md:w-[39px] md:h-[39px]'
                  : 'border-l-1 text-4xl p-4'
              "
              @dblclick="onNumeroDblClick(coluna.letra, numero)"
            >
              {{ numero }}
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
  <Dialog
    v-model:visible="modalDoSorteio"
    header="&nbsp;"
    :style="
      removerNumeroManualmente
        ? {
            width: '40rem',
          }
        : {
            width: '20rem',
          }
    "
    :pt="{
      pcCloseButton: {
        class: 'bg-cyan-200! text-white!',
      },
    }"
    modal
  >
    <main v-if="removerNumeroManualmente" class="flex w-full justify-center p-0 m-0">
      <div class="grid grid-cols-5 gap-2">
        <div v-for="coluna in colunas" :key="coluna.letra" class="rounded-lg">
          <h2 class="text-center font-bold w-20 text-5xl rounded-t-md">
            {{ coluna.letra }}
          </h2>
          <ul class="list-none p-0 m-0">
            <li
              v-for="numero in coluna.numeros"
              :key="numero"
              class="text-center py-2.5 font-bold my-1 border-white p-1 w-14 h-14 text-2xl border-t-1 bg-primary-400 hover:bg-primary-500 rounded-full mx-auto cursor-pointer select-none"
              @click="removerNumero(coluna.letra, numero)"
            >
              {{ numero }}
            </li>
          </ul>
        </div>
      </div>
    </main>
    <h1 v-else class="flex justify-center items-center">
      <p class="text-8xl font-bold">{{ numeroSorteado }}</p>
    </h1>
  </Dialog>
  <Dialog v-model:visible="info" header="Informações" :style="{ width: '30rem' }" modal>
    <p>
      Para escolher um número é só clicar em "Escolher Número" e clicar no número
      sorteado. Para remover um número do bingo é só dar dois cliques nele.
    </p>
  </Dialog>
</template>

<script>
import AutoComplete from "primevue/autocomplete";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

export default {
  components: {
    AutoComplete,
    Button,
    Dialog,
  },
  data() {
    return {
      colunas: [
        { letra: "B", numeros: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
        {
          letra: "I",
          numeros: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        },
        {
          letra: "N",
          numeros: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        },
        {
          letra: "G",
          numeros: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        },
        {
          letra: "O",
          numeros: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
        },
      ],
      orientacoes: [],
      modalDoSorteio: false,
      numeroSorteado: false,
      removerNumeroManualmente: false,
      orientacao: {
        id: null,
        rotulo: "",
      },
      bingo: [
        { letra: "B", numeros: [] },
        { letra: "I", numeros: [] },
        { letra: "N", numeros: [] },
        { letra: "G", numeros: [] },
        { letra: "O", numeros: [] },
      ],
      info: false,
    };
  },
  mounted() {
    if (window.innerWidth <= 768) {
      this.orientacao = { id: 2, rotulo: "Vertical" };
    } else {
      this.orientacao = { id: 1, rotulo: "Horizontal" };
    }
  },
  methods: {
    // a função abaixo devolve um número para a coluna
    onNumeroDblClick(letra, numero) {
      // o número volta para a coluna
      this.colunas.forEach((coluna) => {
        if (coluna.letra === letra) {
          coluna.numeros.push(numero);
          coluna.numeros.sort((a, b) => a - b);
        }
      });
      // o número é apagado do bingo
      this.bingo.forEach((colunaDoBingo) => {
        if (colunaDoBingo.letra === letra) {
          colunaDoBingo.numeros.splice(colunaDoBingo.numeros.indexOf(numero), 1);
        }
      });
    },
    // a função abaixo irá sortear os números das colunas
    sortearNumero() {
      if (this.colunas.length > 0) {
        // aqui uma coluna aleatória é escolhida
        const coluna = Math.floor(Math.random() * this.colunas.length);
        const numerosColuna = this.colunas[coluna].numeros;
        // aqui um número aleatório é escolhido e removido
        const numeroSorteado =
          numerosColuna[Math.floor(Math.random() * numerosColuna.length)];
        numerosColuna.splice(numerosColuna.indexOf(numeroSorteado), 1);
        // adiciona o número a cartela de bingo e ordena ela
        this.bingo.forEach((colunaDoBingo) => {
          if (colunaDoBingo.letra === this.colunas[coluna].letra) {
            colunaDoBingo.numeros.push(numeroSorteado);
            this.numeroSorteado = `${this.colunas[coluna].letra} ${numeroSorteado}`;
            colunaDoBingo.numeros.sort((a, b) => a - b);
          }
        });
        // se todos os números de uma colunas foram removidos ela é removida
        if (this.colunas[coluna].numeros.length === 0) {
          this.colunas.splice(coluna, 1);
        }
      }
    },
    removerNumero(letra, numero) {
      // procura a coluna escolhida
      this.colunas.forEach((coluna) => {
        if (coluna.letra == letra) {
          // remove o número escolhido
          const index = coluna.numeros.indexOf(numero);
          if (index !== -1) {
            coluna.numeros.splice(index, 1);
          }
          // se todos os número de uma coluna foram removidos ela é removida
          if (coluna.numeros.length === 0) {
            this.colunas.splice(this.colunas.indexOf(coluna), 1);
          }

          // adiciona o número na cartela de bingo e ordena ela
          this.bingo.forEach((colunaDoBingo) => {
            if (colunaDoBingo.letra === letra) {
              colunaDoBingo.numeros.push(numero);
              this.numeroSorteado = `${letra} ${numero}`;
              colunaDoBingo.numeros.sort((a, b) => a - b);
            }
          });
        }
      });
    },
    // retorna as orientações para o dropdown
    buscarOrientacoes() {
      this.orientacoes = [
        {
          id: 1,
          icone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 16H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/></svg>`,
          rotulo: "Horizontal",
        },
        {
          id: 2,
          icone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 19H7V5h10m0-4H7c-1.11 0-2 .89-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2"/></svg>`,
          rotulo: "Vertical",
        },
      ];
    },
  },
};
</script>

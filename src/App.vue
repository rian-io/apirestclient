<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          Campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
        </li>
      </ul>

      <form @submit.prevent="salvar">
          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="produto.name">
          <label>Quantidade</label>
          <input type="number" placeholder="QTD" v-model="produto.amount">
          <label>Valor</label>
          <input type="text" placeholder="Valor" v-model="produto.price">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>QTD</th>
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="produto of produtos" :key="produto.id" >
            <td>{{ produto.name }}</td>
            <td>{{ produto.amount }}</td>
            <td>{{ produto.price }}</td>
            <td>
              <button @click="editar(produto)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(produto)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
        </tbody>      
      </table>
    </div>
  </div>
</template>

<script>
import Produto from './service/produtos'

export default {
  data() {
    return {
      produto: {
        id: '',
        name: '',
        amount: '',
        price: ''
      },
      produtos: [],
      errors: []
    }
  },
  mounted() {
    this.listar()
  },
  methods: {
    listar() {
      Produto.listar().then(res => {
        this.produtos = res.data
      });
    },

    salvar(){
      if (!this.produto.id) {
        Produto.salvar(this.produto).then(res => {
          alert('Salvo com sucesso!\n\n' + res.data.name)
          this.produto = {}
          this.errors = []
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      } else {
        Produto.atualizar(this.produto).then(res => {
          alert('Atualizado com sucesso!\n\n' + res.data.name)
          this.produto = {}
          this.errors = []
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
    },

    editar(produto) {
      this.produto = produto
    },

    remover(produto) {
      if (confirm('Deseja excluir o produto?')) {
        Produto.apagar(produto).then(res => {
          alert('Produto excluído' + res.data )
          this.listar()
          this.errors = []
        }).catch(e => {
          this.errors = e.data.errors
        })
      }
    }
  }
}
</script>

<style>

</style>

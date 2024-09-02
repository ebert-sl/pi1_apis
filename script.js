document.addEventListener('DOMContentLoaded', () => {
  const inputPokemon = document.getElementById('input-pokemon')
  const buttonPokemon = document.getElementById('button-pokemon')
  const imagePokemon = document.getElementById('image-pokemon')
  buttonPokemon.addEventListener('click', () => getPokemonImage(
    inputPokemon.value, 
    imagePokemon
  ))

  const inputCEP = document.getElementById('input-cep')
  const buttonCEP = document.getElementById('button-cep')
  buttonCEP.addEventListener('click', () => getAddress(
    inputCEP.value
  ))

  const inputGetPost = document.getElementById('input-getPost')
  const buttonGetPost = document.getElementById('button-getPost')
  buttonGetPost.addEventListener('click', () => getPost(
    inputGetPost.value
  ))

  const inputCreateTitlePost = document.getElementById('create-titlePost')
  const inputCreateBodyPost = document.getElementById('create-bodyPost')
  const inputCreateUserPost = document.getElementById('create-userPost')
  const buttonPost = document.getElementById('button-post')
  buttonPost.addEventListener('click', () => createPost(
    inputCreateTitlePost.value, 
    inputCreateBodyPost.value, 
    inputCreateUserPost.value
  ))

  const inputUpdateIDPost = document.getElementById('update-idPost')
  const inputUpdateTitlePost = document.getElementById('update-titlePost')
  const inputUpdateBodyPost = document.getElementById('update-bodyPost')
  const inputUpdateUserPost = document.getElementById('update-userPost')
  const buttonPut = document.getElementById('button-put')
  buttonPut.addEventListener('click', () => updatePost(
    inputUpdateIDPost.value,
    inputUpdateTitlePost.value, 
    inputUpdateBodyPost.value, 
    inputUpdateUserPost.value
  ))
})

async function getPokemonImage(pokemonName, imagePokemon) {
  const name = pokemonName.toLowerCase()
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Pokémon não encontrado')
    }
    const data = await response.json()
    imagePokemon.src = data.sprites.other.dream_world.front_default
  } catch (error) {
    alert(error.message)
  }
}

async function getAddress(cep) {
  const url = `http://viacep.com.br/ws/${cep}/json/`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('CEP não encontrado ou digitado incorretamente')
    }

    const data = await response.json()

    const logradouro = document.getElementById('logradouro')
    const complemento = document.getElementById('complemento')
    const unidade = document.getElementById('unidade')
    const bairro = document.getElementById('bairro')
    const localidade = document.getElementById('localidade')
    const estado = document.getElementById('estado')

    logradouro.innerText = 'Logradouro: ' + data.logradouro
    complemento.innerText = 'Complemento: ' + data.complemento
    unidade.innerText = 'Unidade: ' + data.unidade
    bairro.innerText = 'Bairro: ' + data.bairro
    localidade.innerText = 'Cidade: ' + data.localidade
    estado.innerText = 'Estado: '+ data.estado
  } catch (error) {
    alert(error.message)
  }
}

async function getPost(id) {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Não foi possível obter o post')
    }
    const data = await response.json()
    const postTitle = document.getElementById('getPostTitle')
    const postBody = document.getElementById('getPostBody')
    postTitle.innerText = data.title
    postBody.innerText = data.body
  } catch (error) {
    alert(error.message)
  }
}

async function createPost(title, body, idUser) {
  const url = 'https://jsonplaceholder.typicode.com/posts'
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: idUser
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    if(!response.ok) {
      throw new Error('Não foi possível criar o post')
    }
    const data = await response.json()
    const newPostTitle = document.getElementById('newPostTitle')
    const newPostUser = document.getElementById('newPostUser')
    const newPostBody = document.getElementById('newPostBody')
    newPostTitle.innerText = data.title
    newPostUser.innerText = 'User: ' + data.userId
    newPostBody.innerText = data.body
    alert('Post criado com sucesso!')
  } catch (error) {
    alert(error.message)
  }
}

async function updatePost(idPost, title, body, idUser) {
  const url = `https://jsonplaceholder.typicode.com/posts/${idPost}`
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        id: idPost,
        title: title,
        body: body,
        userId: idUser
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    if(!response.ok) {
      throw new Error('Não foi possível editar o post')
    }
    const data = await response.json()
    const updatedPostTitle = document.getElementById('updatedPostTitle')
    const updatedPostUser = document.getElementById('updatedPostUser')
    const updatedPostBody = document.getElementById('updatedPostBody')
    updatedPostTitle.innerText = data.title
    updatedPostUser.innerText = 'User: ' + data.userId
    updatedPostBody.innerText = data.body
    alert('Post editado com sucesso!')
  } catch (error) {
    alert(error.message)
  }
}
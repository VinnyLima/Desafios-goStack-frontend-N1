import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  
  /**
   * UseEffect: ira realizar a requisição dos repositorios 
   * onde os mesmos serão inseridos no array de repositorios
   */
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  /**
   * Essa função será responsavel por cadastrar o repositorio no
   * banco e depois atualizar o valor na listagem atraves do setRepositories()
   */
  async function handleAddRepository() {
    const response = await api.post('/repositories', {      
      title: 'ReactJD',
      url: 'www.setexemplos.com',      
      techs: ['nodejs', 'REactJS', 'REactNative']
    });   

    setRepositories([...repositories, response.data]);
  }

/**
 * Função irá remover um repositorio passando o id
 * aqui e usada a função filter para pesquisar o id especifco 
 * e depois realizar a exlusão.
 * 
 */
  async function handleRemoveRepository(id) {

    await api.delete(`/repositories/${id}`)
    setRepositories(repositories.filter(
      repos => repos.id !== id
    ))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repos =>
          <li key={repos.id}>
            {repos.title}
            <button onClick={() => handleRemoveRepository(repos.id)}>
              Remover
            </button>
          </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

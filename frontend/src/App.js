import React, {useState, useEffect} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [githubUserName, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      positionError => {
        console.log(positionError);
      }, {
        timeout: 30000,
      });
  }, []);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();
    const response = await api.post('/devs', {
      github_username: githubUserName,
      techs,
      latitude,
      longitude,
    });
    clearAllState();
    setDevs([...devs, response.data]);
  }

  function clearAllState() {
    setGithubUsername('');
    setTechs('');
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input
              id="github_username"
              name="github_username"
              required
              value={githubUserName}
              onChange={e => setGithubUsername(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              id="techs"
              name="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}/>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <li className="dev-item" key={dev._id}>
              <header>
                <img
                  src={dev.avatar_url}
                  alt={dev.name}/>
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no github</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

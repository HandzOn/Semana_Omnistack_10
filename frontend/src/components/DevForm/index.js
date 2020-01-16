import React, {useEffect, useState} from "react";

import './styles.css';

function DevForm({onSubmit}) {

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [githubUserName, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

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

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({
      githubUserName,
      techs,
      latitude,
      longitude
    });
    clearAllState();
  }

  function clearAllState() {
    setGithubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
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
  );
}

export default DevForm;


import React, { useState, useMemo } from 'react';
import data from '../data/data.json';
import Card from '../components/Card';
import FilterBar from '../components/FilterBar';
import useFilter from '../hooks/useFilter';
import '../styles/JSONData.css';

const JSONData = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedIntegrante, setSelectedIntegrante] = useState('');

  const { filtered, tipos, integrantes } = useFilter(data, { searchText, tipo: selectedTipo, integrante: selectedIntegrante });

  return (
    <div className="json-data-container">
      <h1>Datos desde Archivo JSON</h1>

      <FilterBar
        searchText={searchText}
        onSearchChange={setSearchText}
        tipos={tipos}
        integrantes={integrantes}
        selectedTipo={selectedTipo}
        onTipoChange={setSelectedTipo}
        selectedIntegrante={selectedIntegrante}
        onIntegranteChange={setSelectedIntegrante}
        onClear={() => { setSearchText(''); setSelectedTipo(''); setSelectedIntegrante(''); }}
        placeholder={'Buscar por título, integrante, tipo, director, artista o año...'}
      />

      <div className="api-cards">
        {filtered.map((item, index) => (
          <Card key={index}>
            <h3>{item.titulo}</h3>
            <p>Integrante: {item.integrante}</p>
            <p>Tipo: {item.tipo}</p>
            <p>Año: {item.año}</p>
            {item.director && <p>Director: {item.director}</p>}
            {item.artista && <p>Artista: {item.artista}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JSONData;
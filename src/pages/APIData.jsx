import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import Card from '../components/Card';
import { translateStatus, translateGender, translateSpecies } from '../utils/translate';
import '../styles/APIData.css';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import FilterBar from '../components/FilterBar';

const APIData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');

  const statusOptions = ['Alive', 'Dead', 'unknown'];
  const speciesOptions = ['Human', 'Alien', 'Humanoid', 'Robot', 'Cronenberg', 'Animal', 'Disease', 'Poopybutthole', 'Mythological Creature'];

  const statusOptionsForSelect = statusOptions.map(s => ({ value: s, label: translateStatus(s) }));
  const speciesOptionsForSelect = speciesOptions.map(s => ({ value: s, label: translateSpecies(s) }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const getUrl = () => {
    const base = `https://rickandmortyapi.com/api/character/`;
    const params = [];
    if (query) params.push(`name=${encodeURIComponent(query)}`);
    if (selectedStatus) params.push(`status=${encodeURIComponent(selectedStatus)}`);
    if (selectedSpecies) params.push(`species=${encodeURIComponent(selectedSpecies)}`);
    if (page) params.push(`page=${page}`);
    return `${base}?${params.join('&')}`;
  };

  const url = getUrl();
  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    setPage(1);
  }, [query, selectedStatus, selectedSpecies]);

  useEffect(() => {
    if (data && data.info && data.info.pages) {
      const total = data.info.pages;
      if (page > total) setPage(total);
    }
  }, [data, page]);


  const handleClear = () => {
    setSearchTerm('');
    setQuery('');
    setSelectedStatus('');
    setSelectedSpecies('');
    setPage(1);
  };


  const goPrev = () => setPage(p => Math.max(1, p - 1));
  const goNext = () => {
    const total = data && data.info ? data.info.pages : null;
    setPage(p => (total ? Math.min(total, p + 1) : p + 1));
  };

  const goFirst = () => setPage(1);
  const goLast = () => {
    const total = data && data.info ? data.info.pages : null;
    if (total) setPage(total);
  };

  const renderCard = (item) => (
    <Card key={item.id}>
      <img className="card-image" src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>Estado: {translateStatus(item.status)}</p>
      <p>Especie: {translateSpecies(item.species)}</p>
      <p>Género: {translateGender(item.gender)}</p>
    </Card>
  );

  return (
    <div className="api-data-container">
      <h1>Datos desde API Rick and Morty</h1>
      <form>
        <FilterBar
          searchText={searchTerm}
          placeholder='Buscar personaje por nombre'
          firstSelect='Estado'
          secondSelect='Especie'
          tipos={statusOptionsForSelect}
          integrantes={speciesOptionsForSelect}
          selectedTipo={selectedStatus}
          selectedIntegrante={selectedSpecies}
          onSearchChange={setSearchTerm}
          onTipoChange={setSelectedStatus}
          onIntegranteChange={setSelectedSpecies}
          onClear={handleClear}
          visibleButtonSearch={false}
        />

      </form>
      {loading && <Loader />}
      {error && (
        (typeof error === 'object' && error.status === 404)
          ? <div>No se encontraron resultados con los parámetros establecidos.</div>
          : <div>Error: {error.message || error}</div>
      )}
      {data && data.results && (
        <div className="api-cards">
          {data.results.map(renderCard)}
        </div>
      )}
      {data && !data.results && data.name && renderCard(data)}

      {data && data.info && (
        <Pagination
          page={page}
          total={data.info.pages}
          onPrev={goPrev}
          onNext={goNext}
          onFirst={goFirst}
          onLast={goLast}
          loading={loading}
        />
      )}
    </div>
  );
};

export default APIData;
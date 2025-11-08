import React from 'react';
import '../styles/JSONData.css';

export default function FilterBar({
  searchText,
  onSearchChange,
  tipos = [],
  integrantes = [],
  selectedTipo,
  onTipoChange,
  selectedIntegrante,
  onIntegranteChange,
  onClear,
  placeholder,
  firstSelect = 'Tipo',
  secondSelect = 'Integrante',
  visibleButtonSearch = false,

}) {
  const normalize = (opt) => {
    if (opt && typeof opt === 'object') return opt;
    return { value: opt, label: opt };
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="search">Buscar:</label>
        <input
          id="search"
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="tipo">{firstSelect}:</label>
        <select id="tipo" value={selectedTipo} onChange={(e) => onTipoChange(e.target.value)} className="filter-select">
          <option value="">Todos</option>
          {tipos.map(t => {
            const { value, label } = normalize(t);
            return (<option key={value} value={value}>{label}</option>);
          })}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="integrante">{secondSelect}:</label>
        <select id="integrante" value={selectedIntegrante} onChange={(e) => onIntegranteChange(e.target.value)} className="filter-select">
          <option value="">Todos</option>
          {integrantes.map(i => {
            const { value, label } = normalize(i);
            return (<option key={value} value={value}>{label}</option>);
          })}
        </select>
      </div>

      <div className="filter-group" style={{ alignSelf: 'center', display: 'flex' }}>
        <button type="button" className="filter-clear" onClick={() => onClear && onClear()}>Limpiar</button>
        {visibleButtonSearch && <button type="submit" className='filter-clear'>Buscar</button>}
      </div>

    </div>
  );
}

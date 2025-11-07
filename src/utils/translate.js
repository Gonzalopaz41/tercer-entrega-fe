const statusMap = {
  Alive: 'Vivo',
  Dead: 'Muerto',
  unknown: 'Desconocido',
};

const genderMap = {
  Male: 'Masculino',
  Female: 'Femenino',
  Genderless: 'Sin género',
  unknown: 'Desconocido',
};

const speciesMap = {
  Human: 'Humano',
  Alien: 'Alienígena',
  Humanoid: 'Humanoide',
  Robot: 'Robot',
  Animal: 'Animal',
  Cronenberg: 'Cronenberg',
  Disease: 'Enfermedad',
  Poopybutthole: 'Poopybutthole',
'Mythological Creature': 'Criatura Mitológica',
  unknown: 'Desconocido',
};

export const translateStatus = (status) => {
  if (status == null) return '';
  return statusMap[status] || status;
};

export const translateGender = (gender) => {
  if (gender == null) return '';
  return genderMap[gender] || gender;
};

export const translateSpecies = (species) => {
  if (species == null) return '';
  return speciesMap[species] || species;
};


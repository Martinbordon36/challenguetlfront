// En tu archivo de test de axios, antes de importar api
Object.defineProperty(import.meta, 'env', {
    value: {
      VITE_API_URL: 'https://rickandmortyapi.com/api',
    },
  });
  
  // Luego importás api
  import api from './axios';
  
  test('usa la baseURL correcta', () => {
    expect(api.defaults.baseURL).toBe('https://rickandmortyapi.com/api');
  });
  
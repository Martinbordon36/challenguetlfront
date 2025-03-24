import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';
import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
}

interface ApiResponse {
  info: {
    pages: number;
  };
  results: Character[];
}

const Home = () => {
  const { logout } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  const {
    data,
    isLoading,
    isError,
  } = useQuery<ApiResponse>({
    queryKey: ['characters', currentPage, debouncedSearch, status, gender],
    queryFn: async () => {
      const res = await axios.get<ApiResponse>('https://rickandmortyapi.com/api/character', {
        params: {
          page: currentPage,
          name: debouncedSearch,
          status,
          gender,
        },
      });
      return res.data;
    },
    placeholderData: (previousData) => previousData, 
});
  

  const characters = data?.results || [];
  const totalPages = data?.info?.pages || 1;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
          🧬 Personajes
        </h1>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={search}
            onChange={handleSearchChange}
            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Estado */}
          <div className="relative">
            <select
              value={status}
              onChange={(e) => {
                setCurrentPage(1);
                setStatus(e.target.value);
              }}
              className="appearance-none w-full md:w-48 bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">🧪 Todo</option>
              <option value="alive">✅ Vivo</option>
              <option value="dead">☠️ Muerto</option>
              <option value="unknown">❓ Desconocido</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M7 7l3-3 3 3H7zm0 6l3 3 3-3H7z" />
              </svg>
            </div>
          </div>

          {/* Género */}
          <div className="relative">
            <select
              value={gender}
              onChange={(e) => {
                setCurrentPage(1);
                setGender(e.target.value);
              }}
              className="appearance-none w-full md:w-48 bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos los géneros</option>
              <option value="female">Femenino</option>
              <option value="male">Masculino</option>
              <option value="genderless">Sin género</option>
              <option value="unknown">Desconocido</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M7 7l3-3 3 3H7zm0 6l3 3 3-3H7z" />
              </svg>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
        >
          Cerrar Sesión
        </button>
      </header>

      {/* Contenido Principal */}
      <main className="p-6">
        {isLoading ? (
          <div className="text-center text-gray-600 text-lg">Cargando personajes...</div>
        ) : isError ? (
          <div className="text-center text-red-600 text-lg">Hubo un error al cargar los datos.</div>
        ) : characters.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">No se encontraron personajes.</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {characters.map((char) => (
                <div
                  key={char.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col items-center"
                >
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-24 h-24 rounded-full mb-2 border-4 border-indigo-200"
                  />
                  <p className="font-semibold text-center">{char.name}</p>
                  <p className="text-sm text-gray-500">{char.species}</p>
                </div>
              ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border font-medium transition 
                  ${currentPage === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-white hover:bg-indigo-100 border-indigo-300 text-indigo-600'}`}
              >
                ← Anterior
              </button>

              <span className="text-sm md:text-base text-gray-700 font-semibold">
                Página <span className="text-indigo-600">{currentPage}</span> de {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border font-medium transition 
                  ${currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-white hover:bg-indigo-100 border-indigo-300 text-indigo-600'}`}
              >
                Siguiente →
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;

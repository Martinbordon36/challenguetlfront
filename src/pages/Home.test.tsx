import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Home from './Home';
import axios from 'axios';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { flushPromises } from '../utils/flushPromises';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home.tsx', () => {
  const mockCharacters = [
    { id: 1, name: 'Rick Sanchez', image: '', species: 'Human' },
    { id: 2, name: 'Morty Smith', image: '', species: 'Human' },
  ];

  const renderWithProviders = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return render(
      <AuthContext.Provider
        value={{ token: 'fake-token-123', login: () => {}, logout: () => {} }}
      >
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </QueryClientProvider>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: {
        results: mockCharacters,
        info: { pages: 1 },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('muestra el loading y luego los personajes', async () => {
    renderWithProviders();

    expect(screen.getByText(/cargando personajes/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
      expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
    });
  });

  it('muestra mensaje si no hay resultados', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { results: [], info: { pages: 0 } },
    });

    renderWithProviders();

    await waitFor(() => {
      expect(
        screen.getByText(/no se encontraron personajes/i)
      ).toBeInTheDocument();
    });
  });

  it('muestra mensaje de error si la API falla', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    renderWithProviders();

    await waitFor(() => {
      expect(
        screen.getByText(/hubo un error al cargar los datos/i)
      ).toBeInTheDocument();
    });
  });

  it('deshabilita el botón anterior si está en la primera página', async () => {
    renderWithProviders();

    const prevButton = await screen.findByRole('button', { name: /anterior/i });
    expect(prevButton).toBeDisabled();
  });

  it('deshabilita el botón siguiente si está en la última página', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: mockCharacters,
        info: { pages: 1 },
      },
    });

    renderWithProviders();

    const nextButton = await screen.findByRole('button', { name: /siguiente/i });
    expect(nextButton).toBeDisabled();
  });
});

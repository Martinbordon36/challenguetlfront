// src/hooks/useDebounce.test.tsx
/// <reference types="vitest" />

import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';
import { vi } from 'vitest';


vi.useFakeTimers(); 

describe('useDebounce', () => {
  it('debe devolver el valor después del delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'hola' },
    });

    expect(result.current).toBe('hola');

    rerender({ value: 'chau' });

    expect(result.current).toBe('hola'); // aún no pasó el tiempo

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('chau'); // valor actualizado después del delay
  });
});

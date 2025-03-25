// src/utils/flushPromises.test.ts
import { flushPromises } from './flushPromises';
import { vi, describe, it, expect } from 'vitest';

describe('flushPromises', () => {
  it('resuelve después del siguiente ciclo del event loop', async () => {
    const spy = vi.fn();

    Promise.resolve().then(() => {
      spy();
    });

    expect(spy).not.toHaveBeenCalled();

    await flushPromises(); // espera al próximo ciclo

    expect(spy).toHaveBeenCalled();
  });

  it('puede usarse para esperar múltiples promesas', async () => {
    const order: string[] = [];

    Promise.resolve().then(() => order.push('primero'));
    Promise.resolve().then(() => order.push('segundo'));

    await flushPromises();

    expect(order).toEqual(['primero', 'segundo']);
  });
});

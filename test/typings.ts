import { describe, expectTypeOf, it } from 'vitest';

import * as Topo from '../src/index.js';

describe('typings', () => {
    describe('new Sorter()', () => {
        it('constructs, with and without a type parameter', () => {
            expectTypeOf(new Topo.Sorter()).toBeObject();
            expectTypeOf(new Topo.Sorter<string>()).toEqualTypeOf<Topo.Sorter<string>>();
        });
    });

    describe('sorter.add()', () => {
        it('returns an array of the node type', () => {
            expectTypeOf(new Topo.Sorter<string>().add('Eat breakfast', { group: 'breakfast' })).toEqualTypeOf<
                string[]
            >();
            expectTypeOf(new Topo.Sorter<string>().add(['Eat breakfast'], { group: 'breakfast' })).toEqualTypeOf<
                string[]
            >();
            expectTypeOf(new Topo.Sorter<number>().add(56, { group: 'numbers' })).toEqualTypeOf<number[]>();
            expectTypeOf(new Topo.Sorter<boolean>().add(false, { group: 'booleans' })).toEqualTypeOf<boolean[]>();
            expectTypeOf(new Topo.Sorter<object>().add({ foo: 'bar' }, { group: 'object' })).toEqualTypeOf<object[]>();
        });

        it('accepts every option', () => {
            const topo = new Topo.Sorter<string>();
            expectTypeOf(
                topo.add('Nap', {
                    after: ['breakfast', 'prep'],
                    before: 'bedtime',
                    group: 'nap',
                    sort: 2,
                    manual: true,
                }),
            ).toEqualTypeOf<string[]>();
        });

        it('rejects nodes of the wrong type', () => {
            // @ts-expect-error nodes must match the sorter type
            new Topo.Sorter<string>().add(56, { group: 'numbers' });
            // @ts-expect-error nodes must match the sorter type
            new Topo.Sorter<number>().add('Eat breakfast', { group: 'breakfast' });
            // @ts-expect-error nodes must match the sorter type
            new Topo.Sorter<string>().add([56], { group: 'numbers' });
            // @ts-expect-error invalid option key
            new Topo.Sorter<string>().add('Nap', { grp: 'nap' });
        });
    });

    describe('sorter.nodes', () => {
        it('is an array of the node type', () => {
            const morning = new Topo.Sorter<string>();
            morning.add('Nap', { after: ['breakfast', 'prep'] });
            morning.add(['Make toast', 'Pour juice'], { before: 'breakfast', group: 'prep' });
            morning.add('Eat breakfast', { group: 'breakfast' });

            expectTypeOf(morning.nodes).toEqualTypeOf<string[]>();
        });
    });

    describe('sorter.merge()', () => {
        it('accepts a sorter or an array of sorters', () => {
            const morning = new Topo.Sorter<string>();
            morning.add('Eat breakfast', { group: 'breakfast' });

            const afternoon = new Topo.Sorter<string>();
            afternoon.add('Eat lunch', { after: ['breakfast'], sort: 2 });

            expectTypeOf(morning.merge(afternoon)).toEqualTypeOf<string[]>();
            expectTypeOf(morning.merge([afternoon])).toEqualTypeOf<string[]>();
        });

        it('rejects a sorter of a different node type', () => {
            const morning = new Topo.Sorter<string>();
            // @ts-expect-error merged sorters must share the node type
            morning.merge(new Topo.Sorter<number>());
        });
    });

    describe('sorter.sort()', () => {
        it('returns an array of the node type and takes no arguments', () => {
            const morning = new Topo.Sorter<string>();
            morning.add('Eat breakfast', { group: 'breakfast' });

            expectTypeOf(morning.sort()).toEqualTypeOf<string[]>();
            // @ts-expect-error sort() takes no arguments
            morning.sort([]);
        });
    });
});

import * as Topo from '..';
import * as Lab from '@hapi/lab';


const { expect } = Lab.types;


// new Topo.Sorter()

const morning = new Topo.Sorter<string>();
morning.add('Nap', { after: ['breakfast', 'prep'] })
morning.add(['Make toast', 'Pour juice'], { before: 'breakfast', group: 'prep' });
morning.add('Eat breakfast', { group: 'breakfast' });

const afternoon = new Topo.Sorter<string>();
afternoon.add('Eat lunch', { after: ['afternoon', 'prep'], sort: 2 });

expect.type<object>(new Topo.Sorter());


// sorter.add()

expect.type<string[]>(new Topo.Sorter<string>().add('Eat breakfast', { group: 'breakfast' }));
expect.type<number[]>(new Topo.Sorter<number>().add(56, { group: 'numbers' }));
expect.type<string[]>(new Topo.Sorter<string>().add(["Eat breakfast"], { group: 'breakfast' }));
expect.type<boolean[]>(new Topo.Sorter<boolean>().add(false, { group: 'booleans' }));
expect.type<object[]>(new Topo.Sorter<object>().add({ foo: "bar" }, { group: 'object' }));

expect.error(new Topo.Sorter<string>().add(56, { group: 'numbers' }));
expect.error(new Topo.Sorter<number>().add('Eat breakfast', { group: 'breakfast' }));
expect.error(new Topo.Sorter<string>().add([56], { group: 'numbers' }));


// sorter.nodes

expect.type<string[]>(morning.nodes);
expect.type<string[]>(afternoon.nodes);


// sorter.merge

expect.type<string[]>(morning.merge(afternoon));
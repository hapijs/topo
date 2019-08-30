import { Topo } from '..';
import * as Lab from '@hapi/lab';

const { expect } = Lab.types;

const morning = new Topo<string>();

morning.add('Nap', { after: ['breakfast', 'prep']})

morning.add([
  'Make toast',
  'Pour juice'
], { before: 'breakfast', group: 'prep' });

morning.add('Eat breakfast', { group: 'breakfast' });

const afternoon = new Topo<string>();

afternoon.add('Eat lunch', { after: ['afternoon', 'prep'], sort: 2});


// new Topo()

expect.type<object>(new Topo());


// topo.add()

expect.type<Array<string>>(new Topo<string>().add('Eat breakfast', { group: 'breakfast' }));
expect.type<Array<number>>(new Topo<number>().add(56, { group: 'numbers' }));
expect.type<Array<string>>(new Topo<string>().add(["Eat breakfast"], { group: 'breakfast' }));
expect.type<Array<boolean>>(new Topo<boolean>().add(false, { group: 'booleans' }));
expect.type<Array<object>>(new Topo<object>().add({ foo: "bar" }, { group: 'object' }));

expect.error(new Topo<string>().add(56, { group: 'numbers'}));
expect.error(new Topo<number>().add('Eat breakfast', { group: 'breakfast'}));
expect.error(new Topo<string>().add([56], { group: 'numbers'}));


// topo.nodes

expect.type<Array<string>>(morning.nodes);
expect.type<Array<string>>(afternoon.nodes);


// topo.merge

expect.type<Array<string>>(morning.merge(afternoon));
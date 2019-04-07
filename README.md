<a href="http://hapijs.com"><img src="https://github.com/hapijs/assets/blob/master/images/family.svg" width="180px" align="right" /></a>

# topo

Topological sorting with grouping support.

[![Build Status](https://secure.travis-ci.org/hapijs/topo.svg?branch=master)](http://travis-ci.org/hapijs/topo)

## Usage

See the [API Reference](API.md)

**Example**
```js
const Topo = require('topo');

const morning = new Topo();

morning.add('Nap', { after: ['breakfast', 'prep'] });

morning.add([
    'Make toast',
    'Pour juice'
], { before: 'breakfast', group: 'prep' });

morning.add('Eat breakfast', { group: 'breakfast' });

morning.nodes;        // ['Make toast', 'Pour juice', 'Eat breakfast', 'Nap']
```

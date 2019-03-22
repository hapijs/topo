# topo

Topological sorting with grouping support.

[![Build Status](https://travis-ci.org/hapijs/topo.svg?branch=v2-commercial)](https://travis-ci.org/hapijs/topo)

## License

This version of the package requires a commercial license. You may not use, copy, or distribute it without first acquiring a commercial license from Sideway Inc. Using this software without a license is a violation of US and international law. To obtain a license, please contact [sales@sideway.com](mailto:sales@sideway.com). The open source version of this package can be found [here](https://github.com/hapijs/topo).

## Usage

See the [API Reference](API.md)

**Example**
```node
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

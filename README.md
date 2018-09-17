# @moyuyc/walk-tree

[![Build status](https://img.shields.io/travis/imcuttle/walk-tree/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/walk-tree)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/walk-tree.svg?style=flat-square)](https://codecov.io/github/imcuttle/walk-tree?branch=master)
[![NPM version](https://img.shields.io/npm/v/@moyuyc/walk-tree.svg?style=flat-square)](https://www.npmjs.com/package/@moyuyc/walk-tree)
[![NPM Downloads](https://img.shields.io/npm/dm/@moyuyc/walk-tree.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/@moyuyc/walk-tree)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Enhanced and multifunctional tree walker

## Installation

```bash
npm install @moyuyc/walk-tree
# or use yarn
yarn add @moyuyc/walk-tree
```

## Usage

```javascript
const walkTree = require('@moyuyc/walk-tree')

walkTree(
  {
    name: 'root',
    children: [{ name: 'c1' }, { name: 'c2' }, { name: 'c3', children: { name: 'c31' } }]
  },
  node => {
    console.log(node.name)
  }
)
// prints
// root / c1 / c2 / c3 / c31
// by order
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### walk

[index.js:54-138](https://github.com/imcuttle/walk-tree/blob/b32dd294e3cd4a7361ba24b7bcdcb4919ee2c5b2/index.js#L54-L138 'Source code on GitHub')

#### Parameters

- `tree` {T} - Type `T` should extends Object
- `walker` {(node, ctx: Context) => {}} - Iterator for each node by order
- `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** {object}
  - `opts.path` {string} - The child's path on recursive struction (optional, default `'children'`)
  - `opts.order` {'pre' | 'post' | 'bfs'}
    <br/>
    `pre` means walking the node before walking it's children node by dfs <br/>
    `post` means walking the node after walking it's children node by dfs <br/>
    `bfs` means walking the node by bfs <br/> (optional, default `'pre'`)
  - `opts.skipVisited` {boolean}
    Should skip the node which has been visited. (optional, default `true`)
  - `opts.uniquePath` {Function | string | null}
    The unique's path for determining the node has been visited (same node) (optional, default `node=>node`)
  - `opts.state` {any}
    Inject in `context.state` on customized way

Returns **any** walkedTree {T}

## Context

A traversal context.

Four operations are available. Note that depending on the traversal order, some operations have no effects.

#### `remove`

```javascript
walk(rootNode, (node, ctx) => {
  if (node.name === 'remove-me') {
    return ctx.remove()
  }
})
```

#### `replace`

```javascript
walk(rootNode, (node, ctx) => {
  if (node.name === 'replace-me') {
    return ctx.replace({ name: 'new-me' })
  }
})
```

#### `break`

Stop traversal now.

```javascript
walk(rootNode, (node, ctx) => {
  if (node.name === 'stop') {
    return ctx.break()
  }
})
```

#### `skip`

Skip current node, children won't be visited.

```javascript
walk(rootNode, (node, ctx) => {
  if (node.name === 'skip') {
    return ctx.skip()
  }
})
```

#### `parent`

Get the parent of the current node.

#### `depth`

Get the depth of the current node. The depth is the number of ancestors the current node has.

#### `level`

Get the level of current node. The level is the number of ancestors+1 the current node has.

#### `index`

Get the index of the current node.

## Credit

The core algorithm of traverse credits to [tree-crawl](https://github.com/ngryman/tree-crawl)

walk-tree has the different with `tree-crawl`

Because tree-crawl has no idea about the intrinsic structure of your tree, you have to remove the node yourself. `Context#remove` only notifies the traversal code that the structure of the tree has changed.

Otherwise walk-tree would infers your tree by option `path` so don't requires additional remove action.

## Authors

This library is written and maintained by imcuttle, <mailto:moyuyc95@gmail.com>.

## License

MIT

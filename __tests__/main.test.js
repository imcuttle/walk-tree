/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
const visit = require('..')
const fs = require('fs')
const nps = require('path')

function readJson(path) {
  return JSON.parse(fs.readFileSync(require.resolve(path)).toString())
}

describe('walk-tree', function() {
  it('should visit walk on pre', function() {
    const names = []
    visit(readJson('./fixtures/tree'), function(node, ctx) {
      names.push(node.name)
    })

    expect(names).toEqual(['root', 'a', 'aa', 'b', 'bb', 'c', 'cc', 'ccc'])
  })

  it('should visit walk on post', function() {
    const names = []
    visit(
      readJson('./fixtures/tree'),
      function(node, ctx) {
        names.push(node.name)
      },
      { order: 'post' }
    )

    expect(names).toEqual(['aa', 'a', 'bb', 'b', 'ccc', 'cc', 'c', 'root'])
  })

  it('should visit walk on bfs', function() {
    const names = []
    visit(
      readJson('./fixtures/tree'),
      function(node, ctx) {
        names.push(node.name)
      },
      { order: 'bfs' }
    )

    expect(names).toEqual(['root', 'a', 'b', 'c', 'aa', 'bb', 'cc', 'ccc'])
  })

  it('should visit walk skip same node', function() {
    const names = []
    visit(
      readJson('./fixtures/tree'),
      function(node, ctx) {
        names.push(node.name)
      },
      { order: 'pre', skipVisited: true, uniquePath: node => node.key || node.name }
    )

    expect(names).toEqual(['root', 'a', 'aa', 'c', 'cc', 'ccc'])
  })

  it('should visit walk allow visit the same node', function() {
    const names = []
    visit(
      readJson('./fixtures/tree'),
      function(node, ctx) {
        names.push(node.name)
      },
      { order: 'pre', skipVisited: false, uniquePath: node => node.key || node.name }
    )

    expect(names).toEqual(['root', 'a', 'aa', 'b', 'bb', 'c', 'cc', 'ccc'])
  })

  it('should remove works', function() {
    const names = []
    const node = readJson('./fixtures/tree.json')
    console.warn(JSON.stringify(node, null, 2))
    const newNode = visit(
      node,
      function(node, ctx) {
        if (node.name === 'b') {
          ctx.remove()
        }
        names.push(node.name)
      },
      { order: 'pre' }
    )

    expect(newNode).toBe(node)
    expect(newNode).toMatchSnapshot()
    expect(names).toEqual(['root', 'a', 'aa', 'b', 'c', 'cc', 'ccc'])
  })

  it('should remove works on single item', function() {
    const names = []
    const node = readJson('./fixtures/tree')
    const newNode = visit(
      node,
      function(node, ctx) {
        if (node.name === 'ccc') {
          return ctx.remove()
        }
        names.push(node.name)
      },
      { order: 'pre' }
    )

    expect(newNode).toMatchSnapshot()
    expect(names).toEqual(['root', 'a', 'aa', 'b', 'bb', 'c', 'cc'])
  })

  it('should replace works', function() {
    const names = []
    const node = readJson('./fixtures/tree')
    const newNode = visit(
      node,
      function(node, ctx) {
        if (node.name === 'b') {
          return ctx.replace({ name: 'lal', children: [{ name: 'abc' }] })
        }
        names.push(node.name)
      },
      { order: 'pre' }
    )

    // expect(newNode).toMatchSnapshot()
    expect(names).toEqual(['root', 'a', 'aa', 'abc', 'c', 'cc', 'ccc'])
  })

  it('should replace works on single item', function() {
    const names = []
    const node = readJson('./fixtures/tree')
    const newNode = visit(
      node,
      function(node, ctx) {
        if (node.name === 'ccc') {
          return ctx.replace({ name: 'abc', children: [{ name: 'last-one' }] })
        }
        names.push(node.name)
      },
      { order: 'pre' }
    )

    // expect(newNode).toMatchSnapshot()
    expect(names).toEqual(['root', 'a', 'aa', 'b', 'bb', 'c', 'cc', 'last-one'])
  })

  it('should replace works on single item when post', function() {
    const names = []
    const node = readJson('./fixtures/tree')
    const newNode = visit(
      node,
      function(node, ctx) {
        if (node.name === 'ccc') {
          return ctx.replace({ name: 'abc', children: [{ name: 'last-one' }] })
        }
        names.push(node.name)
      },
      { order: 'post' }
    )

    // expect(newNode).toMatchSnapshot()
    expect(names).toEqual(['aa', 'a', 'bb', 'b', 'cc', 'c', 'root'])
  })
})

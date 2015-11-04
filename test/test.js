/* global before, describe, it */
var assert = require('assert')
var rdf = require('rdf-ext')
var SingleGraphStore = require('../')

describe('rdf-store-singlegraph', function () {
  var graph1 = rdf.createGraph()
  var graph2 = rdf.createGraph()

  before(function () {
    graph1.add(rdf.createTriple(
      rdf.createNamedNode('http://example.org/subject1'),
      rdf.createNamedNode('http://example.org/predicate'),
      rdf.createLiteral('object1')))

    graph1.add(rdf.createTriple(
      rdf.createNamedNode('http://example.org/subject1'),
      rdf.createNamedNode('http://example.org/predicate'),
      rdf.createLiteral('object2')))

    graph2.add(rdf.createTriple(
      rdf.createNamedNode('http://example.org/subject2'),
      rdf.createNamedNode('http://example.org/predicate'),
      rdf.createLiteral('object3')))
  })

  it('should implement the Store interface', function () {
    var store = new SingleGraphStore()

    assert.equal(typeof store, 'object')
    assert.equal(typeof store.add, 'function')
    assert.equal(typeof store.delete, 'function')
    assert.equal(typeof store.graph, 'function')
    assert.equal(typeof store.match, 'function')
    assert.equal(typeof store.merge, 'function')
    assert.equal(typeof store.remove, 'function')
    assert.equal(typeof store.removeMatches, 'function')
  })

  it('.add should add a graph to the store with callback interface', function (done) {
    var store = new SingleGraphStore()

    store.add('http://example.org/graph', graph1, function (error, graph) {
      assert(!error)
      assert.equal(graph.length, 2)
      assert.equal(store.singleGraph.length, 2)

      done()
    }).catch(function (error) {
      done(error)
    })
  })

  it('.add should add a graph to the store with Promise interface', function (done) {
    var store = new SingleGraphStore()

    store.add('http://example.org/graph', graph1).then(function (graph) {
      assert.equal(graph.length, 2)
      assert.equal(store.singleGraph.length, 2)

      done()
    }).catch(function (error) {
      done(error)
    })
  })

  it('.add should add a graph to the store with NamedNode as IRI', function (done) {
    var store = new SingleGraphStore()

    store.add(rdf.createNamedNode('http://example.org/graph'), graph1).then(function (graph) {
      assert.equal(graph.length, 2)
      assert.equal(store.singleGraph.length, 2)

      done()
    }).catch(function (error) {
      done(error)
    })
  })

  it('.delete should delete a graph from the store with callback interface', function (done) {
    var store = new SingleGraphStore()

    store.add('http://example.org/graph', graph1, function () {
      store.delete('http://example.org/graph', function (error) {
        assert(!error)
        assert.equal(store.singleGraph.length, 0)

        done()
      }).catch(function (error) {
        done(error)
      })
    })
  })

  it('.delete should delete a graph from the store with Promise interface', function (done) {
    var store = new SingleGraphStore()

    store.add('http://example.org/graph', graph1).then(function () {
      return store.delete('http://example.org/graph')
    }).then(function () {
      assert.equal(store.singleGraph.length, 0)

      done()
    }).catch(function (error) {
      done(error)
    })
  })

  it('.graph should return the named graph with callback interface', function (done) {
    var store = new SingleGraphStore()

    store.add('http://example.org/graph', rdf.createGraph(), function () {
      store.graph('http://example.org/graph', function (error, graph) {
        assert(!error)
        assert.equal(graph.length, 0)

        done()
      })
    }).catch(function (error) {
      done(error)
    })
  })

  it('.graph should return the named graph with Promise interface', function (done) {
    var store = new SingleGraphStore()

    store.add('http://example.org/graph', rdf.createGraph()).then(function () {
      return store.graph('http://example.org/graph')
    }).then(function (graph) {
      assert.equal(graph.length, 0)

      done()
    }).catch(function (error) {
      done(error)
    })
  })

  it('.graph should return the named graph with NamedNode object as IRI', function (done) {
    var store = new SingleGraphStore()

    store.add('http://example.org/graph', rdf.createGraph()).then(function () {
      return store.graph(rdf.createNamedNode('http://example.org/graph'))
    }).then(function (graph) {
      assert.equal(graph.length, 0)

      done()
    }).catch(function (error) {
      done(error)
    })
  })
})

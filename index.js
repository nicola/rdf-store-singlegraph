var util = require('util')
var AbstractStore = require('rdf-store-abstract')

function SingleGraphStore (options) {
  options = options || {}

  this.rdf = options.rdf || require('rdf-ext')
  this.singleGraph = this.rdf.createGraph()

  AbstractStore.call(this)
}

util.inherits(SingleGraphStore, AbstractStore)

SingleGraphStore.prototype.add = function (iri, graph, callback) {
  var self = this

  callback = callback || function () {}

  return new Promise(function (resolve) {
    self.singleGraph = graph.clone()

    callback(null, graph)
    resolve(graph)
  })
}

SingleGraphStore.prototype.delete = function (iri, callback) {
  var self = this

  callback = callback || function () {}

  return new Promise(function (resolve) {
    self.singleGraph = self.rdf.createGraph()

    callback()
    resolve()
  })
}

SingleGraphStore.prototype.graph = function (iri, callback) {
  var self = this

  callback = callback || function () {}

  return new Promise(function (resolve) {
    var graph = self.singleGraph.clone()

    callback(null, graph)
    resolve(graph)
  })
}

module.exports = SingleGraphStore



var vows = require('vows'),
    EventEmitter = require('events').EventEmitter,
    fileset = require('../'),
    assert = require('assert');


vows.describe('Callback api test suite for node-fileset')
  .addBatch({
    'Given a **.coffee pattern': {
      topic: function() {
        var self = this,
        em = new EventEmitter;

        fileset('**.coffee', function(err, results) {
          if (err) return em.emit('error', err);
          em.emit('success', results);
        });

        return em;
      },

      'should return the list of matching file in this repo': function(err, results) {
        assert.ok(results.length);
      },
    },

    'exludes pattern to node_modules': {
      topic: function() {
        var self = this,
        em = new EventEmitter;

        fileset('**.coffee', 'node_modules', function(err, results) {
          if (err) return em.emit('error', err);
          em.emit('success', results);
        });

        return em;
      },

      'should return a list of files without node_modules in their path': function(err, results) {
        var ok = results.filter(function(it) {
          return (/node_modules/.test(it))
        });

        assert.ok(!ok.length);
      }
    },

    'a more complex example': {
      topic: function() {
        var self = this,
        em = new EventEmitter;

        fileset('**.coffee README.md *.json Cakefile **.js', 'node_modules', function(err, results) {
          if (err) return em.emit('error', err);
          em.emit('success', results);
        });

        return em;
      },

      'should work as expected': function(err, results) {
        assert.equal(results.length, 7);
      }
    }

  })
  .export(module)

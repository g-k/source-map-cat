{ ArgumentParser } = require 'argparse'

lib = require './index'


parser = new ArgumentParser({
  version: '0.0.0'
  addHelp: true
  description: """cat for JS source maps"""
})

parser.addArgument(
  ['-f', '--source-file'],
  {
    help: 'source file name'
    required: true
  }
)

parser.addArgument(
  ['source maps'],
  {
    help: 'source maps to concatenate'
    nargs: '*'
  }
)


module.exports = (argv) ->
  args = parser.parseArgs argv.slice 2

  lib.cat args['source_file'], args['source maps'], process.stdout

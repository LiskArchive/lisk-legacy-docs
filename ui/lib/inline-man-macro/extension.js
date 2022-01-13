const { posix: path } = require('path')

/**
 * Extends the AsciiDoc syntax to add support for the inline man macro.
 * This macro creates a link to a man(ual) page that is suitable for
 * the output format.
 *
 * Usage:
 *
 *  man:grep[1]
 *
 * The target must be located in the same directory as the source.
 *
 * To use this extension, register the extension.js file with Antora (i.e.,
 * list it as an AsciiDoc extension in the Antora playbook file).
 *
 * @author Dan Allen <dan@opendevise.com>
 */
const InlineManMacro = (() => {
  const $context = Symbol('context')
  const superclass = Opal.module(null, 'Asciidoctor').Extensions.InlineMacroProcessor
  const scope = Opal.klass(Opal.module(null, 'Antora'), superclass, 'InlineManMacro', function () {})

  Opal.defn(scope, '$initialize', function initialize (name, config, context) {
    Opal.hash_put(config, 'pos_attrs', ['volnum'])
    Opal.send(this, Opal.find_super_dispatcher(this, 'initialize', initialize), [name, config])
    this[$context] = context
  })

  Opal.defn(scope, '$process', function (parent, target, attrs) {
    const volnum = Opal.hash_get(attrs, 'volnum')
    const content = volnum ? `${target} (${volnum})` : target
    const pageId = path.join(path.dirname(this[$context].file.src.relative), target)
    // NOTE the value of the path attribute is never used, so the value is arbitrary
    const attributes = Opal.hash2(['refid', 'path'], { refid: pageId, path: pageId })
    return this.createInline(parent, 'anchor', content, { type: 'xref', target, attributes })
  })

  return scope
})()

module.exports.register = (registry, context) => {
  registry.inlineMacro(InlineManMacro.$new('man', Opal.hash(), context))
}

/* TODO
  - make linebreaks (\n) work
  - make markup work with vue (seems to be interpreted as TextNode for now)
  - mnemonics
*/
import Gtk from '../../gtk';
import { Pango } from '../../gtk'

import { Widget } from './widget'

export class Label extends Widget {
  _getDefaultAttributes() {
    return {
      angle: 0,
      // attributes: PangoAttrList,
      cursorPosition: 0,
      ellipsize: Pango.EllipsizeMode.NONE,
      justify: Gtk.Justification.LEFT,
      label: '',
      lines: -1,
      maxWidthChars: -1,
      mnemonicKeyval: 16777215,
      // mnemonicWidget: Gtk.Widget,
      pattern: null,
      selectable: false,
      selectionBound: 0,
      singleLineMode: false,
      trackVisitedLinks: true,
      useMarkup: false,
      useUnderline: false,
      widthChars: -1,
      wrap: false,
      wrapMode: Pango.WrapMode.WORD,
      xalign: 0.5,
      yalign: 0.5
    }
  }

  _createWidget() {
    this.widget = new Gtk.Label()
    this.widget.show()
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    // this._setWidgetAttribute('text', this.attributes.text)
    this._setWidgetAttribute('useMarkup', true)

    this.widget.show()
  }

  _appendWidget( childNode ) {
    if (super._appendWidget(childNode)) return
    this.widget.add(childNode.widget);
  }

  _removeWidget( childNode ) {
    this.widget.remove(childNode);
  }

  _setWidgetText( text ) {
    this._setWidgetAttribute('label', text)
  }

  _setWidgetAttribute( key, value ) {
    if (this.widget === null) return
    if (typeof this.widget[key] !== 'undefined') {
      console.log(this.tagName, key, value)
      this.widget[key] = value
    } else {
      super._setWidgetAttribute(key, value)
    }
  }

  _setWidgetHandler( event, handler ) {
    switch (event) {
      case 'click':
        this.widget.connect('clicked', () =>
          setImmediate(handler)
        )
        break
      default:
        super._setWidgetHandler(event, handler)
    }
  }
}

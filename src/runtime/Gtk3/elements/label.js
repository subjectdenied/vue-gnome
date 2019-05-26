import Gtk from '../../gtk';

import { Widget } from './widget'

export class Label extends Widget {
  _getDefaultAttributes() {
    return {
      text: '',
      xalign: null,
      valign: null
    }
  }

  _createWidget() {
    this.widget = new Gtk.Label()
    this.widget.show()
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    this._setWidgetAttribute('text', this.attributes.text)

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
    this.widget.setText(text)
  }

  _setWidgetAttribute( key, value ) {
    if (this.widget === null) return
    switch (key) {
      case 'text':
        this.widget.setText(value)
        break
      default:
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

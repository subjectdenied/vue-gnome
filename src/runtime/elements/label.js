import Gtk from '../gtk';

import { Widget } from './widget'

export class Label extends Widget {
  _getDefaultAttributes() {
    return {
      text: ''
    }
  }

  _createWidget() {
    this.widget = new Gtk.Label()
    this.widget.show()
    console.log('Label created')
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    this._setWidgetAttribute('text', this.attributes.text)

    this.widget.show()
  }

  _appendWidget( childNode ) {
    this.widget.add(childNode.widget);
  }

  _removeWidget( childNode ) {
    this.widget.remove(childNode);
  }

  _setWidgetText( text ) {
    this.widget.setText(text)
  }

  _setWidgetAttribute( key, value ) {
    console.log(key, value)
    if (this.widget === null) return
    switch (key) {
      case 'text':
        console.log(this.widget)
        this.widget.setText(value)
        break
      default:
        super._setWidgetAttribute(key, value)
    }
  }

  _setWidgetHandler( event, handler ) {
    console.log('la el._setWidgetHandler', event)
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

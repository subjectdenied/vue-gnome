import Gtk from '../../gtk';

import { Widget } from './widget'

export class Button extends Widget {
  _getDefaultAttributes() {
    return {
      label: ''
    }
  }

  _createWidget() {
    this.widget = new Gtk.Button()
    this.widget.show()
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    this._setWidgetAttribute('label', this.attributes.label)

    this.widget.show()
  }

  _appendWidget( childNode ) {
    if (super._appendWidget(childNode)) return
    this.widget.add(childNode.widget);
  }

  _removeWidget( childNode ) {
    this.widget.remove(childNode.widget);
  }

  _setWidgetAttribute( key, value ) {
    if (this.widget === null) return
    switch (key) {
      case 'label':
        this.widget.setLabel(value)
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

import Gtk from '../../gtk';

import { Widget } from './widget'

export class CheckButton extends Widget {
  _getDefaultAttributes() {
    return {
    }
  }

  _createWidget() {
    this.widget = new Gtk.CheckButton()
    this.widget.show()
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();
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
      case 'change':
        this.widget.connect('toggled', () =>
          setImmediate(handler)
        )
        break
      default:
        super._setWidgetHandler(event, handler)
    }
  }
}

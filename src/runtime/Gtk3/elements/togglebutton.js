import Gtk from '../../gtk';

import { Widget } from './widget'
import { Button } from './button'

export class ToggleButton extends Button {
  _getDefaultAttributes() {
    let parentAttributes = super._getDefaultAttributes()
    delete parentAttributes.image

    console.log(parentAttributes)

    return {
      ...parentAttributes,
      active: false,
      drawIndicator: true,
      inconsistent: false
    }
  }

  _createWidget() {
    this.widget = new Gtk.ToggleButton()
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
    if (typeof this.widget[key] !== 'undefined') {
      console.log(this.tagName, key, value)
      this.widget[key] = value
    } else {
      super._setWidgetAttribute(key, value)
    }
  }

  _setWidgetHandler( event, handler ) {
    switch (event) {
      case 'toggled':
        this.widget.connect('toggled', () => {
          console.log(this.tagName, 'toggled')
          setImmediate(handler, this)
        })
        break
      case 'clicked':
        this.widget.connect('clicked', () => {
          setImmediate(handler, this)
        })
        break
      default:
        super._setWidgetHandler(event, handler)
    }
  }
}

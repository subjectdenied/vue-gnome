import Gtk from '../../gtk';

import { Widget } from './widget'
import { Button } from './button'

export class LinkButton extends Button {
  _getDefaultAttributes() {
    let parentAttributes = super._getDefaultAttributes()
    delete parentAttributes.image

    console.log(parentAttributes)

    return {
      ...parentAttributes,
      uri: null,
      visited: false
    }
  }

  _createWidget() {
    this.widget = new Gtk.LinkButton()
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
    if (this.attributes.label) return
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
      case 'activateLink':
        this.widget.connect('activate-link', () => {
          setImmediate(handler, this)
        })
        break
      default:
        super._setWidgetHandler(event, handler)
    }
  }
}

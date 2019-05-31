import Gtk from '../../gtk'
import { Gio } from '../../gtk'

import { Widget } from './widget'

export class ThemedIcon extends Widget {
  _getDefaultAttributes() {
    return {
      name: ''
    }
  }

  _createWidget() {
    this.widget = Gio.ThemedIcon({
      name: this.attributes.name
    })

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
    this.widget.remove(childNode.widget);
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

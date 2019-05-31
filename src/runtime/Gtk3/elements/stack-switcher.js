import Gtk from '../../gtk';

import { Widget } from './widget'

export class StackSwitcher extends Widget {
  _getDefaultAttributes() {
    return {
      iconSize: 1,
      stack: null
    }
  }

  _createWidget() {
    this.widget = new Gtk.StackSwitcher()
    this.widget.show()
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();
    this.widget.show()
  }

  _appendWidget( childNode ) {}

  _removeWidget( childNode ) {}

  _setWidgetAttribute( key, value ) {
    if (this.widget === null) return
    console.log(this.tagName, key, value)

    if (typeof this.widget[key] !== 'undefined') {
      switch (key) {
        case 'stack':
          console.log('adding stack', value)
          let widget = value && value.widget
          setImmediate(() => this.widget.setStack(widget || null))
          break
        default:
          this.widget[key] = value
      }
    } else {
      super._setWidgetAttribute(key, value)
    }
  }

  _setWidgetHandler( event, handler ) {
    super._setWidgetHandler(event, handler)
  }
}

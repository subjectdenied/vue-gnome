import { Widget } from './widget'
import Gtk, { Pango, Gdk } from '../../gtk';

export class CellRendererToggle extends Widget {
  constructor(tagName, hasWidget = true) {
    super(tagName, hasWidget)
  }

  _getDefaultAttributes() {
    return {
      activatable: true,
      activate: false,
      inconsistent: false,
      indicatorSize: 0,
      radio: false,

      // custom
      pos: 0
    }
  }

  _createWidget() {
    this.widget = new Gtk.CellRendererToggle()
    // this.widget.show()
  }

  _appendWidget( childNode ) {
    if (super._appendWidget(childNode)) return
    this.widget.add(childNode.widget)
  }

  _removeWidget( childNode ) {
    this.widget.remove(childNode.widget)
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes()
  }

  _setWidgetAttribute( key, value ) {
    if (this.widget === null) return
    if (typeof this.widget[key] !== 'undefined') {
      switch (key) {
        default:
          this.widget[key] = value
      }
    } else {
      super._setWidgetAttribute(key, value)
    }
  }

  _setWidgetHandler( event, handler ) {
    switch (event) {
      case 'toggled':
        this.widget.connect('toggled', () => {
          setImmediate(handler, this)
        })
        break
      default:
        super._setWidgetHandler(event, handler)
    }
  }
}

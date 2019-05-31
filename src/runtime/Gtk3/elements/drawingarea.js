import Gtk from '../../gtk';

import { Widget } from './widget'

export class DrawingArea extends Widget {
  _getDefaultAttributes() {
    return {
      width: null,
      height: null
    }
  }

  _createWidget() {
    this.widget = new Gtk.DrawingArea()
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

  _setWidgetText( text ) {}

  _setWidgetAttribute( key, value ) {
    if (this.widget === null) return
    let size = null
    switch (key) {
      case 'width':
        size = this.widget.getSizeRequest()
        if (size.width !== value && value !== null) {
          this.widget.setSizeRequest(value, size.height)
        }
        break
      case 'height':
        size = this.widget.getSizeRequest()
        if (size.height !== value && value !== null) {
          this.widget.setSizeRequest(size.width, value)
        }
        break
      default:
        super._setWidgetAttribute(key, value)
    }
  }

  _setWidgetHandler( event, handler ) {
    switch (event) {
      case 'draw':
        const window = this._getTopParent('Window').window
        console.log('toplevel: ', window)
        window.connect('draw', (cr, data) =>
          handler(this, cr, data)
        )
        break
      default:
        super._setWidgetHandler(event, handler)
    }
  }
}

/* TODO
*/
import Gtk from '../../gtk';
import { Widget } from './widget'

export class SpinButton extends Widget {
  _getDefaultAttributes() {
    return {
      adjustment: null, // GtkAdjustment,
      climbRate: 0,
      digits: 0,
      numeric: false,
      snapToTicks: false,
      updatePolicy: Gtk.SpinButtonUpdatePolicy.ALWAYS,
      value: 0.0,
      wrap: false
    }
  }

  _createWidget() {
    this.widget = new Gtk.SpinButton()
    console.log(this.widget)
    this.widget.show()
  }

  _setWidgetAttribute( key, value ) {
    if (this.widget === null) return
    if (typeof this.widget[key] !== 'undefined') {
      console.log(this.tagName, key, value)
      switch (key) {
        case 'adjustment':
          if (value) {
            this.widget.adjustment = new Gtk.Adjustment(...value)
          }
          break
        default:
          this.widget[key] = value
      }
    } else {
      super._setWidgetAttribute(key, value)
    }
  }

  _setWidgetHandler( event, handler ) {
    switch (event) {
      case 'changeValue':
        this.widget.connect('change-value', () =>
          setImmediate(handler, this)
        )
        break
      case 'input':
        this.widget.connect('input', () =>
          setImmediate(handler, this)
        )
        break
      case 'output':
        this.widget.connect('output', () =>
          setImmediate(handler, this)
        )
        break
      case 'valueChanged':
        this.widget.connect('value-changed', () =>
          setImmediate(handler, this)
        )
        break
      case 'wrapped':
        this.widget.connect('wrapped', () =>
          setImmediate(handler, this)
        )
        break
      default:
        super._setWidgetHandler(event, handler)
    }
  }
}

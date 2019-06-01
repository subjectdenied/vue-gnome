import Gtk from '../../gtk'
import { Pango } from '../../gtk'

import { Widget } from './widget'

export class ProgressBar extends Widget {
  _getDefaultAttributes() {
    return {
      ellipsize: Pango.EllipsizeMode.NONE,
      fraction: 0,
      inverted: false,
      pulseStep: 0.1,
      showText: false,
      text: null
    }
  }

  _createWidget() {
    this.widget = new Gtk.ProgressBar()
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
    this._setWidgetAttribute('text', text)
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
}

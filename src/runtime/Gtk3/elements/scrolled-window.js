import Gtk from '../../gtk';

import { Widget } from './widget'

export class ScrolledWindow extends Widget {
  _getDefaultAttributes() {
    return {
      //hadjustment: null,
      hscrollbarPolicy: Gtk.PolicyType.AUTOMATIC,
      kineticScrolling: true,
      maxContentHeight: -1,
      maxContentWidth: -1,
      minContentHeight: -1,
      minContentWidth: -1,
      overlayScrolling: true,
      propagateNaturalHeight: false,
      propagateNaturalWidth: false,
      //shadowType: Gtk.ShadowType.NONE,
      //vadjustment: null,
      vscrollbarPolicy: Gtk.PolicyType.AUTOMATIC,
      windowPlacement: Gtk.PositionType.TOP_LEFT
    }
  }

  _createWidget() {
    this.widget = new Gtk.ScrolledWindow(null, null)
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
    super._setWidgetHandler(event, handler)
  }
}

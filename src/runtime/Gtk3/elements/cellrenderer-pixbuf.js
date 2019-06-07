/*
  TODO:
  - pixbuf usage in general in liststores
*/

import { Widget } from './widget'
import Gtk, { Pango, Gdk } from '../../gtk';

export class CellRendererPixbuf extends Widget {
  constructor(tagName, hasWidget = true) {
    super(tagName, hasWidget)
  }

  _getDefaultAttributes() {
    return {
      // followState: true, DEPRECATED
      // gicon: GIcon
      iconname: null,
      // pixbuf: GdkPixbuf
      // pixbufExpanderClosed: GdkPixbuf
      // pixbufExpanderOpen: GdkPixbuf
      stockDetail: null,
      // stockId: null DEPRECATED,
      stockSize: 1,
      // surface: CairoSurface

      // custom
      pos: 0
    }
  }

  _createWidget() {
    this.widget = new Gtk.CellRendererPixbuf()
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
      default:
        super._setWidgetHandler(event, handler)
    }
  }
}

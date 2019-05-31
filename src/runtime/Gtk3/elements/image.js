import Gtk from '../../gtk';

import { Widget } from './widget'

export class Image extends Widget {
  _getDefaultAttributes() {
    return {
      file: null,
      // gicon: GIcon,
      iconName: null,
      // iconSet: GtkIconSet,
      iconSize: 4,
      // pixbuf: GdkPixbuf,
      // pixbufAnimation: GdkPixbufAnimation,
      pixelSize: -1,
      resource: null,
      stock: null, // deprecated: use iconName instead
      storageType: Gtk.ImageType.EMPTY,
      // surface: CairoSurface
      useFallback: false
    }
  }

  _createWidget() {
    this.widget = new Gtk.Image()
    this.widget.show()
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();
    this.widget.show()
  }

  _appendWidget( childNode ) {
    if (super._appendWidget(childNode)) return

    switch (childNode.tagName) {
      case 'ThemedIcon':
        this._setWidgetAttribute('icon', childNode.widget)
        break
      default:
        this.widget.add(childNode.widget);
    }
  }

  _removeWidget( childNode ) {
    switch (childNode.tagName) {
      case 'ThemedIcon':
        this._setWidgetAttribute('icon', null)
        break
      default:
        this.widget.remove(childNode.widget);
    }
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

import Gtk from '../../gtk';

import { Widget } from './widget'
import { Image } from './image'

export class ImageFromGIcon extends Image {
  _getDefaultAttributes() {
    return super._getDefaultAttributes()
  }

  _createWidget() {
    this.widget = new Gtk.newFromGicon({
      icon: this.attributes.icon,
      iconSize: this.attributes.iconSize
    })

    this.widget.show()
  }
}

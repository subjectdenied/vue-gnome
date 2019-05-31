import Gtk from '../../gtk';

import { Widget } from './widget'
import { Image } from './image'

export class ImageFromStock extends Image {
  _getDefaultAttributes() {
    return super._getDefaultAttributes()
  }

  _createWidget() {
    this.widget = new Gtk.Image.newFromStock(this.attributes.iconName, this.attributes.iconSize)

    console.log(this.widget)
    this.widget.show()
  }
}

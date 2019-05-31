import Gtk from '../../gtk';

import { Widget } from './widget'
import { Image } from './image'

export class ImageFromFile extends Image {
  _getDefaultAttributes() {
    return super._getDefaultAttributes()
  }

  _createWidget() {
    this.widget = new Gtk.Image.newfromFile({
      file: this.attributes.file
    })

    this.widget.show()
  }
}

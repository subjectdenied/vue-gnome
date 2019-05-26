import { Box } from './box'
import Gtk from '../../gtk';

export class HBox extends Box {
  _createWidget() {
    this.widget = new Gtk.Box({
      orientation: Gtk.Orientation.HORIZONTAL
    })
    this.widget.show()
  }
}

import { Box } from './box'
import Gtk from '../../gtk';

export class VBox extends Box {
  _createWidget() {
    this.widget = new Gtk.Box({
      orientation: Gtk.Orientation.VERTICAL
    })
    this.widget.show()
  }
}

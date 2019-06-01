import Gtk from '../../gtk';

import { Widget } from './widget'
import { ToggleButton } from './togglebutton'

export class CheckButton extends ToggleButton {
  _createWidget() {
    this.widget = new Gtk.CheckButton()
    this.widget.show()
  }
}

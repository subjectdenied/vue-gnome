import { Widget } from './widget'
import Gtk from '../gtk';

export class Box extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      horizontal: false,
      padded: false
    };
  }

  _createWidget() {
    this.widget = new Gtk.Box()
    this.widget.show()
  }

  _appendWidget( childNode ) {
    this.widget.add(childNode.widget);
  }

  _removeWidget( childNode ) {
    this.widget.remove(childNode);
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();
  }

  _setWidgetAttribute( key, value ) {
    switch (key) {
      case 'padded':
        this.widget.padded = value
        break
      default:
        super._setWidgetAttribute( key, value );
    }
  }
}

import { Widget } from './widget'
import Gtk from '../../gtk';

export class Grid extends Widget {
  _getDefaultAttributes() {
    return {
      baselineRow: 0,
      columnHomogeneous: false,
      columnSpacing: 0,
      rowHomogeneous: false,
      rowSpacing: 0
    }
  }

  _createWidget() {
    this.widget = new Gtk.Grid()
    this.widget.show()
  }

  _appendWidget( childNode ) {
    if (childNode.attributes.attach || childNode.attributes.attachNextTo) {
      if (childNode.attributes.attach) {
        this.widget.attach(childNode.widget, ...childNode.attributes.attach)
      }
      else if (childNode.attributes.attachNextTo) {
        const targetChild = this.childNodes[childNode.attributes.attachNextTo[0]].widget
        const rest = childNode.attributes.attachNextTo.slice(1)
        this.widget.attachNextTo(childNode.widget, targetChild, ...rest)
      }
    } else {
      this.widget.add(childNode.widget);
    }
  }

  _removeWidget( childNode ) {
    this.widget.remove(childNode.widget);
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();
  }

  _setWidgetAttribute( key, value ) {
    if (this.widget === null) return
    if (typeof this.widget[key] !== 'undefined') {
      this.widget[key] = value
    } else {
      super._setWidgetAttribute(key, value)
    }
  }
}

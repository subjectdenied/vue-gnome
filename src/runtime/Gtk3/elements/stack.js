import Gtk from '../../gtk';

import { Widget } from './widget'

export class Stack extends Widget {
  _getDefaultAttributes() {
    return {
      hhomogeneous: true,
      homogeneous: true,
      interpolateSize: false,
      transitionDuration: 200,
      transitionsRunning: false,
      transitionType: Gtk.StackTransitionType.NONE,
      vhomogeneous: true,
      // visibleChild: null,
      // visibleChildName: null
    }
  }

  _createWidget() {
    this.widget = new Gtk.Stack()
    this.widget.show()
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();
    this.widget.show()
  }

  _setWidgetText() {}

  _appendWidget( childNode ) {
    if (super._appendWidget(childNode)) return

    if (typeof childNode.attributes.forStack !== 'undefined') {
      const name = childNode.attributes.forStack[0]
      const title = childNode.attributes.forStack[1]
      this.widget.addTitled(childNode.widget, name, title)
    } else {
      this.widget.add(childNode.widget);
    }
    this.widget.show()
  }

  _removeWidget( childNode ) {
    this.widget.remove(childNode.widget);
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
    super._setWidgetHandler(event, handler)
  }
}

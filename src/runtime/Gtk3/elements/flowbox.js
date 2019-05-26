import Gtk from '../../gtk';

import { Widget } from './widget'

export class FlowBox extends Widget {
  _getDefaultAttributes() {
    return {
      acceptUnpairedRelease: false,
      activateOnSingleClick: true,
      columnSpacing: 0,
      homogeneous: false,
      maxChildrenPerLine: 7,
      minChildrenPerLine: 0,
      rowSpacing: 0,
      selectionMode: Gtk.SelectionMode.SINGLE
    }
  }

  _createWidget() {
    this.widget = new Gtk.ScrolledWindow()
    this.widget.show()
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();
    this.widget.show()
  }

  _appendWidget( childNode ) {
    if (super._appendWidget(childNode)) return
    this.widget.add(childNode.widget);
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

import Gtk from '../../gtk';

import { Widget } from './widget'

export class Notebook extends Widget {
  _getDefaultAttributes() {
    return {
      enablePopup: false,
      groupName: null,
      page: -1,
      pages: [],
      scrollable: false,
      showBorder: true,
      showTabs: true,
      tabPos: Gtk.PositionType.TOP,
      // child: null,
      detachable: false,
      // menu: null
      menuLabel: null,
      position: 0,
      reorderAble: false,
      // tab: null
      tabExpand: false,
      tabFill: true,
      tabLabel: null
    }
  }

  _createWidget() {
    this.widget = new Gtk.Notebook()
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

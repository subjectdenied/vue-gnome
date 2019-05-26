import Gtk from '../../gtk';

import { Widget } from './widget'

export class HeaderBar extends Widget {
  _getDefaultAttributes() {
    return {
      decorationLayout: null,
      decorationLayoutSet: false,
      hasSubtitle: true,
      showTitleButtons: false,
      // this should be replaced in gtk4 according to docs,
      // however shotTitleButtons doesnt seem to work
      // when showCloseButton does
      showCloseButton: false,
      spacing: 6,
      subtitle: '',
      title: ''
    }
  }

  _createWidget() {
    this.widget = new Gtk.HeaderBar()
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

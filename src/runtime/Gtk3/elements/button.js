import Gtk from '../../gtk';

import { Widget } from './widget'

export class Button extends Widget {
  _getDefaultAttributes() {
    return {
      alwaysShowImage: false,
      image: null,
      imagePosition: Gtk.PositionType.LEFT,
      label: null,
      relief: Gtk.ReliefStyle.NORMAL,
      useStock: false,
      xalign: 0.5,
      valign: 0.5
    }
  }

  _createWidget() {
    this.widget = new Gtk.Button()
    this.widget.show()
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    this._setWidgetAttribute('label', this.attributes.label)

    this.widget.show()
  }

  _appendWidget( childNode ) {
    if (super._appendWidget(childNode)) return
    this.widget.add(childNode.widget);

    switch (childNode.tagName) {
      case 'ImageFromStock':
        this._setWidgetAttribute('image', childNode.widget)
        break
    }
  }

  _removeWidget( childNode ) {
    this.widget.remove(childNode.widget);
  }

  _setWidgetAttribute( key, value ) {
    console.log(key, value)
    if (this.widget === null) return
    switch (key) {
      case 'label':
        if (!value) return
        this.widget.setLabel(value)
        break
      case 'image':
        if (!value) return
        this.widget.setImage(value)
      default:
        super._setWidgetAttribute(key, value)
    }
  }

  _setWidgetHandler( event, handler ) {
    switch (event) {
      case 'click':
        this.widget.connect('clicked', () =>
          setImmediate(handler)
        )
        break
      default:
        super._setWidgetHandler(event, handler)
    }
  }
}

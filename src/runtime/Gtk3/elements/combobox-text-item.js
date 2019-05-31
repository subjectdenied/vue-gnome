import Gtk from '../../gtk';

import { Widget } from './widget'

export class ComboBoxTextItem extends Widget {
  _getDefaultAttributes() {
    return {
      id: null,
      text: null
    }
  }

  _createWidget() {}

  _destroyWidget() {}

  _initializeWidgetAttributes() {
    // super._initializeWidgetAttributes()
  }

  _setWidgetText(text) {
    this.attributes.text = text
    this._setWidgetAttribute('text', text)
  }

  _setWidgetAttribute( key, value ) {
    console.log(key, value)
    const index = this.widgetIndex !== null ? this.widgetIndex : this.parentNode.childNodes.length

    switch (key) {
      case 'id':
      case 'text':
        console.log(index, key, this.attributes.id, this.attributes.text)

        this.parentNode.widget.remove(index)

        if (this.attributes.text !== null) {
          this.parentNode.widget.insert(index, this.attributes.id, this.attributes.text)
        } else {
          this.parentNode.widget.insertText(index, this.attributes.text)
        }
        break
      default:
        super._setWidgetAttribute(key, value)
    }
  }

  _setWidgetHandler( event, handler ) {
    switch (event) {
      case 'change':
        this.widget.connect('toggled', () =>
          setImmediate(handler)
        )
        break
      default:
        super._setWidgetHandler(event, handler)
    }
  }
}

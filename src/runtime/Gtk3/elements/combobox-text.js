import Gtk from '../../gtk';

import { Widget } from './widget'

export class ComboBoxText extends Widget {
  _getDefaultAttributes() {
    return {
      active: -1,
      activeId: null,
      addTearoffs: false,
      buttonSensitivity: Gtk.SensitivityType.AUTO,
      // cellArea: null,
      columnSpanColumn: -1,
      // entryTextColumn: -1,
      hasEntry: false,
      hasFrame: true,
      idColumn: -1,
      // model: null,
      popupFixedWidth: true,
      popupShown: false,
      rowSpanColumn: -1,
      tearoffTitle: null,
      wrapWidth: 0,
      appearsAsList: false,
      arrowScaling: 1,
      arrowSize: 15,
      shadowType: Gtk.ShadowType.NONE
    }
  }

  _createWidget() {
    this.widget = new Gtk.ComboBoxText()
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
    this.widget.remove(childNode);
  }

  _setWidgetText( text ) {
    this.widget.setText(text)
  }

  _setWidgetAttribute( key, value ) {
    console.log(key, value)
    if (this.widget === null) return
    switch (key) {
      case 'text':
        this.widget.setText(value)
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

/* TODO
*/
import Gtk from '../../gtk';

import { Widget } from './widget'

export class Entry extends Widget {
  _getDefaultAttributes() {
    return {
      activatesDefault: false,
      // attributes: PangoAttrList
      // buffer: GtkEntryBuffer
      capsLockWarning: true,
      // completion: GtkEntryCompletion,
      cursorPosition: 0,
      editable: true,
      enableEmojiCompletion: false,
      hasFrame: false,
      imModule: null,
      // innerBorder: DEPRECATED,
      // inputHints: GtkInputHints,
      inputPurpose: Gtk.InputPurpose.FREE_FORM,
      invisibleChar: '*',
      invisibleCharSet: false,
      maxLength: 0,
      maxWidthChars: -1,
      overwriteMode: false,
      placeholderText: null,
      populateAll: false,
      primaryIconActivatable: true,
      // primaryIconGicon: GIcon,
      primaryIconName: null,
      // primaryIconPixbuf: GdkPixbuf,
      primaryIconSensitive: true,
      // primaryIconStock: DEPRECATED,
      primaryIconStorageType: Gtk.ImageType.EMPTY,
      primaryIconTooltipMarkup: null,
      primaryIconTooltipText: null,
      progressFraction: 0,
      progressPulseStep: 0.1,
      scrollOffset: 0,
      secondaryIconActivatable: true,
      // secondaryIconGicon: GIcon,
      secondaryIconName: null,
      // secondaryIconPixbuf: GdkPixbuf,
      secondaryIconSensitive: true,
      // secondaryIconStock: DEPRECATED,
      secondaryIconStorageType: Gtk.ImageType.EMPTY,
      secondaryIconTooltipMarkup: null,
      secondaryIconTooltipText: null,
      selectionBound: 0,
      // shadowType: Gtk.ShadowType.IN (DEPRECATED)
      showEmojiIcon: false,
      // tabs: PangoTabArray
      text: '',
      textLength: 0,
      truncateMultiline: false,
      visibility: true,
      widthChars: -1,
      xalign: 0
    }
  }

  _createWidget() {
    this.widget = new Gtk.Entry()
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
    this._setWidgetAttribute('label', text)
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
    switch (event) {
      case 'activate':
        this.widget.connect('activate', () =>
          setImmediate(handler, this)
        )
        break
      case 'backspace':
          this.widget.connect('backspace', () =>
            setImmediate(handler, this)
          )
          break
        default:
        super._setWidgetHandler(event, handler)
    }
  }
}

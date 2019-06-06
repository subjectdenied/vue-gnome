import { Widget } from './widget'
import Gtk, { Pango, Gdk } from '../../gtk';

export class CellRendererText extends Widget {
  constructor(tagName, hasWidget = true) {
    super(tagName, hasWidget)
    this.store = null
  }

  _getDefaultAttributes() {
    return {
      alignSet: false,
      alignment: Pango.Alignment.LEFT,
      // attributes: PangoAttrList,
      background: null,
      // backgroundGdk: GdkColor (DEPRECATED),
      backgroundSet: false,
      editable: false,
      editableSet: false,
      ellipsize: Pango.EllipsizeMode.NONE,
      ellipsizeSet: false,
      family: null,
      familySet: false,
      font: null,
      // fontDesc: PangoFontDescription,
      foreground: null,
      // foregroundGdk: GdkColor (DEPRECATED),
      foregroundRgba: null,
      foregroundSet: false,
      language: null,
      languageSet: false,
      markup: null,
      maxWidthChars: -1,
      placeholderText: null,
      rise: 0,
      riseSet: false,
      scale: 1,
      scaleSet: false,
      singleParagraphMode: false,
      size: 0,
      sizePoints: 0,
      sizeSet: 0,
      stretch: Pango.Stretch.NORMAL,
      stretchSet: false,
      strikethrough: false,
      strikethroughSet: false,
      style: Pango.Style.NORMAL,
      styleSet: false,
      text: null,
      underline: Pango.Underline.NONE,
      underlineSet: false,
      variant: Pango.Variant.NORMAL,
      variantSet: false,
      weight: 400,
      weightSet: false,
      widthChars: -1,
      wrapMode: Pango.WrapMode.CHAR,
      wrapWidth: -1,

      pos: 0
      /* CellRenderer props

      cellBackground: null,
      // cellBackgroundRgba: GdkRGBA,
      editing: false,
      height: -1,
      isExpanded: false,
      isExpander: false,
      mode: Gtk.CellRenderMode.INERT,
      sensitive: true,
      visible: true,
      width: -1,
      xalign: 0.5,
      xpad: 0,
      yalign: 0.5,
      ypad: 0
      */
    }
  }

  _createWidget() {
    this.widget = new Gtk.CellRendererText()
    // this.widget.show()
  }

  _appendWidget( childNode ) {
    if (super._appendWidget(childNode)) return
    this.widget.add(childNode.widget)
  }

  _removeWidget( childNode ) {
    this.widget.remove(childNode.widget)
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes()
  }

  _setWidgetAttribute( key, value ) {
    if (this.widget === null) return
    console.log(this.tagName, key, value)
    if (typeof this.widget[key] !== 'undefined') {
      switch (key) {
        case 'foreground':
          if (value !== null) {
            this.widget.foreground = value
          }
          break
        case 'foregroundRgba':
          if (value !== null) {
            this.widget.foregroundRgba = value
          }
          break
        case 'background':
          if (value === null) return
            this.widget.background = value
          break
        default:
          this.widget[key] = value
      }
    } else {
      super._setWidgetAttribute(key, value)
    }
  }

  _setWidgetHandler( event, handler ) {
    switch (event) {
      case 'edited':
        this.widget.connect('edited', () => {
          console.log(this.tagName, 'edited')
          setImmediate(handler, this)
        })
        break
      default:
        super._setWidgetHandler(event, handler)
    }
  }
}

import { Widget } from './widget'
import Gtk from '../../gtk';

export class TreeViewColumn extends Widget {
  constructor(tagName, hasWidget = true) {
    super(tagName, hasWidget)
    this.store = null
  }

  _getDefaultAttributes() {
    return {
      alignment: 0,
      // cellArea: GtkCellArea,
      clickable: false,
      expand: false,
      fixedWidth: -1,
      maxWidth: -1,
      minWidth: -1,
      reorderable: false,
      resizable: false,
      sizing: Gtk.TreeViewColumnSizing.GROW_ONLY,
      sortColumnId: -1,
      sortIndicator: false,
      sortOrder: Gtk.SortType.ASCENDING,
      spacing: 0,
      title: '',
      visible: true,
      // widget: GtkWidget (put into header col)
      width: 0,
      xOffset: 0
    }
  }

  _createWidget() {
    this.widget = new Gtk.TreeViewColumn()
    // this.widget.show()
  }

  _appendWidget( childNode ) {
    if (super._appendWidget(childNode)) return

    childNode.store = this.store

    let attribute = null
    switch (childNode.tagName) {
      case 'CellRendererText':
          attribute = 'text'
        break
      default:
          attribute = 'text'
    }

    const index = this.widgetIndex || 0
    console.log('column-index', index)

    if (index === 0) {
      this._setWidgetAttribute('visible', false)
    }

    console.log('adding cellrendererrtext', childNode.attributes.pos)
    this.widget.addAttribute(childNode.widget, attribute, childNode.attributes.pos)
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
      this.widget[key] = value
    } else {
      super._setWidgetAttribute(key, value)
    }
  }

  _setWidgetHandler(event, handler) {
    switch (event) {
      case 'clicked':
        this.widget.connect('clicked', () => {
          setImmediate(handler, this)
        })
        break

      default:
        super._setWidgetHandler(event, handler)
    }
  }

}

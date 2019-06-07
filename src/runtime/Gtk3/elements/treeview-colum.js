import { Widget } from './widget'
import Gtk from '../../gtk';

export class TreeViewColumn extends Widget {
  constructor(tagName, hasWidget = true) {
    super(tagName, hasWidget)
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
      xOffset: 0,

      // custom
      column: {}
    }
  }

  _createWidget() {
    this.widget = new Gtk.TreeViewColumn()
    // this.widget.show()
  }

  _appendWidget(childNode) {
    if (super._appendWidget(childNode)) return

    let attribute
    switch (childNode.tagName) {
      case 'CellRendererText':
        attribute = 'text'
        break
      case 'CellRendererToggle':
        attribute = 'active'
        break
      case 'CellRendererPixbuf':
        // import to not set this camelCase,
        // but exactly as in doc
        attribute = 'icon-name'
        break
      default:
        attribute = 'text'
    }

    this.widget.addAttribute(childNode.widget, attribute, childNode.attributes.pos)
  }

  _removeWidget(childNode) {
    this.widget.remove(childNode.widget)
  }

  _initializeWidgetAttributes() {
    const index = this.widgetIndex || 0
    // get column defintion from parent
    console.log(this.parentNode.attributes.columns)
    this.attributes.column = this.parentNode.attributes.columns[index]

    super._initializeWidgetAttributes()

    // hide first column used for identifier
    if (index === 0) {
      this.setAttribute('visible', false)
    }
  }

  _setWidgetAttribute(key, value) {
    if (key === 'column') {
      console.log(this.tagName, this.widgetIndex, value)
      if (typeof value !== 'undefined') {
        if (typeof value.sortable !== 'undefined' && value.sortable) {
          this.setAttribute('sortColumnId', this.widgetIndex)
          return
        }
      }
    }

    if (this.widget === null) return
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

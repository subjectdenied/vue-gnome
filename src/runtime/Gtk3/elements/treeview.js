/*
  TODO:
    - figure out why there is a memleak
    - custom sort
    - filtering
    - update single cell
    - more declarative approach
      - crud methods instead rerendering whole list
*/

import Gtk, { G_TYPE, G_TYPE_FN, GObject } from '../../gtk'
import { Widget } from './widget'

export class TreeView extends Widget {
  constructor(tagName, hasWidget = true) {
    super(tagName, hasWidget)
    this.store = null
    this.currentRow = null
    this.currentCol = null
  }

  _getDefaultAttributes() {
    return {
      activateOnSingleClick: false,
      enableGridLines: Gtk.TreeViewGridLines.NONE,
      enableSearch: true,
      enableTreeLines: false,
      // expanderColumn: GtkTreeViewColumn
      fixedHeightMode: false,
      headersClickable: true,
      headersVisible: true,
      hoverExpand: false,
      hoverSelection: false,
      levelIdentation: 0,
      // model: GtkTreeModel,
      reorderable: false,
      rubberBanding: false,
      // rulesHint: false DEPRECATED
      searchColumn: -1,
      showExpanders: true,
      tooltipColumn: -1,

      model: null,
      columns: [],
      data: []

      /*  vue-gnome specific
          holds column type definition
          similar to quasar table

      columns:
          [
            {
              type: G_TYPE,
              name: 'desc',

              // label for header
              label: 'Dessert (100g serving)',

              // row Object property to determine value for this column
              field: 'name',
              // OR field: row => row.some.nested.prop

              // (optional) if we use visible-columns, this col will always be visible
              required: true,

              // (optional) alignment
              align: 'left',

              // (optional) tell QTable you want this column sortable
              sortable: true

              // (optional) compare function if you have
              // some custom data or want a specific way to compare two rows
              sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
            },
            ...
          ]
      */
    }
  }

  _createWidget() {
    this.widget = new Gtk.TreeView()
    this.store = new Gtk.ListStore()
    this.widget.show()
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();
    this.widget.show()
  }

  _appendWidget(childNode) {
    if (super._appendWidget(childNode)) return
    this.widget.appendColumn(childNode.widget);
  }

  _removeWidget(childNode) {
    this.widget.removeColumn(childNode.widget);
  }

  _setWidgetText(text) {
    this._setWidgetAttribute('text', text)
  }

  _setWidgetAttribute(key, value) {
    if (this.widget === null) return

    switch (key) {
      case 'columns':
          const types = this.attributes.columns.map(col => {
            return G_TYPE[col.type]
          })

          this.store.setColumnTypes(types)
          console.log('columns changed')
        break
      case 'data':
        if (value === null || this.store === null) return
        this._setupStore(this.attributes.columns, value)
        break
      case 'model':
        if (value === null || this.store === null) return
        if (this.attributes.model !== null) return
        console.log('model', this.attributes.model)
        this.widget.model = value
        this.attributes.model = value
        console.log('model changed')
        break
      default:
        if (typeof this.widget[key] !== 'undefined') {
          this.widget[key] = value
        } else {
          super._setWidgetAttribute(key, value)
        }
    }
  }

  // TODO implement signals

  _setupStore(columns, data) {
    if (this.store) {
      // clear store and fill it with new data (for now)
      // later diff the data and use crud methods
      this.store.clear()
    }

    data.forEach(row => {
      const iter = this.store.append()

      let i = 0
      for (let key in row) {
        let item = row[key]
        const colType = columns.find(col => col.field === key).type
        const type = G_TYPE[colType]
        const typeFn = G_TYPE_FN.set[colType]
        let value = new GObject.Value()
        value.init(type)
        value[typeFn](item)
        this.store.setValue(iter, i, value)
        i++
        value = null
      }
    })
    this._setWidgetAttribute('model', this.store)
  }

  _setWidgetHandler(event, handler) {
    switch (event) {
      case 'cellActivated':
        this.widget.connect('row-activated', (path, col) => {
          let [isIter, iter] = this.widget.model.getIter(path)
          if (!isIter) {
            iter = null
            return
          }
          const node = this.childNodes.find(n => n.widget === col)
          this.currentCol = node.widgetIndex

          // get index
          let index = this.store.getValue(iter, 0)
          let rowIndex = parseInt(index[G_TYPE_FN.get['number']]())
          const rowData = this._getCellByColAndRow(node.widgetIndex, rowIndex)
          const key = rowData.key
          const value = rowData.value
          index = null
          iter = null

          /*
          // get value
          const gValue = this.store.getValue(iter, this.currentCol)
          const type = this._getColumnGObjectType(this.currentCol)
          const item = gValue[G_TYPE_FN.get[type]]()
          console.log('selected: ', item)
          */

          setImmediate(handler, this, {
            // iter,
            row: rowIndex,
            col: node.widgetIndex
          }, {
            key,
            value
          })
        })
        break
      case 'clicked':
        break
      case 'selectionChanged':
        break
      case 'columnsChanged':
        this.widget.connect('columnsChanged', () => {
          setImmediate(handler, this)
        })
        break
      case 'cursorChanged':
        this.widget.connect('cursor-changed', () => {
          setImmediate(handler, this)
        })
        break
      case 'expandCollapseCursorRow':
        this.widget.connect('expand-collapse-cursor-row', () => {
          setImmediate(handler, this)
        })
        break
      case 'moveCursor':
        this.widget.connect('move-cursor', () => {
          setImmediate(handler, this)
        })

        // return true if step is supported
        break
      /*
      case 'rowActivated':
        this.widget.connect('row-activated', (path, column) => {
          console.log(this.tagName, event, path, column)
          setImmediate(handler, this, path, column)
        })
        break
      */
      case 'rowCollapsed':
        this.widget.connect('row-collapsed', (iter, path) => {
          console.log(this.tagName, event, iter, path)
          setImmediate(handler, this, iter, path)
        })
        break
      case 'rowExpanded':
        this.widget.connect('row-expanded', (iter, path) => {
          console.log(this.tagName, event, iter, path)
          setImmediate(handler, this, iter, path)
        })
        break
      case 'selectAll':
        this.widget.connect('select-all', () => {
          console.log(this.tagName, event)
          setImmediate(handler, this)
        })
        break
      case 'selectCursorParent':
        this.widget.connect('select-cursor-parent', () => {
          console.log(this.tagName, event)
          setImmediate(handler, this)
        })
        break
      case 'selectCursorRow':
        this.widget.connect('select-cursor-row', (arg1) => {
          console.log(this.tagName, event, arg1)
          setImmediate(handler, this, arg1)
        })
        break
      case 'startInteractiveSearch':
        this.widget.connect('start-interactive-search', () => {
          console.log(this.tagName, event)
          setImmediate(handler, this)
        })
        break
      case 'testCollapseRow':
        this.widget.connect('test-collapse-row', (iter, path) => {
          console.log(this.tagName, event, iter, path)
          setImmediate(handler, this, iter, path)
        })

        // return false or true to (not) allow collapsing
        break
      case 'toggleCursorRow':
        this.widget.connect('toggle-cursor-row', () => {
          console.log(this.tagName, event)
          setImmediate(handler, this)
        })
        break
      case 'unselectAll':
        this.widget.connect('unselect-all', () => {
          console.log(this.tagName, event)
          setImmediate(handler, this)
        })
        break

      default:
        super._setWidgetHandler(event, handler)
    }
  }

  _getCellByColAndRow (colIndex, rowIndex) {
    let y=0
    let x=0
    for (let row in this.attributes.data) {
      if (y===rowIndex) {
        for (let col in this.attributes.data[row]) {
          if (x===colIndex) {
            return {
              key: col,
              value: this.attributes.data[row][col],
              row: this.attributes.data[row]
            }
          }
          x++
        }
      }
      y++
    }

    return false
  }

  _getColumnGObjectType (colIndex) {
    return this.attributes.columns[colIndex].type
  }

  update () {
    this._setWidgetAttribute('data', this.attributes.data)
  }
}

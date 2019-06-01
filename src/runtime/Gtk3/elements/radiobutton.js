/*
  TODO:
    - check why toggled singnal doesnt return the radio-button but the widget
      => this means that getActive is not available as a method
*/

import Gtk from '../../gtk';

import { Widget } from './widget'
import { CheckButton } from './checkbutton'

const RadioButtonGroups = {}

export class RadioButton extends CheckButton {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      group: null
    }
  }

  _createWidget() {
    this.widget = new Gtk.RadioButton()
    /*
    const group = this.attributes.group
    if (typeof RadioButtonGroups[group] === 'undefined') {
      RadioButtonGroups[group] = [this.widget]
    } else {
      const rbGroup = RadioButtonGroups[group]
      const first = rbGroup[0].getGroup()
      this.widget.joinGroup(first[0])
    }
    */
    this.widget.show()
  }

  _setWidgetAttribute( key, value ) {
    if (this.widget === null) return
    switch (key) {
      case 'label':
        this.widget.setLabel(value)
        break
      case 'group':
        const group = value
        if (typeof RadioButtonGroups[group] === 'undefined') {
          RadioButtonGroups[group] = [this.widget]
        } else {
          const rbGroup = RadioButtonGroups[group]
          const first = rbGroup[0].getGroup()
          this.widget.joinGroup(first[0])
        }
        break
      default:
        if (typeof this.widget[key] !== 'undefined') {
          console.log(this.tagName, key, value)
          this.widget[key] = value
        } else {
          super._setWidgetAttribute(key, value)
        }
    }
  }

  _setWidgetHandler( event, handler ) {
    switch (event) {
      case 'toggled':
        this.widget.on('toggled', () => {
          setImmediate(handler, this)
        })
        break
      default:
        super._setWidgetHandler(event, handler)
    }
  }
}

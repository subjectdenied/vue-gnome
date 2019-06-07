import { Element } from './element'
import { TextNode } from '../../nodes/textnode'
import Gtk from '../../gtk'
import { Gio } from '../../gtk'

export class Widget extends Element {
  constructor(tagName, hasWidget = true) {
    super(tagName)

    this.hasWidget = hasWidget
    this.widget = null
    this.widgetIndex = null
  }

  appendChild(childNode) {
    super.appendChild(childNode);

    if (this.widget != null) {
      if (childNode instanceof Element) {
        this._appendElement(childNode)
      } else if (childNode instanceof TextNode) {
        this._setWidgetText(childNode.text)
      }
    }
  }

  insertBefore( childNode, referenceNode ) {
    const prevIndex = childNode.parentNode == this ? this.childNodes.indexOf( childNode ) : -1;

    super.insertBefore( childNode, referenceNode );

    if ( this.widget != null ) {
      if ( childNode instanceof Element )
        this._insertElement( childNode, prevIndex );
    }
  }

  removeChild( childNode ) {
    super.removeChild( childNode );

    if ( this.widget != null ) {
      if ( childNode instanceof Element )
        this._removeElement( childNode );
    }
  }

  setAttribute( key, value ) {
    super.setAttribute( key, value );
    if ( this.widget != null )
      this._setWidgetAttribute( key, value );
  }

  addEventListener( event, handler ) {
    super.addEventListener( event, handler);

    if ( this.widget != null )
      this._setWidgetHandler( event, handler );
  }

  removeEventListener( event ) {
    super.removeEventListener( event );

    if ( this.widget != null )
      this._setWidgetHandler( event, null );
  }

  _mountWidget() {
    this._createWidget();
    this._initializeWidgetAttributes();

    for (let key in this.handlers) {
      this._setWidgetHandler( key, this.handlers[key])
    }

    for (let i=0; i<this.childNodes.length; i++) {
      let childNode = this.childNodes[i]
      // TODO: check if this creates issues
      childNode.parentNode = this
      //
      if (childNode instanceof Element) {
        this._appendElement( childNode)
      }
      else if (childNode instanceof TextNode) {
        this._setWidgetText(childNode.text)
      }
    }
  }

  _getDefaultAttributes() {
    return {
      packStart: null,
      packEnd: null,
      attach: null,
      attachNextTo: null,
      forStack: null
    }
  }

  _createWidget() {
    throw new Error( this.tagName + ' cannot be created' );
  }

  _destroyWidget() {
    this.widget.destroy();
    this._clearWidget();
  }

  _clearWidget() {
    this.widget = null;

    for ( let i = 0; i < this.childNodes.length; i++ ) {
      const childNode = this.childNodes[ i ];
      if ( childNode instanceof Widget )
        childNode._clearWidget();
    }
  }

  _appendElement( childNode ) {
    if ( !( childNode instanceof Widget ) )
      throw new Error( this.tagName + ' cannot contain ' + childNode.tagName + ' elements' );

    childNode._mountWidget();
    this._appendWidget(childNode)
    this._reindexChildWidgets();
  }

  _insertElement( childNode, prevIndex ) {
    if ( !( childNode instanceof Widget ) )
      throw new Error( this.tagName + ' cannot contain ' + childNode.tagName + ' elements' );

    const index = this.childNodes.indexOf( childNode );

    for ( let i = this.childNodes.length - 1; i > index; i-- ) {
      const tailNode = this.childNodes[ i ];
      if ( tailNode instanceof Widget )
        this._removeWidget( tailNode );
    }

    if ( prevIndex < 0 ) {
      childNode._mountWidget();
      this._appendWidget( childNode );
    } else if ( prevIndex < index ) {
      this._removeWidget( childNode );
      this._appendWidget( childNode );
    }

    for ( let i = index + 1; i < this.childNodes.length; i++ ) {
      const tailNode = this.childNodes[ i ];
      if ( tailNode instanceof Widget )
        this._appendWidget( tailNode );
    }

    this._reindexChildWidgets();
  }

  _removeElement( childNode ) {
    this._removeWidget( childNode );
    childNode._destroyWidget();

    this._reindexChildWidgets();
  }

  _appendWidget( childNode ) {
    // throw new Error( this.tagName + ' cannot contain child widgets' );
    let packed = false
    if (typeof childNode.attributes.packStart !== 'undefined' ||
    typeof childNode.attributes.packEnd !== 'undefined') {
      packed = true

      if (typeof childNode.attributes.packStart !== 'undefined') {
        this._packStart(childNode)
      }

      if (typeof childNode.attributes.packEnd !== 'undefined') {
        this._packEnd(childNode)
      }
    }

    if (typeof this.widget.showAll !== 'undefined') {
      this.widget.showAll()
    }

    return false
  }

  _removeWidget( childNode ) {
    throw new Error( this.tagName + ' cannot contain child widgets' );
  }

  findChild (widget, name) {
    if (widget.widget.getName(name) == 0) {
      return this
    }

    if (Gtk.isBin(widget.widget)) {
      const child = Gtk.Bin.getChild(Gtk.Bin(widget.widget))
      return this.findChild(child, name)
    }

    if (Gtk.isContainer(widget.widget)) {
      const children = Gtk.getChildren(Gtk.Container(widget.widget))
      while ((children = Gio.listNext(children)) != NULL) {
        const widget = this.findChild(children.data, name)
        if (widget != null) {
          return widget
        }
      }
    }
    return null
  }

  _packStart (childNode) {
    const value = childNode.attributes.packStart
    const child = childNode.widget
    const expand = value[0] || false
    const fill = value[1] || false
    const padding = value[2] || 0

    if (typeof this.widget.packStart === 'function') {
      this.widget.packStart(child, expand, fill, padding)
      if (typeof child.show !== 'undefined') {
        child.show()
      }
    } else {
      this.widget.packStart = value
    }
  }

  _packEnd (childNode) {
    const value = childNode.attributes.packEnd
    const child = childNode.widget
    const expand = value[0]
    const fill = value[1]
    const padding = value[2]

    if (typeof this.widget.packEnd === 'function') {
      this.widget.packEnd(child, expand, fill, padding)
      child.show()
    } else {
      this.widget.packEnd = value
    }
  }

  _setContentText( text ) {
    if ( this.widget != null )
      this._setWidgetText( text );
  }

  _setWidgetText( text ) {
    throw new Error( this.tagName + ' cannot contain text nodes' );
  }

  _initializeWidgetAttributes() {
    const attributes = {
      ...this._getDefaultAttributes(),
      ...this.attributes
    }

    for (let key in attributes) {
      this._setWidgetAttribute(key, attributes[key])
    }
  }

  _setWidgetAttribute( key, value ) {
    if (this.widget === null || typeof this.widget[key] === 'undefined') return
    this.widget[key] = value
  }

  _setWidgetHandler( event, handler ) {
    throw new Error( this.tagName + ' does not have event ' + event );
  }

  _reindexChildWidgets() {
    let index = 0;
    for ( let i = 0; i < this.childNodes.length; i++ ) {
      const childNode = this.childNodes[i]
      if (childNode instanceof Widget) {
        childNode.widgetIndex = index++
      }
    }
  }

  _getParentWidget () {
    return this.parentNode.hasWidget
      ? this.parentNode
      : this.parentNode.__getParentWidget()
  }
}

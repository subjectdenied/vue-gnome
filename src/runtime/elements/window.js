import Gtk from '../gtk';

import { Element } from './element'
import { Widget } from './widget';

export class Window extends Element {
  constructor( tagName ) {
    super( tagName );

    this.window = null;

    this.showHandler = null;
  }

  appendChild( childNode ) {
    super.appendChild( childNode );

    if ( !( childNode instanceof Widget ) )
      throw new Error( 'Window can only contain child widgets' );

    if ( this.childNodes.length > 1 )
      throw new Error( 'Window can only contain one child element' );

    if ( this.window != null )
      throw new Error( 'Window child element cannot be inserted dynamically' );
  }

  insertBefore( childNode, referenceNode ) {
    throw new Error( 'Window child element cannot be inserted dynamically' );
  }

  removeChild( childNode ) {
    throw new Error( 'Window child element cannot be removed dynamically' );
  }

  setAttribute( key, value ) {
    console.log('window.setAttribute', key, value)
    super.setAttribute( key, value );

    if ( this.window != null )
      this._setWindowAttribute( key, value );
  }

  addEventListener( event, handler ) {
    super.addEventListener( event, handler );

    if ( this.window != null )
      this._setWindowHandler( event, handler );
  }

  removeEventListener( event ) {
    super.removeEventListener( event );

    if ( this.window != null )
      this._setWindowHandler( event, null );
  }

  _getDefaultAttributes() {
    return {
      width: 400,
      height: 300,
      resizeable: true,
      title: ''
    /*
      menu: false,
      margined: false,
      fullscreen: false,
      borderless: false
    */
    };
  }

  _mountWindow() {
    this.window = new Gtk.Window({
      type : Gtk.WindowType.TOPLEVEL
    })

    this.window.setDefaultSize(600, 400)

    if (this.attributes.title) {
      this.window.setTitle(this.attributes.title)
    }
    /*
    if ( this.attributes.margined )
      this.window.margined = true;
    if ( this.attributes.fullscreen )
      this.window.fullscreen = true;
    if ( this.attributes.borderless )
      this.window.borderless = true;
    */

    for ( let key in this.handlers )
      this._setWindowHandler( key, this.handlers[ key ] );

    if ( this.childNodes.length > 0 ) {
      this.childNodes[ 0 ]._mountWidget();
      this.window.add( this.childNodes[ 0 ].widget );
    }

    if ( this.showHandler != null )
      this.showHandler();

    this.window.showAll();
    //this.window.show()
    Gtk.main()
  }

  _destroyWindow() {
    this.window.close();
    this.window = null;

    for ( let i = 0; i < this.childNodes.length; i++ ) {
      const childNode = this.childNodes[ i ];
      if ( childNode instanceof Widget )
        childNode._clearWidget();
    }
  }

  _setWindowAttribute( key, value ) {
    const size = null

    console.log('set window attribute', key, value)
    switch (key) {
      case 'title':
        if (this.window.getTitle() !== value) {
          this.window.setTitle(value)
        }
        break
      case 'width':
        size = this.window.getSize()
        if (size.width !== value) {
          this.window.setSize(value, size.height)
        }
        break
      case 'height':
        size = this.window.getSize()
        if (size.height !== value) {
          this.window.setSize(size.width, value)
        }
        break
      case 'resizeable':
        if (this.window.getResizeable() !== value) {
          this.window.setResizeable(value)
        }
        break
    }
  }

  _setWindowHandler( event, handler ) {
    switch (event) {
      case 'close':
        this.window.on('destroy', handler)
        break
      case 'delete':
        this.window.on('delete-event', handler)
        break
      default:
        throw new Error( 'Window does not have event ' + event )
    }
  }
}

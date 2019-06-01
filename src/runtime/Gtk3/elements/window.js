import Gtk from '../../gtk';

import { Element } from './element'
import { Widget } from './widget';
import { HeaderBar } from './headerbar'

export class Window extends Element {
  constructor( tagName ) {
    super( tagName );

    this.window = null;

    this.showHandler = null;
  }

  appendChild( childNode ) {
    super.appendChild( childNode );

    if (childNode instanceof HeaderBar) {
      this.setAttribute('titlebar', childNode.widget)
    }

    if ( !( childNode instanceof Widget ) )
      throw new Error( 'Window can only contain child widgets' );

    if ( this.childNodes.length > 1 )
      // throw new Error( 'Window can only contain one child element' );

    if ( this.window != null )
      throw new Error( 'Window child element cannot be inserted dynamically' );
  }

  insertBefore( childNode, referenceNode ) {
    throw new Error( 'Window child element cannot be inserted dynamically' );
  }

  removeChild( childNode ) {
    super.removeChild( childNode );

    if (childNode instanceof HeaderBar) {
      this.setAttribute('titlebar', null)
    } else {
      throw new Error( 'Window child element cannot be removed dynamically' );
    }
  }

  setAttribute( key, value ) {
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
      acceptFocus: true,
      // application: null,
      // attachedTo: null,
      decorated: true,
      defaultHeight: -1,
      defaultWidth: -1,
      deletable: true,
      destroyWithParent: false,
      focusOnMap: true,
      focusVisible: true,
      // gravity: Gdk.GravityType.NORTH_WEST,
      hasResizeGrip: false,
      hasToplevelFocus: false,
      hideTitlebarWhenMaximized: false,
      // icon: null,
      iconName: null,
      isActive: false,
      isMaximized: false,
      mnemonicsVisible: true,
      modal: false,
      resizable: true,
      resizableGripVisible: false,
      role: null,
      // screen: null,
      skipPagerHint: false,
      skipTaskbarHint: false,
      startupId: null,
      title: null,
      // transientFor: null,
      type: Gtk.WindowType.TOPLEVEL,
      // typeHint: Gdk.WindowTypeHint.NORMAL,
      urgencyHint: false,
      windowPosition: Gtk.PositionType.NONE,
      width: null,
      height: null,
      titlebar: null
    }
  }

  _mountWindow() {
    this.window = new Gtk.Window({
      type : Gtk.WindowType.TOPLEVEL
    })

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
      for ( let i = 0; i < this.childNodes.length; i++ ) {
        this.childNodes[i]._mountWidget()
        if (this.childNodes[i] instanceof HeaderBar && i === 0) {
          this._setWindowAttribute('titlebar', this.childNodes[i].widget)
        } else {
          this.window.add(this.childNodes[i].widget);
        }
      }
    }

    if ( this.showHandler != null )
      this.showHandler();

    this.window.showAll();
    // this.window.show()
    Gtk.main()
  }

  _destroyWindow() {
    this.window.close();
    this.window = null;

    for ( let i = 0; i < this.childNodes.length; i++ ) {
      const childNode = this.childNodes[i];
      if (childNode instanceof HeaderBar) {
        this.window.setAttribute('titlebar', null)
        childNode._clearWidget();
      }
      else if (childNode instanceof Widget)
        childNode._clearWidget();
    }
  }

  _setWindowAttribute( key, value ) {
    let size = null
    switch (key) {
      case 'titlebar':
        if (this.window.getTitlebar() !== value) {
          this.window.setTitlebar(value)
        }
        break
      case 'title':
        if (this.window.getTitle() !== value) {
          this.window.setTitle(value)
        }
        break
      case 'width':
        size = this.window.getSizeRequest()
        if (size.width !== value) {
          this.window.setSizeRequest(value, size.height)
        }
        break
      case 'height':
        size = this.window.getSizeRequest()
        if (size.height !== value) {
          this.window.setSizeRequest(size.width, value)
        }
        break
      case 'resizeable':
        if (this.window.getResizeable() !== value) {
          this.window.setResizeable(value)
        }
        break
      default:
        this.window[key] = value
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

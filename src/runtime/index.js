import Gtk from './gtk';
import { GLib, gi, Gio, Gdk, Cairo, Pango } from './gtk'

import Vue from 'core/instance/index'
import { initGlobalAPI } from 'core/global-api/index'
import { mountComponent } from 'core/instance/lifecycle'

import { patch } from './patch'

import { mustUseProp, isReservedTag, getTagNamespace, isUnknownElement } from '../util'

initGlobalAPI( Vue );

Vue.version = __VUE_VERSION__;

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

Vue.prototype.__patch__ = patch;

const mountedWindows = [];

Vue.prototype.$mount = function( el, hydrating ) {
  if ( el != null )
    throw new Error( 'Mount element is not supported' );

  mountComponent( this, el, hydrating );

  if ( this.$parent == null && this.$el.widget == null ) {
    if ( this.$el.tagName != 'Window' )
      throw new Error( 'Top level element must be a Window' );

    this.$el._mountWindow();

    mountedWindows.push( this );

    this.$on( 'hook:destroyed', () => {
      this.$el._destroyWindow();

      const index = mountedWindows.indexOf( this );
      if ( index >= 0 )
        mountedWindows.splice( index, 1 );
    } );
  }

  return this;
};

Vue.prototype.$glib = GLib
Vue.prototype.$gi = gi
Vue.prototype.$gtk = Gtk
Vue.prototype.$gdk = Gdk
Vue.prototype.$cairo = Cairo
Vue.prototype.$pango = Pango

Vue.prototype.$start = function() {
  if ( mountedWindows.indexOf( this ) < 0 ) {
    this.$mount();
  }
};

Vue.prototype.$exit = function() {
  for ( let i = mountedWindows.length - 1; i >= 0; i-- ) {
    mountedWindows[ i ].$destroy();
  }
  Gtk.mainQuit()
};

class DialogsHelper {
  constructor( vm ) {
    this.vm = vm;
  }

  msgBox( title, description ) {
    libui.UiDialogs.msgBox( this.vm.$root.$el.window, title, description );
  }

  msgBoxError( title, description ) {
    libui.UiDialogs.msgBoxError( this.vm.$root.$el.window, title, description );
  }

  openFile() {
    return libui.UiDialogs.openFile( this.vm.$root.$el.window );
  }

  saveFile() {
    return libui.UiDialogs.saveFile( this.vm.$root.$el.window );
  }
};

Object.defineProperty( Vue.prototype, '$dialogs', {
  get() {
    if ( this._dialogsHelper == null )
      this._dialogsHelper = new DialogsHelper( this );
    return this._dialogsHelper;
  }
} );

export default Vue;

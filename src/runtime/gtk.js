import nodeGtk from 'node-gtk';

let initialized = false;

function getGtk(version = '3.0') {
  const Gtk = nodeGtk.require('Gtk', version);
  if (!initialized) {
    initialized = true;
    nodeGtk.startLoop();
    Gtk.init();
  }
  return Gtk;
}

export default getGtk()
export const Gtk = getGtk()
export const GLib = nodeGtk.require('GLib')
export const Gio = nodeGtk.require('Gio')
export const Gdk = nodeGtk.require('Gdk')
export const gi = nodeGtk
export const Cairo = nodeGtk.require('cairo')
export const Pango = nodeGtk.require('Pango')
export const GObject = nodeGtk.require('GObject')

export const TYPE_INVALID = GObject.TYPE_INVALID
export const TYPE_NONE = GObject.typeFromName('void')
export const TYPE_INTERFACE = GObject.typeFromName('GInterface')
export const TYPE_CHAR = GObject.typeFromName('gchar')
export const TYPE_UCHAR = GObject.typeFromName('guchar')
export const TYPE_BOOLEAN = GObject.typeFromName('gboolean')
export const TYPE_INT = GObject.typeFromName('gint')
export const TYPE_UINT = GObject.typeFromName('guint')
export const TYPE_LONG = GObject.typeFromName('glong')
export const TYPE_ULONG = GObject.typeFromName('gulong')
export const TYPE_INT64 = GObject.typeFromName('gint64')
export const TYPE_UINT64 = GObject.typeFromName('guint64')
export const TYPE_ENUM = GObject.typeFromName('GEnum')
export const TYPE_FLAGS = GObject.typeFromName('GFlags')
export const TYPE_FLOAT = GObject.typeFromName('gfloat')
export const TYPE_DOUBLE = GObject.typeFromName('gdouble')
export const TYPE_STRING = GObject.typeFromName('gchararray')
export const TYPE_POINTER = GObject.typeFromName('gpointer')
export const TYPE_BOXED = GObject.typeFromName('GBoxed')
export const TYPE_PARAM = GObject.typeFromName('GParam')
export const TYPE_OBJECT = GObject.typeFromName('GObject')
export const TYPE_GTYPE = GObject.typeFromName('GType')
export const TYPE_STRV = GObject.typeFromName('GStrv')
export const TYPE_VARIANT = GObject.typeFromName('GVariant')
export const TYPE_UNICHAR = TYPE_UINT

export const G_TYPE = {
  string: TYPE_STRING,
  number: TYPE_INT,
  float: TYPE_FLOAT
}

export const G_TYPE_FN = {
  get: {
    string: 'getString',
    number: 'getInt',
    float: 'getFloat'
  },
  set: {
    string: 'setString',
    number: 'setInt',
    float: 'setFloat'
  }
}

function isInt(n){
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}

function getGType(n) {
  let retVal = null
  const type = typeof item
  switch (type) {
    case 'string':
      return 'string'
      break
    case 'number':
      if (isFloat(n)) {
        retVal = 'float'
      } else if (isInt(n)) {
        retVal = 'number'
      } else {
        retVal = 'string'
      }
      break
    default:
      retVal = 'string'
  }

  return retVal
}

export const setType = item => G_TYPE[getGType(item)]
export const setTypeFn = item => G_TYPE_FN.set[getGType(item)]
export const getType = item => G_TYPE[getGType(item)]
export const getTypeFn = item => G_TYPE_FN.get[getGType(item)]

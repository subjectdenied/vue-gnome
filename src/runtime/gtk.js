import nodeGtk from 'node-gtk';

/*
export default Gtk = nodeGtk.require('Gtk', '3.0')
export const gi = nodeGtk
*/
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

export default getGtk();
export const gi = nodeGtk

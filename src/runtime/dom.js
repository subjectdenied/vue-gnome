import { TextNode } from './nodes/textnode'
import { Comment } from './nodes/comment'
import { Element } from './Gtk3/elements/element'
import { Widget } from './Gtk3/elements/widget'
import * as elements from './Gtk3/elements'

export default { TextNode, Comment, Element, Widget, ...elements, elements }

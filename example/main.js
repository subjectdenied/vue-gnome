import Vue from 'vuido'

// import MainWindow from './MainWindow'
import vgBox from './vgBox'
import vgGrid from './vgGrid'
import vgListBox from './vgListBox'

const window = new Vue({
  render(h) {
    return h(vgListBox)
  }
})

window.$start()

const Screen = require('../Screen.js')
const InputBinder = require('../InputBinder.js')

class MainUIScreen extends Screen {
  constructor () {
    super('MainUIScreen', 'stack', new InputBinder())

    this.init()
    this.initInput()

    this.cross = null
    this.crossbar = null
    this.crossbar_selected = null

    this.chatlog = []
    for (let i = 0; i < 8; i++) {
      this.chatlog[i] = this.dom.children[3].children[i]
    }

    this.heartFull = []
    this.heartHalf = []

    this.heartBackgroundBlack = null
    this.heartBackgroundWhite = null

    this.heartFull = []
    this.heartHalf = []
    this.lastHealth = 0
  }

  init () {
    this.dom.innerHTML = (
      '<div id="cross" style="position:fixed; left:50%; top:50%; width:32px; height:32px; margin:-16px 0px 0px -16px; display: block;">' +
        '<img src="./assets/gui/cross.png"></img>' +
      '</div>' +

      '<div id="crossbar" style="position: fixed; left: 31.8%; bottom: 0%; width: 36.4vw; display: block;">' +
        '<img src="./assets/gui/crossbar.png" style="width: 36.4vw;"></img>' +
      '</div>' +

      '<div id="crossbar_selected" style="position: fixed; left: calc(31.8% - 0.2vw); bottom: -0.2vw; width: 4.8vw; display: block;">' +
        '<img src="./assets/gui/crossbar_selected.png" style="width: 4.8vw;"></img>' +
      '</div>' +

      '<div id="chatlog" style="position: fixed; left: 0; bottom: 15vh; width: 50vw; height: calc(26px * 8); display: block;">' +
        '<div id="chat1" style="color: #F1F1F1; background-color: rgba(0, 0, 0, 0.25);"></div>' +
        '<div id="chat2" style="color: #F1F1F1; background-color: rgba(0, 0, 0, 0.25);"></div>' +
        '<div id="chat3" style="color: #F1F1F1; background-color: rgba(0, 0, 0, 0.25);"></div>' +
        '<div id="chat4" style="color: #F1F1F1; background-color: rgba(0, 0, 0, 0.25);"></div>' +
        '<div id="chat5" style="color: #F1F1F1; background-color: rgba(0, 0, 0, 0.25);"></div>' +
        '<div id="chat6" style="color: #F1F1F1; background-color: rgba(0, 0, 0, 0.25);"></div>' +
        '<div id="chat7" style="color: #F1F1F1; background-color: rgba(0, 0, 0, 0.25);"></div>' +
        '<div id="chat8" style="color: #F1F1F1; background-color: rgba(0, 0, 0, 0.25);"></div>' +
      '</div>' +

      '<div id="heart_background_black" style="position: fixed; left: calc(31.8%); bottom: 6.4vw; width: 16.2vw; display: block;">' +
        '<img id="heart_background_black_0" src="./assets/gui/heart_background_black.png" style="position: fixed; left: calc(31.8%); width: 1.8vw;"></img>' +
        '<img id="heart_background_black_1" src="./assets/gui/heart_background_black.png" style="position: fixed; left: calc(31.8% + 1.6vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_black_2" src="./assets/gui/heart_background_black.png" style="position: fixed; left: calc(31.8% + 3.2vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_black_4" src="./assets/gui/heart_background_black.png" style="position: fixed; left: calc(31.8% + 6.4vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_black_3" src="./assets/gui/heart_background_black.png" style="position: fixed; left: calc(31.8% + 4.8vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_black_5" src="./assets/gui/heart_background_black.png" style="position: fixed; left: calc(31.8% + 8vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_black_7" src="./assets/gui/heart_background_black.png" style="position: fixed; left: calc(31.8% + 11.2vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_black_6" src="./assets/gui/heart_background_black.png" style="position: fixed; left: calc(31.8% + 9.6vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_black_8" src="./assets/gui/heart_background_black.png" style="position: fixed; left: calc(31.8% + 12.8vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_black_9" src="./assets/gui/heart_background_black.png" style="position: fixed; left: calc(31.8% + 14.4vw); width: 1.8vw;"></img>' +
      '</div>' +

      '<div id="heart_background_white" style="position: fixed; left: calc(31.8%); bottom: 6.4vw; width: 16.2vw; display: none">' +
        '<img id="heart_background_white_0" src="./assets/gui/heart_background_white.png" style="position: fixed; left: calc(31.8%); width: 1.8vw;"></img>' +
        '<img id="heart_background_white_1" src="./assets/gui/heart_background_white.png" style="position: fixed; left: calc(31.8% + 1.6vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_white_2" src="./assets/gui/heart_background_white.png" style="position: fixed; left: calc(31.8% + 3.2vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_white_3" src="./assets/gui/heart_background_white.png" style="position: fixed; left: calc(31.8% + 4.8vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_white_4" src="./assets/gui/heart_background_white.png" style="position: fixed; left: calc(31.8% + 6.4vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_white_5" src="./assets/gui/heart_background_white.png" style="position: fixed; left: calc(31.8% + 8vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_white_6" src="./assets/gui/heart_background_white.png" style="position: fixed; left: calc(31.8% + 9.6vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_white_7" src="./assets/gui/heart_background_white.png" style="position: fixed; left: calc(31.8% + 11.2vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_white_8" src="./assets/gui/heart_background_white.png" style="position: fixed; left: calc(31.8% + 12.8vw); width: 1.8vw;"></img>' +
        '<img id="heart_background_white_9" src="./assets/gui/heart_background_white.png" style="position: fixed; left: calc(31.8% + 14.4vw); width: 1.8vw;"></img>' +
      '</div>' +

      '<div id="heart_full" style="position: fixed; left: calc(31.8%); bottom: 6.4vw; width: 16.2vw; display: block">' +
        '<img id="heart_full_0" src="./assets/gui/heart_full.png" style="position: fixed; left: calc(31.8%); width: 1.8vw; display: none"></img>' +
        '<img id="heart_full_1" src="./assets/gui/heart_full.png" style="position: fixed; left: calc(31.8% + 1.6vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_full_2" src="./assets/gui/heart_full.png" style="position: fixed; left: calc(31.8% + 3.2vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_full_3" src="./assets/gui/heart_full.png" style="position: fixed; left: calc(31.8% + 4.8vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_full_4" src="./assets/gui/heart_full.png" style="position: fixed; left: calc(31.8% + 6.4vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_full_5" src="./assets/gui/heart_full.png" style="position: fixed; left: calc(31.8% + 8vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_full_6" src="./assets/gui/heart_full.png" style="position: fixed; left: calc(31.8% + 9.6vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_full_7" src="./assets/gui/heart_full.png" style="position: fixed; left: calc(31.8% + 11.2vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_full_8" src="./assets/gui/heart_full.png" style="position: fixed; left: calc(31.8% + 12.8vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_full_9" src="./assets/gui/heart_full.png" style="position: fixed; left: calc(31.8% + 14.4vw); width: 1.8vw; display: none"></img>' +
      '</div>' +

      '<div id="heart_half" style="position: fixed; left: calc(31.8%); bottom: 6.4vw; width: 16.2vw; display: block">' +
        '<img id="heart_half_0" src="./assets/gui/heart_half.png" style="position: fixed; left: calc(31.8%); width: 1.8vw; display: none"></img>' +
        '<img id="heart_half_1" src="./assets/gui/heart_half.png" style="position: fixed; left: calc(31.8% + 1.6vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_half_2" src="./assets/gui/heart_half.png" style="position: fixed; left: calc(31.8% + 3.2vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_half_3" src="./assets/gui/heart_half.png" style="position: fixed; left: calc(31.8% + 4.8vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_half_4" src="./assets/gui/heart_half.png" style="position: fixed; left: calc(31.8% + 6.4vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_half_5" src="./assets/gui/heart_half.png" style="position: fixed; left: calc(31.8% + 8vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_half_6" src="./assets/gui/heart_half.png" style="position: fixed; left: calc(31.8% + 9.6vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_half_7" src="./assets/gui/heart_half.png" style="position: fixed; left: calc(31.8% + 11.2vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_half_8" src="./assets/gui/heart_half.png" style="position: fixed; left: calc(31.8% + 12.8vw); width: 1.8vw; display: none"></img>' +
        '<img id="heart_half_9" src="./assets/gui/heart_half.png" style="position: fixed; left: calc(31.8% + 14.4vw); width: 1.8vw; display: none"></img>' +
      '</div>'
    )
  }

  initInput () {
    const MainScreen = Vokkit.getClient().getScreenManager().getScreen('MainScreen')
    let renderer = MainScreen.getRenderer()

    this.inputBinder.disableCursor = true

    renderer.domElement.requestPointerLock = (
      renderer.domElement.requestPointerLock ||
      renderer.domElement.mozRequestPointerLock
    )

    renderer.domElement.onclick = function (e) {
      renderer.domElement.requestPointerLock()
    }

    this.inputBinder.setMouseMoveListener(event => {
      var location = Vokkit.getClient().getLocalPlayer().getLocation()

      location.setYaw(location.getYaw() + event.movementX / 1000)
      location.setPitch(location.getPitch() - event.movementY / 1000)
      Vokkit.getClient().getLocalPlayer().teleport(location)
      MainScreen.updateGroup(location)
    })

    this.inputBinder.setMouseDownListener(event => {
      if (event.button === 0 || event.button === undefined) {
        MainScreen.press[6] = true
      } else if (event.button === 1) {
        // 선택된 블럭을 인벤토리에 넣음. TODO
      } else if (event.button === 2) {
        MainScreen.press[7] = true
      }
    })

    this.inputBinder.setMouseUpListener(event => {
      if (event.button === 0 || event.button === undefined) {
        MainScreen.press[6] = false
      } else if (event.button === 2) {
        MainScreen.press[7] = false
      }
    })

    this.inputBinder.setKeyDownListener(event => {
      if (event.keyCode === 87) { // w
        MainScreen.press[0] = true
      } else if (event.keyCode === 83) { // s
        MainScreen.press[1] = true
      } else if (event.keyCode === 65) { // a
        MainScreen.press[2] = true
      } else if (event.keyCode === 68) { // d
        MainScreen.press[3] = true
      } else if (event.keyCode === 32) { // space
        MainScreen.press[4] = true
      } else if (event.keyCode === 16) { // shift
        MainScreen.press[5] = true
      } else if (event.keyCode >= 49 && event.keyCode <= 57) { // 1 ~ 9
        Vokkit.getClient().getLocalPlayer().setSelectedSlotId(event.keyCode - 49)
        Vokkit.getClient().getScreenManager().getScreen('MainUIScreen').updateCrossbarSelected()
      }
      if (event.keyCode === 84) {
        Vokkit.getClient().getScreenManager().addScreen('ChatScreen')
        Vokkit.getClient().getScreenManager().getScreen('ChatScreen').syncChat()
        Vokkit.getClient().getInputManager().showCursor()
      }

    })

    this.inputBinder.setPointerUnlockListener(() => {
      Vokkit.getClient().getScreenManager().addScreen('PauseScreen')
      Vokkit.getClient().getInputManager().showCursor()
    })

    this.inputBinder.setkeyUpListener(event => {
      if (event.keyCode === 87) {
        MainScreen.press[0] = false
      } else if (event.keyCode === 83) {
        MainScreen.press[1] = false
      } else if (event.keyCode === 65) {
        MainScreen.press[2] = false
      } else if (event.keyCode === 68) {
        MainScreen.press[3] = false
      } else if (event.keyCode === 32) {
        MainScreen.press[4] = false
      } else if (event.keyCode === 16) {
        MainScreen.press[5] = false
      }
    })

    let lastTimestamp
    this.inputBinder.setMouseWheelListener(event => {
      if (event.timeStamp - lastTimestamp < 1) return
      lastTimestamp = event.timeStamp
      const localPlayer = Vokkit.getClient().getLocalPlayer()
      const mainUiScreen = Vokkit.getClient().getScreenManager().getScreen('MainUIScreen')

      if (event.deltaY > 0) {
        // 아래로 스크롤 - 오른쪽으로 이동
        const selectedSlotId = localPlayer.getSelectedSlotId()
        if (selectedSlotId == 8) localPlayer.setSelectedSlotId(0)
        else localPlayer.setSelectedSlotId(selectedSlotId + 1)
        mainUiScreen.updateCrossbarSelected()
      } else if (event.deltaY < 0) {
        // 위로 스크롤 - 왼쪽으로 이동
        const selectedSlotId = localPlayer.getSelectedSlotId()
        if (selectedSlotId == 0) localPlayer.setSelectedSlotId(8)
        else localPlayer.setSelectedSlotId(selectedSlotId - 1)
        mainUiScreen.updateCrossbarSelected()
      }
    })
  }

  addChat (message) {
    for (let i = 0; i < 8; i++) {
      if (this.chatlog[i].innerText === '') {
        this.chatlog[i].innerText = message

        return
      }
    }

    for (let i = 0; i < 7; i++) {
      this.chatlog[i].innerText = this.chatlog[i + 1].innerText
    }
    this.chatlog[7].innerText = message
  }

  updateCrossbarSelected () {
    if (this.cross == null) {
      this.cross = document.getElementById('cross')
      this.crossbar = document.getElementById('crossbar')
      this.crossbar_selected = document.getElementById('crossbar_selected')
    }

    const selectedSlotId = Vokkit.getClient().getLocalPlayer().getSelectedSlotId()
    this.crossbar_selected.style.left = `calc(31.8% - 0.2vw + ${selectedSlotId * 4}vw)`
  }

  updateHealthBar () {
    if (this.heartBackgroundBlack == null) {
      for (let i = 0; i < 10; i++) {
        //this.heartBackgroundBlack[i] = document.getElementById(`heart_background_black_${i}`)
        this.heartFull[i] = document.getElementById(`heart_full_${i}`)
        this.heartHalf[i] = document.getElementById(`heart_half_${i}`)
      }

      this.heartBackgroundBlack = document.getElementById('heart_background_black')
      this.heartBackgroundWhite = document.getElementById('heart_background_white')
    }

    const health = Vokkit.getClient().getLocalPlayer().getHealth()

    if (health < this.lastHealth) {
      let count = 0
      const manager = this
      const animation = () => {
        if (count % 2 == 0) {
          manager.heartBackgroundBlack.style.display = 'block'
          manager.heartBackgroundWhite.style.display = 'none'
        } else {
          manager.heartBackgroundBlack.style.display = 'none'
          manager.heartBackgroundWhite.style.display = 'block'
        }

        if (count > 3) {
          clearInterval(interval)
        }

        count++
      }

      animation()
      const interval = setInterval(animation, 150)
    }
    const fullHeart = Math.floor(health / 2)

    let i = 0

    for (; i < fullHeart;) {
      this.heartFull[i].style.display = 'block'
      this.heartHalf[i].style.display = 'none'
      i++
    }

    if (health % 2 == 1 && i < 10) {
      this.heartFull[i].style.display = 'none'
      this.heartHalf[i].style.display = 'block'
      i++
    }

    for (; i < 10; i++) {
      this.heartFull[i].style.display = 'none'
      this.heartHalf[i].style.display = 'none'
    }

    this.lastHealth = health
  }
}

module.exports = MainUIScreen

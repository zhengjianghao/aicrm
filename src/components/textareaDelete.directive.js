
import globalConstant from 'src/misc/global.constant.js'
const shortList = globalConstant.shortList
/**
 *
 * 当用户删除shortList中的任意一个字符时，将其整个删除
 * @param {any} shortList
 * @param {any} content
 * @param {any} startPos
 * @param {any} domElement
 * @description
 */
function delArea(shortList, content, startPos, domElement, disc) {
  var len = shortList.length
  var doContinue = true
  var resetStartPos = startPos
  for (var i = 0; i < len; i++) {
    var patt = new RegExp(shortList[i].name, "g")
    while ((patt.exec(content.value)) != null && doContinue) {
      if (shortList[i].name == '回TD退订') {
        var TD = true
        doContinue = selAndDelBlock(resetStartPos, [patt.lastIndex - shortList[i].name.length, patt.lastIndex], domElement, disc, TD)
        if (doContinue === 1) { // 在TD右按backspace 判断并删除前一个<>标签
          resetStartPos = patt.lastIndex - shortList[i].name.length
        }
      } else {
        doContinue = selAndDelBlock(resetStartPos, [patt.lastIndex - shortList[i].name.length, patt.lastIndex], domElement, disc)
      }
    }
    if (!doContinue) {
      break
    }
  }
}
// 点击退订或其他标签跳最前
function jump(shortList, content, startPos, domElement) {
  var doContinue = true
  var len = shortList.length
  for (var i = 0; i < len; i++) {
    var patt = new RegExp(shortList[i].name, "g")
    while ((patt.exec(content.value)) != null && doContinue) {
      if (shortList[i].name == "回TD退订") {
        var TD = true
        doContinue = selAndDelBlock(startPos, [patt.lastIndex - 5, patt.lastIndex], domElement, undefined, TD)
      } else {
        let disc = "listName"
        doContinue = selAndDelBlock(startPos, [patt.lastIndex - shortList[i].name.length, patt.lastIndex], domElement, disc)
      }
    }
  }
}

/**
 *
 * 选中并删除文字块
 * @param {any} startPos
 * @param {any} areaIndex
 * @param {any} domElement
 * @returns
 * @description
 */
function selAndDelBlock(startPos, areaIndex, domElement, disc, TD) {
  if (TD && disc != 'right' && disc != 'left' && disc != 'delete') {
    // if (disc == 'right') {
    //   if (startPos >= areaIndex[0] && startPos <= areaIndex[1]) { // 退订右移
    //     domElement.selectionStart = areaIndex[0] - 1
    //     domElement.selectionEnd = areaIndex[0]
    //     return false
    //   } else {
    //     return true
    //   }
    // } else if (disc == 'left') {
    //   if (startPos > areaIndex[0] && startPos <= areaIndex[1]) { // 退订左移
    //     return judgeTD(areaIndex, domElement)
    //   } else {
    //     return true
    //   }
    // } else
    if (disc == 'backspace') {
      if (startPos >= areaIndex[0] && startPos <= areaIndex[1]) { // 在TD右按backspace 判断并删除前一个<>标签
        domElement.selectionStart = areaIndex[0]
        domElement.selectionEnd = areaIndex[0]
        return 1
      } else {
        return true
      }
    } else {
      if(startPos > areaIndex[0] && startPos <= areaIndex[1]) { // 点击退订跳最前
        return judgeTD(areaIndex, domElement, TD)
      } else {
        return true
      }
    }
  } else {
    if (disc == 'right' || disc == 'delete') {
      if (startPos >= areaIndex[0] && startPos < areaIndex[1]) { // 右移标签跳转 、 del回删
        return judgeTD(areaIndex, domElement)
      } else {
        return true
      }
    } else if (disc == 'left') {
      if (startPos > areaIndex[0] && startPos <= areaIndex[1]) { // 左移标签跳转
        return judgeTD(areaIndex, domElement)
      } else {
        return true
      }
    } else if (disc == 'listName') {
      if (startPos > areaIndex[0] && startPos < areaIndex[1]) { // 点击光标移至最前
        return judgeTD(areaIndex, domElement, 1)
      } else {
        return true
      }
    } else {
      if (startPos > areaIndex[0] && startPos <= areaIndex[1]) { // 删除的时候执行
        return judgeTD(areaIndex, domElement)
      } else {
        return true
      }
    }
  }
}
function judgeTD(areaIndex, domElement, TD) {
  if (TD) {
    domElement.selectionStart = areaIndex[0]
    domElement.selectionEnd = areaIndex[0]
    return false
  } else {
    domElement.selectionStart = areaIndex[0]
    domElement.selectionEnd = areaIndex[1]
    return false
  }
}

export default {
  install(Vue, option) {
    Vue.directive('textareaDelete', {
      inserted: function (el, binding) {
        //监控删除按键
        el.onkeydown = function (event) {
          var e = event
          //获得光标位置
          var startPos = el.selectionStart
          var disc
          if (e && (e.keyCode == 8)) { // backspace
            if (el.selectionStart || el.selectionStart === 0) {
              disc = 'backspace'
              //获得要删除的区域(数组[起始位置，结束位置]：例如[12,24])
              //选中并删除
              delArea(shortList, el, startPos, el, disc)
            }
          } else if (e && (e.keyCode == 46)) { // del
            if (el.selectionStart || el.selectionStart === 0) {
              disc = 'delete'
              delArea(shortList, el, startPos, el, disc)
            }
          } else if (e && (e.keyCode == 39)) { // →
            if (el.selectionStart || el.selectionStart === 0) {
              disc = 'right'
              delArea(shortList, el, startPos, el, disc)
            }
          } else if (e && (e.keyCode == 37)) { // ←
            if (el.selectionStart || el.selectionStart === 0) {
              disc = 'left'
              delArea(shortList, el, startPos, el, disc)
            }
          } else {
            if (el.selectionStart || el.selectionStart === 0) {
              jump(shortList, el, startPos, el)
            }
          }
        }
        el.onclick = function (event) {
          var e = event
          if (el.selectionStart || el.selectionStart === 0) {
            //获得光标位置
            var startPos = el.selectionStart
            jump(shortList, el, startPos, el)
          }
        }
      }
    })
  }
}

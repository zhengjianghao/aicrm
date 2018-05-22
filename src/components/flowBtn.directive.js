/*
 * @Author: xiamu
 * @Date: 2017-11-13 11:35:35
 * @Last Modified by: xiamu
 * @Last Modified time: 2017-11-15 17:43:53
 * 需要在用到的DOM节点及其父级添加ID targetDiv containerDiv
 */

/**
 * 鼠标滚动 保存按钮显示隐藏（不兼容Firefox）
 */
function bindScroll() {
  // 父元素离底部距离
  const bottomHeight = 12
  let that = this
  // 获取父级元素
  let containerDiv = document.getElementById('containerDiv')
  // 获取滑动元素
  let targetDiv = document.getElementById('targetDiv')
  let div = document.createElement('div')
  containerDiv.onmousewheel = function (e) {
    e = e || window.event
    if (e.wheelDelta) { // IE/Chrome/Opera
      if (e.wheelDelta > 0) { // 上滚
        window.onscroll = function () {
          if (getScrollTop() + getWindowHeight() < getScrollHeight() - bottomHeight) {
            showHideBtn('hide', div)
          }
        }
      } else { // 下滚
        window.onscroll = function () {
          if (getScrollTop() + getWindowHeight() >= getScrollHeight() - bottomHeight) {
            showHideBtn('hide', div)
          } else {
            showHideBtn('show', div)
          }
        }
      }
      // 横向滚动时跟随移动
      let posLeft = getDivLeft(containerDiv) - getScrollLeft()
      targetDiv.style.left = posLeft + 'px'
    }
  }
}

/**
 * 保存按钮显示隐藏
 * @param state {String} 显示或隐藏保存按钮
 * @param div {Element} 父级传递的代替原按钮的元素
 */
function showHideBtn(state, div) {
  let containerDiv = document.getElementById('containerDiv')
  let targetDiv = document.getElementById('targetDiv')
  if (targetDiv && containerDiv) {
    if (state === 'show') {
      div.classList.add('form-bottom')
      containerDiv.appendChild(div)
      targetDiv.classList.add('is-fixed')
    } else if (state === 'hide') {
      if (div.classList.contains('form-bottom')) {
        div.classList.remove('form-bottom')
        if (div) {
          containerDiv.removeChild(div)
        }
      }
      if (targetDiv) {
        targetDiv.classList.remove('is-fixed')
      }
    }
  }
}

/**
 * 获取滚动条在Y轴上的滚动距离
 * @returns {number}
 */
function getScrollTop() {
  let scrollTop = 0
  let bodyScrollTop = 0
  let documentScrollTop = 0
  if (document.body) {
    bodyScrollTop = document.body.scrollTop
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
  return scrollTop
}

/**
 * 获取文档的总高度
 * @returns {number}
 */
function getScrollHeight() {
  let scrollHeight = 0
  let bodyScrollHeight = 0
  let documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
  return scrollHeight
}

/**
 * 获取浏览器视口的高度
 * @returns {number}
 */
function getWindowHeight() {
  var windowHeight = 0
  if (document.compatMode == "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}

/**
 * 获取滚动条横向滚动距离
 * @returns {number}
 */
function getScrollLeft() {
  let scrollLeft = 0
  let bodyScrollLeft = 0
  let documentScrollLeft = 0
  if (document.body) {
    bodyScrollLeft = document.body.scrollLeft
  }
  if (document.documentElement) {
    documentScrollLeft = document.documentElement.scrollLeft
  }
  scrollLeft = (bodyScrollLeft - documentScrollLeft > 0) ? bodyScrollLeft : documentScrollLeft
  return scrollLeft
}

/**
 * 获取父级离窗口左边距离
 * @param div {Element} 父级传递的代替原按钮的元素
 * @returns {number}
 */
function getDivLeft(div) {
  let divLeft = 0
  divLeft = div.offsetLeft
  while ((div = div.offsetParent) != undefined) {
    divLeft += div.offsetLeft
  }
  return divLeft
}

export default {
  install(Vue, option) {
    Vue.directive('flowBtn', {
      inserted: function (el) {
        bindScroll()
      }
    })
  }
}

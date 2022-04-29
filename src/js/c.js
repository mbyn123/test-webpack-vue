import '../css/style.css'
import '../css/title.less'
import '../css/img.css'
import '../font/iconfont.css'
import zzhnImage from '../img/zznh.png';
import a from '../img/a.png'

const divEl = document.createElement('div')
divEl.className='title'
divEl.innerHTML = 'hello word'

// 設置背景圖片
const bgEl = document.createElement('div')
bgEl.className = 'bg-image'

// 设置img元素的src
const imgEl = document.createElement('img');
imgEl.src = zzhnImage;

// i元素
const iEl = document.createElement('i')
iEl.className = 'iconfont icon-ashbin'

// 设置img元素的src
const imgEl2 = document.createElement('img');
imgEl2.src = a;

console.log('111122223333')

document.body.appendChild(divEl)
document.body.appendChild(iEl)
document.body.appendChild(bgEl)
document.body.appendChild(imgEl)
document.body.appendChild(imgEl2)

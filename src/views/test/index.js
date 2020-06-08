import React from 'react'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'

const MOCK_DATA = "Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it."
export default class test extends React.Component {
  mdParser = null
  constructor(props) {
    super(props)
    this.mdParser = new MarkdownIt(/* Markdown-it options */)
  }
  handleEditorChange ({html, text}) {    
    console.log('handleEditorChange', html, text)
  }
  handleImageUpload(file, callback) {
    const reader = new FileReader()
    reader.onload = () => {      
      const convertBase64UrlToBlob = (urlData) => {  
        let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], {type:mime})
      }
      const blob = convertBase64UrlToBlob(reader.result)
      setTimeout(() => {
        // setTimeout 模拟异步上传图片
        // 当异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
        const uploadedUrl = 'https://avatars0.githubusercontent.com/u/21263805?s=40&v=4'
        callback(uploadedUrl)
      }, 1000)
    }
    reader.readAsDataURL(file)
  }
  render() {
    return (      
      <div style={{height: '500px'}}>
        <MdEditor
          value={MOCK_DATA}
          renderHTML={(text) => this.mdParser.render(text)}
          onChange={this.handleEditorChange} 
          onImageUpload={this.handleImageUpload}
        />                
      </div>
    )
  }
}
'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { setCookie } from 'cookies-next'

function Upload() {
  const [file, setFile] = useState<File>()
  const id = (Math.round(new Date().getTime() + Math.random()*10000)).toString()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      
      data.set('file', file)
      
      const title = (document.getElementById('title')! as HTMLInputElement).value
      const description = (document.getElementById('description')! as HTMLTextAreaElement).value
      const tag_ = document.getElementById('tag')! as HTMLSelectElement
      const tag = tag_.options[tag_.selectedIndex].value
      setCookie('id', id)
      fetch('/api/video/upload', {
        method: 'POST',
        headers: {
          title: title,
          description: description,
          tag: tag,
          isVideo:'true'
        },
        body: data
      }).then(res => {
        if (!res.ok) res.text().then(_=>{throw new Error()})
        window.location.href += '/etcfile'
      })
      // handle the error
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }
  return (
    <div className='uploadForm'>
      <form onSubmit={onSubmit} className='uploadForm'>
        <div className='uploadsrc'>
          <video className='testVideo' src={file? window.URL.createObjectURL(file): ''} controls></video>
        </div>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input id="title" type="text" placeholder='영상 제목' />
        <textarea id="description" placeholder='영상 설명' />
        <select name="tag" id="tag" defaultValue={'math'}>
            <option value="math">수학</option>
            <option value="krla">국어</option>
            <option value="engl">영어</option>
            <option value="phs1">물리1</option>
            <option value="phs2">물리2</option>
            <option value='chm1'>화학1</option>
            <option value='chm2'>화학2</option>
            <option value='bio1'>생명1</option>
            <option value='bio2'>생명2</option>
            <option value='esc1'>지구1</option>
            <option value='esc2'>지구2</option>
            <option value='eths'>윤사</option>
            <option value='kgry'>한지</option>
            <option value='wgry'>세지</option>
            <option value='leth'>생윤</option>
            <option value='pola'>정법</option>
            <option value='sclt'>사문</option>
            <option value='tgry'>여지</option>
        </select>
        <input type="submit" value="Upload" />
      </form>
    </div>
  )
}












export default Upload;

import React, { useRef } from 'react'
import html2canvas from 'html2canvas'
import { Download, Share2, Camera } from 'lucide-react'

interface ImageShareButtonProps {
  targetElementId: string
  fileName?: string
  className?: string
}

export function ImageShareButton({ 
  targetElementId, 
  fileName = 'glass-note-result',
  className = ''
}: ImageShareButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const captureAndDownload = async () => {
    try {
      const element = document.getElementById(targetElementId)
      if (!element) {
        console.error('Target element not found:', targetElementId)
        return
      }

      // ローディング状態を表示
      if (buttonRef.current) {
        buttonRef.current.disabled = true
        buttonRef.current.textContent = '画像生成中...'
      }

      // html2canvasで画像を生成
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // 高解像度
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight
      })

      // CanvasをBlobに変換
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create blob')
          return
        }

        // ダウンロード用のURLを作成
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${fileName}-${new Date().toISOString().split('T')[0]}.png`
        
        // ダウンロードを実行
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // メモリを解放
        URL.revokeObjectURL(url)

        // ボタンの状態をリセット
        if (buttonRef.current) {
          buttonRef.current.disabled = false
          buttonRef.current.textContent = '画像を保存'
        }
      }, 'image/png', 0.95)

    } catch (error) {
      console.error('Error capturing image:', error)
      if (buttonRef.current) {
        buttonRef.current.disabled = false
        buttonRef.current.textContent = '画像を保存'
      }
    }
  }

  const shareImage = async () => {
    try {
      const element = document.getElementById(targetElementId)
      if (!element) {
        console.error('Target element not found:', targetElementId)
        return
      }

      // ローディング状態を表示
      if (buttonRef.current) {
        buttonRef.current.disabled = true
        buttonRef.current.textContent = '画像生成中...'
      }

      // html2canvasで画像を生成
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight
      })

      // CanvasをBlobに変換
      canvas.toBlob(async (blob) => {
        if (!blob) {
          console.error('Failed to create blob')
          return
        }

        // Web Share APIが利用可能かチェック
        if (navigator.share && navigator.canShare) {
          try {
            const file = new File([blob], `${fileName}.png`, { type: 'image/png' })
            await navigator.share({
              title: 'グラスノオト - 相性診断結果',
              text: '相性診断の結果をシェアします！',
              files: [file]
            })
          } catch (shareError) {
            console.log('Share cancelled or failed:', shareError)
            // シェアがキャンセルされた場合はダウンロードにフォールバック
            captureAndDownload()
          }
        } else {
          // Web Share APIが利用できない場合はダウンロード
          captureAndDownload()
        }

        // ボタンの状態をリセット
        if (buttonRef.current) {
          buttonRef.current.disabled = false
          buttonRef.current.textContent = '画像を保存'
        }
      }, 'image/png', 0.95)

    } catch (error) {
      console.error('Error sharing image:', error)
      if (buttonRef.current) {
        buttonRef.current.disabled = false
        buttonRef.current.textContent = '画像を保存'
      }
    }
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        ref={buttonRef}
        onClick={captureAndDownload}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download size={16} />
        画像を保存
      </button>
      
      <button
        onClick={shareImage}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Share2 size={16} />
        シェア
      </button>
    </div>
  )
}

import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { Download, Share2, Camera, X, Save } from 'lucide-react'

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
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const generateImage = async () => {
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

      // CanvasをDataURLに変換してプレビュー表示
      const dataURL = canvas.toDataURL('image/png', 0.95)
      setPreviewImage(dataURL)
      setShowPreview(true)

      // ボタンの状態をリセット
      if (buttonRef.current) {
        buttonRef.current.disabled = false
        buttonRef.current.textContent = '画像を表示'
      }

    } catch (error) {
      console.error('Error capturing image:', error)
      if (buttonRef.current) {
        buttonRef.current.disabled = false
        buttonRef.current.textContent = '画像を表示'
      }
    }
  }

  const downloadImage = () => {
    if (!previewImage) return

    const link = document.createElement('a')
    link.href = previewImage
    link.download = `${fileName}-${new Date().toISOString().split('T')[0]}.png`
    
    // ダウンロードを実行
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
    <>
      <div className={`flex gap-2 ${className}`}>
        <button
          ref={buttonRef}
          onClick={generateImage}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera size={16} />
          画像を表示
        </button>
        
        <button
          onClick={shareImage}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Share2 size={16} />
          シェア
        </button>
      </div>

      {/* 画像プレビューモーダル */}
      {showPreview && previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden">
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold text-gray-800">画像プレビュー</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* 画像表示 */}
            <div className="p-4 max-h-[70vh] overflow-auto">
              <img
                src={previewImage}
                alt="診断結果画像"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* スマホでの保存方法案内 */}
            <div className="p-4 bg-blue-50 border-t">
              <div className="text-sm text-blue-800 mb-3">
                <strong>📱 スマホでの保存方法：</strong>
              </div>
              <div className="text-xs text-blue-700 space-y-1">
                <div>1. 画像を長押しして「画像を保存」を選択</div>
                <div>2. または「共有」→「写真」で保存</div>
                <div>3. iPhone: 長押し→「写真に保存」</div>
                <div>4. Android: 長押し→「画像をダウンロード」</div>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex gap-3 p-4 border-t">
              <button
                onClick={downloadImage}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Save size={16} />
                ダウンロード
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

import { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

interface IkirisuSpeechBubbleProps {
  title: string
  children: ReactNode
  showIcon?: boolean
}

/**
 * イキリスキャラクターの吹き出しコンポーネント
 * 診断結果のコメントを表示する際に使用
 */
export function IkirisuSpeechBubble({ title, children, showIcon = true }: IkirisuSpeechBubbleProps) {
  return (
    <div className="relative mt-8">
      <div className="flex items-start gap-4">
        {/* イキリスのキャラクター */}
        <div className="flex-shrink-0">
          <div 
            className="relative w-24 h-24 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform" 
            style={{
              background: '#00CC44',
              border: '4px solid #000000',
              boxShadow: '5px 5px 0 #000000'
            }}
          >
            <span className="text-4xl">🐿️</span>
            <span className="absolute -right-1 bottom-2 text-2xl transform rotate-12">🍺</span>
          </div>
          <div 
            className="text-center mt-2 px-2 py-1 bg-black rounded-lg border-2 border-black" 
            style={{boxShadow: '2px 2px 0 #FF0000'}}
          >
            <p className="text-xs font-black text-white" style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}>
              イキリス
            </p>
          </div>
        </div>
        
        {/* 吹き出し */}
        <div className="flex-1 relative">
          <div 
            className="rounded-2xl p-6 relative" 
            style={{
              background: '#FFFFFF',
              border: '5px solid #000000',
              boxShadow: '6px 6px 0 #000000'
            }}
          >
            {/* 吹き出しの三角形 */}
            <div className="absolute left-0 top-8 transform -translate-x-4">
              <div 
                className="w-0 h-0" 
                style={{
                  borderTop: '15px solid transparent',
                  borderRight: '15px solid #FFFFFF',
                  borderBottom: '15px solid transparent'
                }}
              ></div>
              <div 
                className="w-0 h-0 absolute top-0 left-0 transform -translate-x-1" 
                style={{
                  borderTop: '16px solid transparent',
                  borderRight: '16px solid #000000',
                  borderBottom: '16px solid transparent'
                }}
              ></div>
            </div>
            
            {/* タイトル */}
            <div className="flex items-start gap-2 mb-3">
              {showIcon && (
                <Sparkles 
                  className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" 
                  style={{filter: 'drop-shadow(2px 2px 0 #000000)'}} 
                />
              )}
              <h3 
                className="text-2xl font-black text-black" 
                style={{fontFamily: 'M PLUS Rounded 1c, sans-serif'}}
              >
                {title}
              </h3>
            </div>
            
            {/* コンテンツ */}
            <div 
              className="text-black leading-relaxed text-base font-bold pl-7" 
              style={{fontFamily: 'Noto Sans JP, sans-serif'}}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



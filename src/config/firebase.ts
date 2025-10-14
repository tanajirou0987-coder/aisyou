import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyCimAdGKQlxpdWW6mT9XDgw0MHcP90O7jg",
  authDomain: "matching-81f2e.firebaseapp.com",
  databaseURL: "https://matching-81f2e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "matching-81f2e",
  storageBucket: "matching-81f2e.firebasestorage.app",
  messagingSenderId: "462048372833",
  appId: "1:462048372833:web:b861555f510af0ec866220"
}

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig)

// Realtime Databaseのインスタンスを取得
export const database = getDatabase(app)



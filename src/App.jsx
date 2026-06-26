import { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,
  faPenToSquare,
  faDownload,
  faUpload,
  faMagnifyingGlass, 
  faPlus,
  faGear,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';


// 初期データ
const initialData = [
  { "id": 1, title: 'ネオ・クラシック・シンフォニー', category: 'CD', company: 'アストラル・レコーズ', memo: '架空のアーティストによる3rdアルバム', "updatedAt": "04/07 00:00" },
  { "id": 2, title: 'サイバー・パンク・シティの夜明け', category: 'CD', company: 'ネオ・東京・ミュージック', memo: 'サウンドトラック盤（全12曲）', "updatedAt": "04/07 00:00" },
  { "id": 3, title: '劇場版 クロノ・ドライブ [限定版]', category: 'DVD', company: 'スタジオ・ファンタジア', memo: '本編Blu-ray 特典ブックレット同梱', "updatedAt": "04/08 12:30" },
  { "id": 4, title: 'ファンタジー・オブ・エターナル', category: 'ゲーム', company: 'フェニックス・ゲームス', memo: 'オープンワールドRPG 最新作', "updatedAt": "04/09 15:45" },
  { "id": 5, title: 'ゼロから学ぶ次世代データ構造', category: '書籍', company: 'フロンティア出版', memo: 'エンジニア向け 技術解説書', "updatedAt": "04/10 09:15" },
  { "id": 6, title: 'スペース・オデッセイ 2099', category: 'DVD', company: 'ギャラクシー・シネマ', memo: 'SF映画金字塔のデジタルリマスター版', "updatedAt": "04/11 21:00" },
  { "id": 7, title: 'スピード・レーサー・アルティメット', category: 'ゲーム', company: 'マッハ・エンターテインメント', memo: 'レースゲーム パッケージ版', "updatedAt": "04/12 18:20" },
  { "id": 8, title: 'スマートなコードを書くための10の法則', category: '書籍', company: 'テック・プレス', memo: 'リファクタリングの実践ガイド', "updatedAt": "04/13 11:00" },
  { "id": 9, title: 'アコースティック・ナイト・ライブ 2025', category: 'DVD', company: 'サウンド・ウェーブ', memo: '音楽ライブ映像（初回生産限定）', "updatedAt": "04/14 14:05" },
  { "id": 10, title: 'シャドウ・ダンジョン・クエスト', category: 'ゲーム', company: 'ドット・クリエイト', memo: 'ハクスラ系アクションゲーム', "updatedAt": "04/15 16:50" },
  { "id": 11, title: '実践モダンWebアプリケーション開発', category: '書籍', company: 'サイバー・システム社', memo: 'フロントエンド設計のバイブル', "updatedAt": "04/16 10:30" },
  { "id": 12, title: 'エメラルド・エコーズ', category: 'CD', company: 'グリーン・リーフ・オーディオ', memo: 'ヒーリング・ミュージック集', "updatedAt": "04/17 13:15" },
  { "id": 13, title: 'タクティクス・コマンダー', category: 'ゲーム', company: 'ストラテジー・ラボ', memo: 'シミュレーションゲーム', "updatedAt": "04/18 22:40" },
  { "id": 14, title: '迷宮都市のアリア', category: 'DVD', company: 'ノヴァ・アニメーション', memo: 'TVアニメシリーズ全話収録BOX', "updatedAt": "04/19 19:10" },
  { "id": 15, title: 'パズル＆マジック', category: 'ゲーム', company: 'ピクセル・ワークス', memo: '対戦型パズルゲーム', "updatedAt": "04/20 08:55" },
  { "id": 16, title: '基礎からわかるアルゴリズムの教科書', category: '書籍', company: '未来科学社', memo: '図解で学ぶ入門書', "updatedAt": "04/21 17:00" },
  { "id": 17, title: 'ブルー・ホライズン', category: 'CD', company: 'オーシャン・レコード', memo: 'ポップス系コンピレーション', "updatedAt": "04/22 12:25" },
  { "id": 18, title: 'セキュアなネットワークの構築と運用', category: '書籍', company: 'デジタル・ガード出版', memo: 'インフラエンジニア向け実務書', "updatedAt": "04/23 14:40" },
  { "id": 19, title: 'クラフト＆サバイバル・アイランド', category: 'ゲーム', company: 'アーク・エンターテインメント', memo: 'サバイバル系クラフトゲーム', "updatedAt": "04/24 23:15" },
  { "id": 20, title: 'スターライト・セレナーデ', category: 'CD', company: 'コスモ・ミュージック', memo: 'ジャズ・アルバム', "updatedAt": "04/25 11:50" },
  { "id": 21, title: 'タイム・トラベラー：Re', category: 'CD', company: 'クロノス・レコーズ', memo: 'コンセプト・ミニアルバム', "updatedAt": "04/26 15:30" },
  { "id": 22, title: '未来を創るAIの基礎知識', category: '書籍', company: 'ネクスト・ジェン出版', memo: '非エンジニア向けの概説書', "updatedAt": "04/27 16:20" }
];

function App() {
  // --- State（状態）の定義 ---
  
  // コレクション本体（初期値はLocalStorageから読み込み）
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('my-collection-data');
    return saved ? JSON.parse(saved) : initialData;
  });

  // 入力フォームの状態
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    company: '',
    memo: ''
  });

  // 絞り込み・検索の状態
  const [filter, setFilter] = useState('すべて');
  const [searchWord, setSearchWord] = useState('');

  // 表示・非表示の切り替えフラグ
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // インポート・エクスポート用
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // 編集用
  const [editingTarget, setEditingTarget] = useState(null);

  const [displayLimit, setDisplayLimit] = useState(20);

  const [sortType, setSortType] = useState('newest');

  // --- useEffect（データの保存） ---
  
  useEffect(() => {
    localStorage.setItem('my-collection-data', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    setDisplayLimit(20);
  }, [filter, searchWord]);

  // --- ハンドラー関数（操作） ---

  const CATEGORIES = ['CD', 'DVD', 'ゲーム', '書籍'];

  // 入力内容を反映
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveItem = (e) => {
    e.preventDefault();

    // 現在の日時を取得
    const now = new Date().toLocaleString('ja-JP', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    // 編集なら元のIDを維持、新規なら今の時間（ミリ秒）をIDにする
    const id = editingTarget ? editingTarget.id : Date.now();
    
    // 保存するデータを作成
    const updatedData = {
      ...formData,
      id: id, 
      updatedAt: now
    }; 

    if (editingTarget) {
      // 確実に「一致するものだけ置換、それ以外はそのまま」の配列を作る
      setItems(prev => prev.map(it => String(it.id) === String(id) ? updatedData : it));
      setEditingTarget(null);
    } else {
      setItems(prev => [...prev, updatedData]);
    }

    resetForm(); 
    setIsFormOpen(false);

  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const startEdit = (item) => {
    setIsFormOpen(true);
    setFormData(item);
    setEditingTarget(item);
    scrollToTop();
  };

  // 削除機能
  const deleteItem = (item) => {
    if (window.confirm('本当に削除しますか？')) {
      const newItems = items.filter((it) => it.id !== item.id);
      setItems(newItems);
    }
  };

  // リセット機能
  const resetForm = () => {
    setFormData({
      title: '',
      category: 'CD',
      company: '',
      memo: ''
    });
    setEditingTarget(null);
  };

  // --- 絞り込みロジック（計算） ---
  // データをテキストとして書き出し
  const exportData = () => {
    const dataString = JSON.stringify(items);
    // クリップボードにコピー
    navigator.clipboard.writeText(dataString)
      .then(() => alert('全データをコピーしました！メールやLINEに貼り付けてスマホに送ってください。'))
      .catch(() => alert('コピーに失敗しました。'));
  };

  // テキストからデータを読み込み
  const importData = () => {
    const input = window.prompt('コピーしたデータ（長い文字列）をここに貼り付けてください');
    if (input) {
      try {
        const parsedData = JSON.parse(input);
        if (Array.isArray(parsedData)) {
          if (window.confirm('現在のデータが上書きされますがよろしいですか？')) {
            setItems(parsedData);
            alert('読み込みが完了しました！');
          }
        }
      } catch (e) {
        alert('データの形式が正しくありません。');
      }
    }
  };

  // 【エクスポート】JSONファイルとしてダウンロード
  const exportJSON = () => {
    // 保存時のタイムスタンプをファイル名に入れるための準備
    const now = new Date();
    const dateStr = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
    
    const data = JSON.stringify(items, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `my-collect_${dateStr}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 【インポート】ファイルを選択して読み込む
  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        
        // 念のため確認
        if (window.confirm(`${json.length}件のデータを読み込みます。現在のデータは上書きされますがよろしいですか？`)) {
          setItems(json);
          alert('インポートが完了しました！');
        }
      } catch (err) {
        alert('ファイルの読み込みに失敗しました。正しいJSONファイルか確認してください。');
      }
    };
    reader.readAsText(file);
    
    // 同じファイルを連続で選択しても反応するようにリセット
    e.target.value = ''; 
  };

  const getSearchUrl = (item) => {
    const baseGoogleUrl = "https://www.google.com/search?tbm=isch&q=";
    
    // カテゴリごとに検索ワードを最適化
    let query = "";
    switch (item.category) {
      case 'CD':
      case 'DVD':
        query = `${item.company} ${item.title} ジャケット`;
        break;
      case '書籍':
        query = `${item.company} ${item.title} 本 表紙`;
        break;
      case 'ゲーム':
        query = `${item.company} ${item.title} ゲーム`;
        break;
      default:
        query = `${item.company} ${item.title} 画像`;
    }
    
    return baseGoogleUrl + encodeURIComponent(query);
  };

  const lastUpdate = items.length > 0 
  ? items.reduce((a, b) => a.updatedAt > b.updatedAt ? a : b).updatedAt 
  : 'データなし';

  const sortedItems = [...items].sort((a, b) => {
    if (sortType === 'newest') return Number(b.id) - Number(a.id);
    if (sortType === 'oldest') return Number(a.id) - Number(b.id);
    return 0;
  });
  
  const filteredItems = sortedItems.filter((item) => {
    const matchesCategory = filter === 'すべて' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchWord.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // --- 見た目（JSX） ---

  return (
    <div className="App">
      <h1>Collection Manager</h1>
      <div className="wrap">

        {/* 設定エリア */}
        {isSettingsOpen && (
          <div className="setArea">
            <p className="headTxt">データのバックアップ・移行</p>
            <div className="inner">
              <button className="exportBtn" onClick={exportData}>📤 書き出し</button>
              <button className="importBtn" onClick={importData}>📥 読み込み</button>
            </div>
            <p><span>LastU pdata: {lastUpdate}</span></p>
            <button onClick={exportJSON} className="exportBtn">
              <FontAwesomeIcon icon={faDownload} /> JSONとして保存
            </button>
            <label className="importBtn">
              <FontAwesomeIcon icon={faUpload} /> JSONを読み込む
              <input 
                type="file" 
                accept=".json" 
                onChange={importJSON} 
                style={{ display: 'none' }} 
              />
            </label>
          </div>
        )}

        {/* 追加フォームエリア */}
        {isFormOpen && (
          <form onSubmit={saveItem} className="addForm">
            <div className="inner">
              <input name="title" className="titleTxt" value={formData.title} onChange={handleChange} placeholder="タイトル" />
              <select
                // 読み取り先を formData に固定
                value={formData.category} 
                // 書き込み先も formData の中身だけを狙い撃ち
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="catTxt"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input name="company" className="comTxt" value={formData.company} onChange={handleChange} placeholder="アーティスト名/メーカー/出版社" />
              <textarea name="memo" className="memoTxt" value={formData.memo} onChange={handleChange} placeholder="備考・メモ" />
              
              <div className="btnArea">
                <button type="submit" className="subBtn">
                  {editingTarget !== null ? '変更を保存' : 'コレクションに追加'}
                </button>
                <button type="button" className="resetBtn" onClick={() => resetForm()} style={{ flex: 1, backgroundColor: '#aaa' }}>リセット</button>
              </div>
            </div>
          </form>
        )}

        {/* カテゴリフィルターボタン */}
        <div className="catBtnArea">
          {['すべて', 'ゲーム', '書籍', 'CD', 'DVD'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)} 
              className="catBtn"
              style={{ 
                backgroundColor: filter === cat ? '#646cff' : '#eee',
                color: filter === cat ? 'white' : 'black'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <hr />

        {/* リスト表示エリア */}
        <div className="collectionList">
          <div className="sort-container">
            <p>件数: {filteredItems.length} 件</p>
            <button 
              className="sort-toggle-btn" 
              onClick={() => setSortType(prev => prev === 'newest' ? 'oldest' : 'newest')}
              title={sortType === 'newest' ? '新しい順' : '古い順'}
            >
              <span>{sortType === 'newest' ? ' 新しい順' : ' 古い順'}</span>
              <FontAwesomeIcon 
                icon={sortType === 'newest' ? faSortDown : faSortUp} 
              />
            </button>
          </div>
          {filteredItems.slice(0, displayLimit).map((item) => {
            return (
              <div key={item.id} className="collectItem">
              <div className="itemCard">
                <div className="itemData">
                  <h3>{item.title}</h3>
                  <p>カテゴリ: {item.category}</p>
                  <p>アーティスト・出版社・メーカー: {item.company}</p>
                  {item.memo && (
                    <p className="item-memo">
                      <strong>memo:</strong> {item.memo}
                    </p>
                  )}
                </div>
                
                <div className="itemAct">
                  <a 
                    href={getSearchUrl(item)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="searchLinkBtn"
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} /> <span>検索</span>
                  </a>
                  <button 
                    onClick={() => startEdit(item)} 
                    className="editBtn"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} /> <span>編集</span>
                  </button>
                  <button 
                    onClick={() => deleteItem(item)} 
                    className="deleteBtn"
                  >
                    <FontAwesomeIcon icon={faTrash} /> <span>削除</span>
                  </button>
                </div>
              </div>
            </div>
            );
          })}

          {filteredItems.length > displayLimit && (
            <div className="loadMoreContainer">
              <button 
                className="loadMoreBtn" 
                onClick={() => setDisplayLimit(prev => prev + 20)}
              >
                もっと見る（残り {filteredItems.length - displayLimit} 件）
              </button>
            </div>
          )}
        </div>

        <div className="footerNav">

          {/* 検索エリア */}
          {isSearchOpen && (
            <div className="searchArea">
              <input 
                className="searchTxt"
                type="text" 
                placeholder="検索ワードを入力..." 
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
              />
            </div>
          )}
          {/* メインの操作ボタン */}
          <div className="mainBtn">
            <button 
            className={`searchBtn ${isSearchOpen ? 'active' : ''}`} 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} /> <span>検索</span>
            </button>
            <button 
            className={`addBtn ${isFormOpen ? 'active' : ''}`} 
            onClick={() => setIsFormOpen(!isFormOpen)}
            >
              <FontAwesomeIcon icon={faPlus} /> <span>追加</span>
            </button>
            <button 
              // 判定を isSettingsOpen に変える
              className={`setBtn ${isSettingsOpen ? 'active' : ''}`} 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <FontAwesomeIcon icon={faGear} /> <span>設定</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
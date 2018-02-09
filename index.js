import { h, app } from "hyperapp"
import ripple from "./ripple"
import swipe from "./swipe"

const state = {
  paper: 0, 
  step: 0
}

const actions = {
  next: () => state => ({step: state.step + 1}), 
  prev: () => state => ({step: state.step - 1}), 
  menu: () => state => ({step: 10}), 
  open: (p) => state => ({paper: p, step: 0}), 
  close: () => state => ({paper: 0, step:10})
}

function setTimeoutAsync(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, delay);
    });
}

const Slider = ({paper, state, actions}, children) => {
  const oncreate = e => {
    ripple(e);
  };

  const adjust = (track, dx) => {
    track.style.transform = `translate3d(calc(${-100*((paper == state.paper) ? state.step : 0)}vw + (${dx}px)), 0, 0)`;
  }
  const slidePrev = () => ((state.step != 0) ? actions.prev() : 0);
  const slideNext = () => ((state.step != children.length - 1) ? actions.next() : 0);
  const listeners = swipe(slidePrev, slideNext, adjust);
  return <div className="USlider" oncreate={oncreate}>
      <div className={`USliderArrow URipple _left ${(state.step == 0) ? '_disabled' : ''}`} onclick={actions.prev}><i className="material-icons">keyboard_arrow_left</i></div>
      <div className="list">
        <div className="track" style={{transform: `translate3d(${-100*((paper == state.paper) ? state.step : 0)}vw, 0, 0)`}} {...listeners}>
          {children.map(c => (
            <div className="slide">{c}</div>
          ))}
        </div>
      </div>
      <div className={`USliderArrow URipple _right ${(state.step == children.length  - 1) ? '_disabled' : ''}`} onclick={actions.next}><i className="material-icons">keyboard_arrow_right</i></div>
    </div>
}

const Block = ({no, step}, children) => (
  <div className={`Block _${no} _s${step}`}><p className="text">{children}</p></div>
);

const Preface = ({step, actions}) => (
  <div key="preface" 
      onremove={(e, done) => setTimeoutAsync(400).then(done)}
      oncreate={(e) => ripple(e)}>
    <p className="Copy">Keep it FUN!</p>
    <Block no={1} step={step}>
      <span className="title">20年の業界経験</span>
      1998年から一貫してプログラミングをライフワークとしてきた、業界経験20年のベテランプログラマーです。
    </Block>
    <Block no={3} step={step}>
      <span className="title">フルスタック</span>
      プログラミングやサーバー管理はもちろん、外注管理、執筆、企画まで。ウェブシステムをワンストップで提供できます。
    </Block>
    <Block no={2} step={step}>
      <span class="title">重要職務の経験</span>
      年間決済高ウン十億円・100万ユーザーのシステムの責任者を5年経験。大規模システムの運用・管理の知識があります。
    </Block>
    <Block no={4} step={step}>
    </Block>
    <div className="Console UShadow2">
      <a className={`button _left ${step == 0 ? '_disabled' : ''} URipple`} id="prevButton" onclick={actions.prev}><i className="material-icons">keyboard_arrow_left</i></a><a className={`button _center URipple ${step == 3 ? '_primary' : ''}`} id="menuButton" onclick={actions.menu}><i className="material-icons">menu</i></a><a className={`button _right URipple ${step == 3 ? '_disabled' : (step == 0 ? '_primary': '')}`} id="nextButton" onclick={actions.next}><i className="material-icons">keyboard_arrow_right</i></a>
    </div>
  </div>
)

const Paper = ({p, title, state, actions}, children) => {
  const oncreate = (e) => {
    ripple(e);
    e.classList.add('_oncreate');
    setTimeout(function () {
      e.classList.remove('_oncreate');
      setTimeout(function () {
        e.style.transitionDelay = "0s";
      }, 500);
    }, 300);
  };
  return <div key={`p${p}`} className={`Paper _${p} UShadow1 ${(p == state.paper) ? '_expanded' : ''}`} onclick={(e) => (p != state.paper) ? actions.open(p) : 0 } oncreate={oncreate}>
    <div className="titleBar UShadow1">
      <h2 className="title">{title}</h2>
      <div className="close URipple" onclick={e => (p == state.paper) ? actions.close() : 0 }><i className="material-icons">close</i></div>
    </div>
    <div className="content">{children}</div>
  </div>
}

const paper1 = ({state, actions}) => (
  <Paper p={1} title="主な開発実績" state={state} actions={actions}>
    <Slider paper={1} state={state} actions={actions}>
    <div>
    <div className="Layout">
    <div className="head _1_1_primix"><h3 className="title">オンラインプリクラサービス（1999年）</h3></div>
    <div className="body">
    <p>カメラ付き携帯電話で撮った写真をウェブ上で編集し、コンビニの複合機でシール印刷。当時出始めの写メやiモードを活用した野心的なウェブアプリケーションです。<br />
    技術的には、3大キャリアがそれぞれ独自のウェブページの形式にのみ対応しているのを、XSLT変換でワンソースで対応できるようにした点が特徴です。<br />
    諸般の事情でお蔵入りになりました。</p>
    <dl className="Dl">
    <dt className="title">環境</dt>
    <dd className="desc">Linux、resin、java、InterBase</dd>
    <dt className="title">担当</dt>
    <dd className="desc">企画、システム設計、コーディング、サーバー構築</dd>
    <dt className="title">開発期間</dt>
    <dd className="desc">1カ月程度</dd>
    <dt className="title">キーワード</dt>
    <dd className="desc">javaサーブレット、XML、XSLT、ImageMagick</dd>
    </dl>
    </div>
    </div>
    </div> 
    <div>
    <div className="Layout">
    <div className="head _1_2_freedl"><h3 className="title">アフィリエイトシステム（2008年）</h3></div>
    <div className="body">
    <p>アフィリエイトでデジタルコンテンツに集客するシステムです。<br />
    クライアントが運営中のアフィリエイトサービスの1機能として開発しましたが、「1週間で作ってくれ」と頼まれて、その9日後にサービスインさせたことで、クライアントの大きな信頼を得ることになりました。</p>
    <dl className="Dl">
    <dt className="title">環境</dt>
    <dd className="desc">Linux、apache、php、mysql</dd>
    <dt className="title">担当</dt>
    <dd className="desc">要件定義、システム設計、コーディング、リリース</dd>
    <dt className="title">開発期間</dt>
    <dd className="desc">9日</dd>
    <dt className="title">キーワード</dt>
    <dd className="desc">サイト内通貨決済、クレジットカード決済</dd>
    </dl>
    </div>
    </div>
    </div>
    <div>
    <div className="Layout _reverse">
    <div className="head _1_3_beacon"><h3 className="title">オンラインTCG（2010年）</h3></div>
    <div className="body">
    <p>独立起業して自分で作ったオンラインTCG（トレーディングカードゲーム）です。<br />
    柔軟性の高いゲームエンジンを作る必要がありましたが、言語処理系の知識を活かしてVM（仮想マシン）のような構成にすることで解決しました。<br />
    また、多人数によるリアルタイムチャットを実現するためにサーバ側のプログラミング言語にErlangを選択し、実際に1000人の同時チャットを実現しました。</p>
    <dl className="Dl">
    <dt className="title">環境</dt>
    <dd className="desc">Linux, yaws, Erlang, postgresql, flex (ActionScript/Flash)</dd>
    <dt className="title">担当</dt>
    <dd className="desc">企画、システム設計、コーディング、外注管理、運営、保守</dd>
    <dt className="title">開発期間</dt>
    <dd className="desc">1年半</dd>
    <dt className="title">キーワード</dt>
    <dd className="desc">ゲームの企画、ゲームエンジン、C10K</dd>
    </dl>
    </div>
    </div>
    </div>
    <div>
    <div className="Layout _reverse">
    <div className="head _1_5_move"><h3 className="title">ECサイトを含むサーバー移転（2012年）</h3></div>
    <div className="body">
    <p>自社のサーバー30台余りを社内のデータセンターからiDCのベアメタルクラウド（XenServer）に移転しました。<br />
    移転に伴うサービス停止時間を極力短くするため、mysqlレプリケーションを活用した長い手順によりほぼ無停止でシステムの移転を実現しました。<br />
    移転先の選定やスタッフの人選から実際の移転作業に至るまで、幅広い職務をこなしました。</p>
    <dl className="Dl">
    <dt className="title">環境</dt>
    <dd className="desc">Linux, apache, php, mysql</dd>
    <dt className="title">担当</dt>
    <dd className="desc">プロジェクト責任者、サーバーの調達、外注管理、担当</dd>
    <dt className="title">開発期間</dt>
    <dd className="desc">4カ月</dd>
    <dt className="title">キーワード</dt>
    <dd className="desc">人選、XenServer、mysqlレプリケーション</dd>
    </dl>
    </div>
    </div>
    </div>
    <div>
    <div className="Layout">
    <div className="head _1_4_renewal"><h3 className="title">ECサイトのリニューアル（2016年）</h3></div>
    <div className="body">
    <p>マルチテナント型ECサイトのリニューアルです。<br />
    4年に渡る長大なプロジェクトでしたが、システム責任者・プロジェクト責任者として、複数の自社コンテンツ（ウェブページ、SNS記事、紙のDM）の制作、ウェブデザインの改修、新機能の開発など多岐に渡るサブプロジェクトを統括しました。<br />
    リニューアル後の各種施策の甲斐もあり、売上が50%ほど伸びました。</p>
    <dl className="Dl">
    <dt className="title">環境</dt>
    <dd className="desc">Linux, apache, php, mysql</dd>
    <dt className="title">担当</dt>
    <dd className="desc">プロジェクト責任者、外注管理、設計、コーディング、リリース</dd>
    <dt className="title">開発期間</dt>
    <dd className="desc">4年</dd>
    <dt className="title">キーワード</dt>
    <dd className="desc">オウンドメディア、ダイレクトメール、フラットデザイン、外注管理</dd>
    </dl>
    </div>
    </div>
    </div>
    </Slider>
  </Paper>
)

const paper2 = ({state, actions}) => (
  <Paper p={2} title="略歴" state={state} actions={actions}>
    <div className="Grid">
    <div className="image">
    <img src="image/2_1_to30.jpg" className="Photo" />
    </div>
    <div className="text">
    <p>1976年生まれ、千葉育ち。東京理科大学理学部1部数学科卒。<br />
    大学生のときになんとなく始めたプログラミングは正に「運命の出会い」でした。「自分はこれをやって生きていくんだ」と感じました。<br />
    大学卒業後はフリーターをしながらフリーウェアを作っていましたが、友達の紹介でプログラマーとして会社に就職することに。</p>
    
    <p>いくつかウェブアプリケーションを世に送り出したものの、自分の状況に満足できず、2年足らずで退職しました。<br />
    「もっと技術力を高めなければ」という危機感と「プログラミングでオンリーワンな存在になりたい」という欲望がありました。</p>

    <p>退職した私はプログラミングを基礎から学び始めます。<br />
    基本データ構造やアルゴリズムから始まり、オブジェクト指向、計算機科学、関数型プログラミング…<br />
    そんな中、最も興味をひかれたのは言語処理系でした。「自分のプログラミング言語を作って世に広めたい」そんな夢を持つようになりました。</p>

    <p>ただ、現実は非常でした。私には、人の役に立つようなプログラミング言語を作り出せる発想や知恵はありませんでした。<br />
    「巷で活躍しているプログラマーや研究者とくらべて、自分の頭は劣っている…」それを痛感したとき、ふと気がつくと、そこにいたのは社会経験の少ない30歳の無職でした。</p>
    </div>
    </div>
    <div className="Grid _reverse">
    <div className="image">
    <img src="image/2_2_to35.jpg" className="Photo" />
    </div>
    <div className="text">
    <p>30歳にしてようやく身の程を知った私は、千葉県内の地方零細ITベンダーに就職しました。<br />
    社会経験の少なさはハンデでしたが、逆に技術力は他のスタッフあるいは他社のエンジニアより秀でていたと思います。<br />
    仕事をこなしていくうちに、クライアントから名指しで仕事も入るようにもなりました。</p>

    <p>しかし、入社から3年経ち、私に新しい欲望が芽生え始めます。<br />
    他人のためでなく自分のために、主体性を最大化できる環境でシステムを開発し保守したいと思うようになったのです。<br />
    それから半年後、私は会社を辞めることになります。</p>

    <p>私は会社を辞めて独立し、オンラインゲームを作り始めました。<br />
    1年かけて企画・開発し、私の持てるアイディアと技術を詰め込んだそのゲームは、やはり失敗しました。<br />
    ゲームを楽しんでくれる人がいて、ほめてくれる人もいましたが、狙ったところがニッチ過ぎました。<br />
    そして、人をたくさん集めるための資金を集めることもできませんでした。これは、オンラインゲームの世界では致命的なことです。<br />
    私は世間知らずでした。</p>

    <p>資金が尽きて、次の身の振り方を考えているちょうどその時に、以前のクライアントから「うちに来ないか」と誘われました。<br />
    それが、いま私が勤めている会社です。</p>
    </div>
    </div>
    <div className="Grid">
    <div className="image">
    <img src="image/2_3_tonow.jpg" className="Photo" />
    </div>
    <div className="text">
    <p>今の会社はマルチテナント型のECサイトを運営している小さな会社です。小さいながらも年間決済高はウン十億円にも上ります。<br />
    入社2年目からはシステム部門の責任者になり、担当する仕事も手を動かす仕事から人を動かす仕事へ比重が移りました。<br />
    入社から6年余り経ち、その間に、全社的なサーバー移転や4年がかりのサービスのリニューアルなど、様々なプロジェクトを完遂してきました。<br />
    プライベートでは結婚して子供も授かりました。</p>

    <p>2018年1月現在、私は40歳です。<br />
    昔のように、徹夜で仕事をしたり休日返上でプログラムを書いたりはできません。<br />
    マネージメントの仕事が増え、最新の技術に触れる機会も減りました。<br />
    それでも、今でもプログラミングへの意欲・喜びはまったく衰えていません。<br />
    今でも、意欲を持って、楽しんでプログラマー／エンジニアとして活動しています。</p>
    </div>
    </div>
  </Paper>
)

const paper3 = ({state, actions}) => (
  <Paper p={3} title="スキル・興味" state={state} actions={actions}>
    <Slider paper={3} state={state} actions={actions}>
      <div>
      <div class="Layout">
      <div class="head _3_1_knowledge"><h3 class="title">知識</h3></div>
      <div class="body">
      <p>数学専攻で大学を卒業していて、ロジカルな思考が身についています。<br />
      アルゴリズムとデータ構造を学習していて、C言語など低レベルなプログラミングの際に実装することができます。もちろん、使うデータ構造を選ぶ際にも間違うことがありません。<br />
      特に言語処理系（コンパイラやVMなど）に興味を持っていた時期があり、複雑かつ柔軟性の求められる問題の解決に応用できます。<br />
      関数型プログラミングが昔から好きで、テスタブルなプログラムを書くことができます。</p>
      </div>
      </div>
      </div>
      <div>
      <div class="Layout">
      <div class="head _3_2_position"><h3 class="title">ポジション</h3></div>
      <div class="body">
      <p>基本的にはウェブ系のアプリケーションエンジニア（プログラマー）で、フロントエンド・バックエンドのプログラミングが本職です。<br />
      これに付帯して、データベースの取り扱いやサーバー構築も行えます。<br />
      当然、要件定義や設計、資料作成などもできます。</p>
      <p>最近ではマネージメント系の仕事をやることが多く、プログラマーやウェブデザイナーの人選や交渉、外注管理の経験も豊富です。<br />
      また、プロのレベルではありませんが、企画や執筆もある程度のクオリティで仕事ができます。</p>
      </div>
      </div>
      </div>
      <div>
      <div class="Layout _reverse">
      <div class="head _3_3_skill"><h3 class="title">スキル</h3></div>
      <div class="body">
      <p>サーバーは専らLinuxです。<br />
      プログラミング言語はいろいろ使いますが、phpの経験が豊富です。ただ、最近は時勢に合わせてjavascript (NodeJS)を使う機会が増えています。<br />
      phpフレームワークは、radarphp、Laravel、FuelPHPをたしなみます。自分で選ぶならradarphpです。<br />
      クライアント側については、基本スキルのHTML、CSS、javascript (jquery)は問題ありません。PWA/SPAに興味があって、hyperappをやっています。<br />
      その他、AWS、ansibleの経験があります。</p>
      </div>
      </div>
      </div>
      <div>
      <div class="Layout">
      <div class="head _3_4_outlook"><h3 class="title">興味</h3></div>
      <div class="body">
      <p>アプリケーションソフトの設計手法としてDDD（ドメイン駆動開発）に大きな関心を寄せています。</p>
      <p>最近はサーバーの保守が不要または低減される技術に興味があって、コンテナ、twelve factor app、ステートレスアーキテクチャ、FaaSといったキーワードには敏感に反応するようになりました。<br />
      今後はサーバー保守という仕事は無くなっていくべきだと考えています。</p>
      </div>
      </div>
      </div>
    </Slider>
  </Paper>
);

const paper4 = ({state, actions}) => (
  <Paper p={4} title="プロフィール" state={state} actions={actions}>
    <div class="Grid">
    <div class="image">
    <img src="image/4_1_msg.jpg" class="Photo" />
    </div>
    <div class="text">
    <p>あらゆるものがソフトウェアと化していく現代においてアプリケーションプログラマーは、単にシステムを製造するということではなく、新しい価値を世に問いかけていくことができます。<br />
    そんな時代にそんな職種でいたことはとても幸運なことで、だからこそ「そうありたい」という希望を持っています。</p>
    <p>意欲を持って主体的に、プログラミングに携わっていきたいです。</p>
    </div>
    </div>
    <div class="Grid _reverse">
    <div class="image">
    <img src="image/4_2_stats.jpg" class="Photo" />
    </div>
    <div class="text">
    <img src="image/icon_L.jpg" class="Icon" />
    <dl class="Profile">
    <dt class="title">名前</dt>
    <dd class="desc">山田 哲央<br /><span class="Note">やまだ てつお</span></dd>
    <dt class="title">年齢</dt>
    <dd class="desc">41歳（2018年1月現在）</dd>
    <dt class="title">住まい</dt>
    <dd class="desc">千葉県千葉市</dd>
    <dt class="title">職業</dt>
    <dd class="desc">システムエンジニア／プログラマー<br /><span class="Note">モールシステムの運営会社に正社員として就業中。</span></dd>
    <dt class="title">活動</dt>
    <dd class="desc"><a href="https://github.com/tyam" target="_blank">GitHub</a></dd>
    <dd class="desc"><a href="http://qiita.com/tyam001" target="_blank">Qiita</a></dd>
    <dd class="desc"><a href="http://b.hatena.ne.jp/tyam001/" target="_blank">はてなブックマーク</a></dd>
    <dd class="desc"><a href="https://twitter.com/tyam001" target="_blank">twitter</a><br /><span class="Note">SNSはあまりやりません。</span></dd>
    <dd class="desc"><a href="https://www.facebook.com/tetsuo.yamada.146" target="_blank">Facebook</a><br /><span class="Note">SNSはあまりやりません。</span></dd>
    <dt class="title">影響を受けた本</dt>
    <dd class="desc"><a href="http://amzn.asia/gRYeQMt" target="_blank">『7つの習慣』スティーブン・R. コヴィー著</a></dd>
    <dd class="desc"><a href="http://amzn.asia/cNfhpt7" target="_blank">『計算機プログラムの構造と解釈』ハロルド エイブルソン著</a></dd>
    <dd class="desc"><a href="http://amzn.asia/6SPZgLv" target="_blank">『はじめてのGTD ストレスフリーの整理術』デビッド・アレン著</a></dd>
    <dt class="title">家族</dt>
    <dd class="desc">既婚。子どもがいます。</dd>
    <dt class="title">趣味</dt>
    <dd class="desc">自然散策<br /><span class="Note">尾瀬など景観の良いところに行くのが好きです。</span></dd>
    <dd class="desc">サッカー<br /><span class="Note">観戦よりプレイする方が好き。最近やってない…</span></dd>
    <dd class="desc">囲碁<br /><span class="Note">一時期はまりましたが最近はしてないです。ネット4級</span></dd>
    </dl>
    </div>
    </div>
  </Paper>
);

const Menu = ({state, actions}) => {
  const appear = (el) => () => {
    el.classList.add('_active');
    setTimeoutAsync(300).then(() => el.getElementsByClassName('content')[0].classList.add('_appear'));
  }
  return <div key="menu" className="MenuBg" oncreate={(el) => setTimeoutAsync(10).then(appear(el))}>
    <div className="content">
      <div className="MyPhoto">
        <img src="image/yamatez.jpg" className="" />
      </div>
      <h1>TETSUO YAMADA<small>プログラマー山田哲央の自己紹介</small></h1>
      {paper1({state: state, actions: actions})}
      {paper2({state: state, actions: actions})}
      {paper3({state: state, actions: actions})}
      {paper4({state: state, actions: actions})}
    </div>
  </div>
}

const Footer = () => (
    <div className="Footer UShadow3" oncreate={(e) => ripple(e)}>
      <div className="Share">
        <a href="https://twitter.com/share?url=https%3A%2F%2Ftyam.github.io%2F&text=%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9E%E3%83%BC%E5%B1%B1%E7%94%B0%E5%93%B2%E5%A4%AE%E3%81%AE%E8%87%AA%E5%B7%B1%E7%B4%B9%E4%BB%8B" className="sharer _twitter URipple" target="_blank"><span className="icon icon-twitter"></span> ツイート</a><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftyam.github.io%2F" className="sharer _facebook URipple" target="_blank"><span className="icon icon-facebook"></span> シェア</a><a href="http://b.hatena.ne.jp/add?url=https%3A%2F%2Ftyam.github.io%2F" target="_blank" className="sharer _hatena URipple"><span className="icon icon-hatena"></span> はてブ</a><a href="http://getpocket.com/edit?url=https%3A%2F%2Ftyam.github.io%2F" className="sharer _pocket URipple" target="_blank"><span className="icon icon-pocket"></span> ポケット</a>
      </div>
    </div>
)

const view = (state, actions) => {
  const preface = (state.paper == 0 && state.step != 10) ? <Preface step={state.step} actions={actions} /> : null;
  const menu = (state.paper != 0 || state.step == 10) ? <Menu state={state} actions={actions} /> : null;
  return <div className="Wrap">
    {preface}
    {menu}
    <Footer />
  </div>
}

const main = app(state, actions, view, document.body);

# phina-patch-es-classes-support

## このリポジトリについて

phina.js でビルトインクラスへの個別の細工なしに class 構文での継承を可能にするためのモンキーパッチです。

代わりに phina.createClass メソッドを書き換えてすべてのクラスを ES Classes 互換にします。

動作の確実な保証はできません。


## インストール

このリポジトリをインストールします。

`npm install negiwine/phina-patch-es-classes-support`

次に phina.js を**読み込む前**にこのパッケージをインポートしてください。

```js
require('phina-patch-es-classes-support')
const phina = require('phina.js')
```


## 使用例

パッケージの読み込み以外に特別な操作は不要です。

ただし phina.define のようにネームスペースへの登録は行わないので、シーンを作る場合や Element#fromJSON に対応させたい場合は個別に phina.register を使って関数呼び出し可能な形式で登録してください。

```js
require('phina-patch-es-classes-support')
const phina = require('phina.js')

phina.globalize()


class Hero extends Sprite {
    constructor(){
        super('hero')
    }
}


class MainScene extends DisplayScene {
    constructor(){
        super()
        const hero = new Hero().addChildTo(this)
    }
}
phina.register('MainScene', (...args) => new MainScene(...args))
```


デコレータを使える場合は次のようなヘルパー関数も有効です。

```js
const define = path => _class =>
    phina.register(path, (...args) => new _class(...args)) && _class
```

```js
@define('MainScene')
class MainScene extends DisplayScene {
    constructor(){
        super()
        // ...
    }
}
```


## 作用

phina.createClass メソッドと superInit 及び superMethod メソッドを置き換えます。

phina.createClass で作られたクラスは通常通り関数呼び出し形式でのインスタンス化が可能です。ただし class 構文で継承したクラスは new 付きで呼び出す必要があり phina.createClass 関数で継承することもできません。

コードの簡単化のために superInit および superMethod メソッド を簡易的なものに置き換えています。パフォーマンスにほとんど影響はないはずですが使用はおすすめできません。 class 構文での定義では代わりに標準の super / super.methodName を使用してください。


# License

WTFPL

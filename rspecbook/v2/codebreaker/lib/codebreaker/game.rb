module Codebreaker
  class Game
    # 初期化処理
    # @param [Object] output 出力クラス
    def initialize(output)
      @output = output
    end

    # ゲーム開始処理
    # @param [String] secret 暗号文字列
    def start(secret)
      @secret = secret
      @output.puts 'Welcome to Codebreaker!'
      @output.puts 'Enter guess:'
    end

    # 回答判定処理
    # @param [String] guess  推測文字列
    def guess(guess)
      marker = Marker.new(@secret, guess)
      @output.puts '+' * marker.exact_match_count +
                   '-' * marker.number_match_count
    end
  end
end

module Codebreaker
  class Marker
    # 初期化処理
    # @param [String] secret 暗号文字列
    # @param [String] guess  推測文字列
    def initialize(secret, guess)
      @secret, @guess = secret, guess
    end

    # 文字列の完全一致数を数える
    # @return [Fixnum] 完全一致数
    def exact_match_count
      (0..3).inject(0) do |count, index|
        count + (_exact_match?(index) ? 1 : 0)
      end
    end

    # 文字列の一致数を数える
    # @return [Fixnum] 一致数
    def number_match_count
      total_match_count - exact_match_count
    end

    ## 全ての一致数を数える
    # @return [Fixnum] 一致総数
    def total_match_count
      count = 0
      secret = @secret.split('')
      @guess.split('').inject(0) do |count, n|
        count + (_delete_first(secret, n) ? 1 : 0)
      end
    end

    private
    # 文字の完全一致を判定
    # @param [Fixnum] index 文字列のインデックス
    # @return [Boolean] 判定結果
    def _exact_match?(index)
      @guess[index] == @secret[index]
    end

    # 文字が完全一致ではないが文字列中に含んでいるかを判定
    # @param [Fixnum] index 文字列のインデックス
    # @return [Boolean] 判定結果
    def _number_match?(index)
      @secret.include?(@guess[index]) && !_exact_match?(index)
    end

    ## 指定された文字を含む場合、文字列からその文字を削除する
    # @param [String] 文字列
    # @param [String] 削除対象となる文字
    # @return [String] 削除後の文字列
    def _delete_first(code, n)
      code.delete_at(code.index(n)) if code.index(n)
    end
  end
end

var wordBreak = function (s, wordDict) {
    const ans = s.replace(/./g, ' ');
    wordDict.sort((a, b) => b.length - a.length);
    return wordDict.reduce((pre, item) => {
        const reg = new RegExp(item, 'g')
        return pre.replace(reg, item.replace(/./g, ' '));
    }, s) === ans || wordDict.reverse().reduce((pre, item) => {
        const reg = new RegExp(item, 'g')
        return pre.replace(reg, item.replace(/./g, ' '));
    }, s) === ans;
};

const a = "leetcode";
const b = ["leet", "code"];
console.log(wordBreak(a, b));

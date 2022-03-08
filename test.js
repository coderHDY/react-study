var canBeIncreasing = function (nums) {
    let chance = true;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] <= nums[i - 1]) {
            if (chance) {
                chance = false;
                nums.splice(i - 1, 1);
                i--;
            } else {
                return false;
            }
        }
    }
    return true;
};

// const nums = [1, 2, 10, 5, 7]
const nums = [2, 3, 1, 2]
// const nums = [1, 1, 1]
console.log(canBeIncreasing(nums));
// 输出：true

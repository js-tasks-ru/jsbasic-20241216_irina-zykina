function checkSpam(str) {
if (!str) return false;
const lowerStr = str.toLowerCase();
return lowerStr.includes('1xbet') || lowerStr.includes('xxx');
}

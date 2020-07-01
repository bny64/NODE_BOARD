class StringUtil {
    /**
     * str : 마스킹할 문자열
     * begin : 시작 지점 default : 0 [index]
     * end : 끝 지점 : default : 문자열 끝 [index-1]
     */
    masking(str, begin, end){
        
        const strArr = str.split('');
        begin = begin || 0;
        end = end || str.length;

        for(let i = begin; i < end; i++){
            strArr[i] = '*';
        }

        return strArr.join('');

    }
}

module.exports = new StringUtil();
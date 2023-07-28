const CodeGenerator = require('node-code-generator');
const generator = new CodeGenerator();
const pattern = '*';
const howMany = 10;
const options = {};

const randomCode = () => {
    const arrayCode = generator.generateCodes(pattern, howMany, options);
    let code = "";
    for(let i=0; i<arrayCode.length; i++){
        code+=arrayCode[i];
    }
    return code;
}

module.exports = {
    randomCode
}
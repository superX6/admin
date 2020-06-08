module.exports = {
    root: true,
    env: {
        node: true,
        commonjs: true, //支持commonjs语法
        node: true,//支持node
        es6: true //支持es6语法
    },
    extends: [
        'plugin:vue/essential',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': [0, 'windows'], // 换行风格
        'eol-last': 0, // 文件以单一的换行符结束
        'no-mixed-spaces-and-tabs': [0], // 关闭禁止混用tab和空格
        'max-len': [0, 150],
        'import/extensions': ['off', 'never'],
        'no-bitwise': ['error', { int32Hint: true }],
        'object- curly - newline': 0, // 不要求花括号换行
        'comma-dangle': 0, // 不要求Object拖尾逗号
        'indent': 0, // 忽略缩进
        'no-unused-expressions': ['error', { 'allowShortCircuit': true, 'allowTernary': true }],// 允许表达式中使用逻辑短路求值；表达式中使用类似逻辑短路求值的三元运算符
        'no-param-reassign':0, //允许修改arguments
        'no-shadow':0 ,//变量声明覆盖
        'no-use-before-define': ['error', { 'functions': false }], // 允许函数变量提升
        'no-plusplus':0, // 允许使用++ --
        'no-underscore-dangle':0, // 允许标识符中悬空下划线
        'prefer-destructuring':0, // 可通过成员表达式访问array、object属性，不强制解构
        'no-return-assign':0 // return 语句中允许赋值 
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};



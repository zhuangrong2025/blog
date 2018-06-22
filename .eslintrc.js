module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double",
            { "avoidEscape": true }
        ],
        "no-undef": "error",
        "no-console": 0,
        "semi": ["error", "never"],
        "no-extra-semi": 2,
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"]
    }
};

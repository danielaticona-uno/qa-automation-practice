module.exports={
    default:{
        reqruireModule:[
            "ts-node/register"
        ],
        require:[
            "src/support/**/*.ts",
            "src/pages/**/*.ts",
            "src/steps/**/*.ts"

        ],
        paths:[
            "features/**/*.feature"
        ], 
        timeout: 30000
    }
};
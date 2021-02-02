/**
 * Calculador Api and Calculador App
 * @author Daniel Domínguez <cf19daniel.dominguez@iesjoandaustria.org>
 */
var Api = function() {
    this.init = function(cfg) {
        this.protocol = cfg.protocol;
        this.host = cfg.host;
        this.basePath = cfg.basePath;
        this.resultKey = cfg.resultKey;
        this.urlPrefix = `${this.protocol}://${this.host}/${this.basePath}`;
    }

    this.request = function(method, endPoint, callback) {
        var req = new XMLHttpRequest();
        var that = this;
        req.onreadystatechange = function() {

            if (this.readyState == 4) {
                console.log(this.status);

                let response;
                if(this.status >= 200 && this.status < 300) {
                    // OK
                    response = JSON.parse(this.responseText);
                    let result = response[that.resultKey];
                    callback(result);
                }else if(this.status >= 400 && this.status < 500) {
                    // Client Error
                    response = this.responseText;
                    alert("Client error: " + response);
                }else if(this.status >= 500 && this.status < 600) {
                    // Server Error
                    response = this.responseText;
                    alert("Server error: " + response);
                }
            }
        };

        req.open(method, this.urlPrefix + endPoint, true);
        req.send();
    }

    this.suma = function(op1, op2, callback) {
        this.request("GET", `suma/${op1}/${op2}/`, callback);
    }.bind(this);

    this.resta = function(op1, op2, callback) {
        this.request("GET", `resta/${op1}/${op2}/`, callback);
    }.bind(this);

    this.multiplica = function(op1, op2, callback) {
        console.log(this);
        this.request("GET", `multiplica/${op1}/${op2}/`, callback);
    }.bind(this);

    this.divide = function(op1, op2, callback) {
        this.request("GET", `divide/${op1}/${op2}/`, callback);
    }.bind(this);
};

var Calc = function() {
    this.op1 = "";
    this.op2 = "";
    this.operation = null;

    this.init = function(api, cfg) {
        console.log(cfg);
        this.api = api;
        this.resultElementID = cfg.resultElementID;
        this.resultElement = document.getElementById("resultbox");
        this.operationClassName = cfg.operationClassName;
        this.numbersClassName = cfg.numbersClassName;
        this.resetID = cfg.resetID;
        this.dotID = cfg.dotID;
        this.equalsID = cfg.equalsID;


        this.bindOperations();
        this.bindNumbers();

        //bind equals
        document.getElementById(this.equalsID).addEventListener("click", this.equals.bind(this));
        //bind AC button
        document.getElementById(this.resetID).addEventListener("click", function(){
            this.reset();
            this.render(0);
        }.bind(this));
    };

    this.bindOperations = function() {
        const elements = document.getElementsByClassName(this.operationClassName);
        var calc = this;
        const fun = function(e) {
            if(calc.op1.length <= 0) return;
            if(this.innerHTML.match(/[\+\-\*\/÷]/)) calc.operation = this.innerHTML;
            console.log('operation clicked');
            calc.render();
        };

        for(let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', fun, false);
        };
    }

    this.bindNumbers = function() {
        const elements = document.getElementsByClassName(this.numbersClassName);
        var calc = this;
        const fun = function() {
            const number = this.innerHTML;
            if(null == calc.operation) {
                if(number == "." && (calc.op1.indexOf(".") !== -1 || calc.op1.length <= 0)) return;

                calc.op1 += "" + number;
            } else {
                if(number == "." && (calc.op2.indexOf(".") !== -1 || calc.op2.length <=0)) return;
                calc.op2 += "" + number;
            }
            calc.render();
        };

        for(let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', fun, false);
        };
    }

    this.render = function(optNum) {
        if(optNum !== undefined) {
            this.resultElement.innerHTML = optNum;
            return;
        }

        const op1 = (null == this.op1 ? "" : this.op1);
        const op2 = (null == this.op2 ? "" : this.op2);
        const operation = (null == this.operation ? "" : this.operation);
        this.resultElement.innerHTML = `${op1} ${operation} ${op2}`;
    }

    this.reset = function() {
        this.op1 = "";
        this.op2 = "";
        this.operation = null;
    }

    this.equals = function() {
        if(this.op1.length > 0 && 
            this.op2.length > 0 &&
            this.operation !== null) {
                var apiOperation = this.api.suma;

                switch(this.operation){
                    case "+":
                        apiOperation = this.api.suma;
                        break;
                    case "-":
                        apiOperation = this.api.resta;
                        break;
                    case "*":
                        apiOperation = this.api.multiplica;
                        break;
                    case "/":
                        apiOperation = this.api.divide;
                        break;
                    case "÷":
                        apiOperation = this.api.divide;
                        break;
                    default:
                        apiOperation = this.api.suma;
                }

                console.log(apiOperation);
                apiOperation(this.op1, this.op2, function(result) {
                    this.resultElement.innerHTML = result;
                    this.reset();
                }.bind(this));
        }
    }
};

(function() {
    // mock UI
    /*
    (function(){
        const UI = `
        <button id="reset">AC</button>
        <button class="operation">+</button>
        <button class="operation">-</button>
        <button class="operation">*</button>
        <button class="operation">/</button>
        <button class="number">0</button>
        <button class="number">1</button>
        <button class="number">2</button>
        <button class="number">3</button>
        <button class="number">4</button>
        <button class="number">5</button>
        <button class="number">6</button>
        <button class="number">7</button>
        <button class="number">8</button>
        <button class="number">9</button>
        <button class="number">.</button>
        <button id="equals">=</button>
        <button id="resultbox">0</button>
        `;
        document.getElementsByTagName("body")[0].innerHTML = UI;
    }());
    */

    // API servers
    const mockServer = {
        protocol: 'https',
        host: '62a29799-ad52-43bc-868c-6b4483d5fee0.mock.pstmn.io',
        basePath: ''
    };
    const realServer = {
        protocol: 'http',
        host: 'localhost:8080',
        basePath: 'calc/',
    };

    const apiCfg = Object.assign({...mockServer}, {
        resultKey: 'result'
    });

    // Init our api
    var api = new Api();
    api.init(apiCfg);

    var calc = new Calc();
    calc.init(api, {
        resultElementId: 'resultbox',
        resetID: 'reset',
        dotID: 'dot',
        equalsID: 'equals',
        operationClassName: 'operation',
        numbersClassName: 'number'
    });
}());
